from utils.elasticsearch_utils import wait_for_elasticsearch
import subprocess

# Attendre que Elastic soit dispo
es = wait_for_elasticsearch()

def ensure_index():
    if not es.indices.exists(index="merger_cases"):
        print("⚠️ Index merger_cases non trouvé. Lancement de l'indexation…")
        subprocess.run(["python", "indexer.py"], check=True)
    else:
        print("✅ Index merger_cases déjà présent.")

if __name__ == "__main__":
    ensure_index()