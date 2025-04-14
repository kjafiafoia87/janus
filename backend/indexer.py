import psutil
from elasticsearch import Elasticsearch
from db.db_utils import wait_for_postgres, get_db_connection
from utils.elasticsearch_utils import wait_for_elasticsearch

# Attente de PostgreSQL
wait_for_postgres("postgres", 5432)

# Connexion PostgreSQL
conn = get_db_connection()
cursor = conn.cursor()

# Connexion Elasticsearch
es = wait_for_elasticsearch()

# Réinitialiser l’index
if es.indices.exists(index="merger_cases"):
    es.indices.delete(index="merger_cases")
    print("Index merger_cases supprimé")

from elasticsearch import exceptions

try:
    es.indices.create(index="merger_cases")
except exceptions.BadRequestError as e:
    if "resource_already_exists_exception" in str(e):
        print("ℹ️ Index merger_cases existe déjà, pas besoin de le créer.")
    else:
        raise

print("Index merger_cases recréé")

# Requête SQL
cursor.execute("""
SELECT
    a.id AS attachment_id,
    a.language,
    a.file_text,
    a.link,
    c.case_number,
    c.title,
    c.companies,
    c.decision_date,
    COALESCE(ARRAY_AGG(DISTINCT s.label_code) FILTER (WHERE s.label_code IS NOT NULL), '{}') AS label_codes,
    COALESCE(ARRAY_AGG(DISTINCT s.label_title) FILTER (WHERE s.label_title IS NOT NULL), '{}') AS label_titles
FROM
    attachments a
LEFT JOIN decisions d ON a.decision_id = d.id
LEFT JOIN cases c ON d.case_id = c.id
LEFT JOIN case_sectors cs ON c.id = cs.case_id
LEFT JOIN sectors s ON cs.sector_code = s.code
GROUP BY
    a.id, a.language, a.file_text, a.link, c.case_number, c.title, c.companies, c.decision_date;
""")

# Indexation par lots
batch_size = 20
total = 0

while True:
    rows = cursor.fetchmany(batch_size)
    if not rows:
        break

    for row in rows:
        doc = {
            "attachment_id": row[0],
            "language": row[1],
            "file_text": row[2],
            "link": row[3],
            "case_number": row[4],
            "title": row[5],
            "companies": row[6],
            "decision_date": row[7].isoformat() if row[7] else None,
            "label_codes": row[8],
            "label_titles": row[9],
        }
        es.index(index="merger_cases", id=row[0], document=doc)
        total += 1

        if total % 20 == 0:
                print(f"➡️ {total} documents indexés — Memory used: {psutil.virtual_memory().percent}%")

print(f"✅ Indexation terminée : {total} documents envoyés")