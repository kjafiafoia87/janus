# utils/elasticsearch_utils.py
import time
from elasticsearch import Elasticsearch
from elastic_transport import ConnectionError

def wait_for_elasticsearch(host="http://elasticsearch:9200", timeout=60):
    es = Elasticsearch(host)
    for i in range(timeout):
        try:
            if es.ping():
                print("✅ Elasticsearch is ready")
                return es
        except ConnectionError:
            pass
        print(f"⏳ Waiting for Elasticsearch... ({i+1}/{timeout})")
        time.sleep(1)
    raise RuntimeError("❌ Elasticsearch not ready after timeout")

# Initialise l'instance dès le chargement
es = wait_for_elasticsearch()