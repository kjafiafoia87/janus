import psutil
from elasticsearch import exceptions
from db.db_utils import wait_for_postgres, get_db_connection
from utils.elasticsearch_utils import wait_for_elasticsearch

# 1. Attente de PostgreSQL
wait_for_postgres("postgres", 5432)

# 2. Connexion PostgreSQL
conn = get_db_connection()
cursor = conn.cursor()

# 3. Connexion Elasticsearch
es = wait_for_elasticsearch()

# 4. Définir un mapping explicite pour merger_cases
mapping = {
    "mappings": {
        "properties": {
            "attachment_id": {"type": "keyword"},
            "language": {"type": "keyword"},
            "file_text": {"type": "text"},
            "link": {"type": "keyword"},
            "case_number": {"type": "keyword"},
            "title": {"type": "text"},
            "companies": {"type": "keyword"},
            "decision_date": {"type": "date", "format": "dd-MM-yyyy"},
            "label_codes": {"type": "keyword"},
            "label_titles": {"type": "keyword"}
        }
    }
}

# 5. Réinitialiser l’index
if es.indices.exists(index="merger_cases"):
    es.indices.delete(index="merger_cases")
    print("🗑️ Index merger_cases supprimé")

# 6. Créer l’index avec mapping
try:
    es.indices.create(index="merger_cases", body=mapping)
    print("✅ Index merger_cases recréé avec mapping")
except exceptions.BadRequestError as e:
    print("❌ Erreur création index :", e)
    raise

# 7. Requête SQL
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

# 8. Indexation par lots
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
            "decision_date": row[7].strftime("%d-%m-%Y") if row[7] else None,
            "label_codes": row[8],
            "label_titles": row[9],
        }
        es.index(index="merger_cases", id=row[0], document=doc)
        total += 1

        if total % 100 == 0:
            print(f"➡️ {total} documents indexés — Memory used: {psutil.virtual_memory().percent}%")

print(f"✅ Indexation terminée : {total} documents envoyés")