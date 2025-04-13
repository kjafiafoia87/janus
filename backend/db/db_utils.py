import time
import socket

def wait_for_postgres(host: str, port: int, retry_interval=3):
    while True:
        try:
            with socket.create_connection((host, port), timeout=2):
                print("✅ PostgreSQL is ready")
                return
        except Exception:
            print("⏳ Waiting for PostgreSQL to be ready...")
            time.sleep(retry_interval)
            
def get_db_connection():
    return psycopg2.connect(
        dbname="concuriadb",
        user="vincentgarrigue",
        password="root",
        host="postgres",
        port=5432
    )