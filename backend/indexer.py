import psycopg2
from elasticsearch import Elasticsearch

def get_db_connection():
    return psycopg2.connect(
        dbname="concuriadb",
        user="vincentgarrigue",
        password="root",  # ajuste selon ton setup
        host="postgres",
        port=5432
    )

# Connexions
conn = get_db_connection()
cursor = conn.cursor()
es = Elasticsearch("http://elasticsearch:9200")

# Création de l'index (optionnel si tu veux un mapping précis)
if not es.indices.exists(index="merger_cases"):
    es.indices.create(index="merger_cases")

# Exécution de ta requête SQL
cursor.execute("""
SELECT
    c.case_number,
    c.title,
    c.companies,
    a.language,
    a.file_text,
    a.link,
    c.decision_date,
    ARRAY_AGG(DISTINCT s.label_code) AS label_codes,
    ARRAY_AGG(DISTINCT s.label_title) AS label_titles
FROM
    cases c
JOIN
    decisions d ON d.case_id = c.id
JOIN
    attachments a ON a.decision_id = d.id
LEFT JOIN
    case_sectors cs ON c.id = cs.case_id
LEFT JOIN
    sectors s ON cs.sector_code = s.code
GROUP BY
    c.case_number, c.title, c.companies, a.language, a.file_text, a.link, c.decision_date;
""")

rows = cursor.fetchall()

# Envoi dans Elasticsearch
for row in rows:
    doc = {
        "case_number": row[0],
        "title": row[1],
        "companies": row[2],
        "language": row[3],
        "file_text": row[4],
        "link": row[5],
        "decision_date": row[6].isoformat() if row[6] else None,
        "label_codes": row[7],
        "label_titles": row[8],
    }
    # L'ID est optionnel ici, on laisse ES en générer un automatiquement
    es.index(index="merger_cases", document=doc)

print("✅ Indexation terminée")