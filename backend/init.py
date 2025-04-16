from utils.elasticsearch_utils import wait_for_elasticsearch, ensure_index

es = wait_for_elasticsearch()
ensure_index(es)