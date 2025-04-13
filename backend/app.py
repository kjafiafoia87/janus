from elasticsearch import Elasticsearch
import subprocess

es = Elasticsearch("http://elasticsearch:9200")

def ensure_index():
    if not es.indices.exists(index="merger_cases"):
        print("⚠️ Index merger_cases non trouvé. Lancement de l'indexation…")
        subprocess.run(["python", "indexer.py"], check=True)
    else:
        print("✅ Index merger_cases déjà présent.")

# ensure_index()

# ensuite continue avec ton app Flask
from flask import Flask
from utils.filters import filters_bp

app = Flask(__name__)
app.register_blueprint(filters_bp, url_prefix='/api')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False, use_reloader=False)