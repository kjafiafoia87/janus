from elasticsearch._sync.client import Elasticsearch
from elasticsearch import TransportError
import os
import time
import traceback
import logging
logging.basicConfig(level=logging.DEBUG)

def wait_for_elasticsearch(timeout=180):
    host = os.getenv("ELASTICSEARCH_HOST", "http://elasticsearch:9200")
    print(f"🔌 Tentative de connexion à Elasticsearch : {host}")

    es = Elasticsearch(
        host,
        verify_certs=False,
    )

    for i in range(timeout):
        try:
            info = es.info()
            print(f"✅ Elasticsearch prêt — Version : {info['version']['number']}")
            return es
        except Exception as e:
            print(f"⏳ Attente Elasticsearch... ({i+1}/{timeout}) — {repr(e)}")
            time.sleep(1)

    print("⚠️ Timeout atteint, mais on continue quand même...")
    return es


def ensure_index(es, index_name="merger_cases"):
    try:
        print(f"🔍 Vérification de l'existence de l'index : {index_name}")
        result = es.indices.exists(index=index_name)
        print(f"🔍 Résultat `exists`: {result}")

        if not result:
            print(f"📦 Tentative de création de l'index {index_name}")
            created = es.indices.create(index=index_name)
            print(f"✅ Index créé : {created}")
        else:
            print(f"✅ Index {index_name} déjà présent.")

    except Exception as e:
        print("❌ Erreur lors de la vérification/création de l'index")
        print(f"Type : {type(e)}")
        print(f"Message : {e}")
        print("Traceback :")
        traceback.print_exc()
        raise

es = wait_for_elasticsearch()