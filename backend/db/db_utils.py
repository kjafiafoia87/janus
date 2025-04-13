import psycopg2
import time
from elasticsearch import Elasticsearch
from elastic_transport import ConnectionError

def wait_for_postgres(host, port):
    import socket
    import time
    while True:
        try:
            with socket.create_connection((host, port), timeout=2):
                print("✅ PostgreSQL is ready")
                return
        except Exception:
            print("⏳ Waiting for PostgreSQL to be ready...")
            time.sleep(3)

def get_db_connection():
    return psycopg2.connect(
        dbname="concuriadb",
        user="vincentgarrigue",
        password="root",
        host="postgres",
        port=5432
    )