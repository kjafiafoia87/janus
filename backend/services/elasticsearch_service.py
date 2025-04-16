from utils.elasticsearch_filters import apply_filters
from services.es_client import es

def get_distinct_filters():
    aggs = {
        "languages": {"terms": {"field": "language.keyword", "size": 100}},
        "sectors": {"terms": {"field": "label_codes.keyword", "size": 100}},
        "companies": {"terms": {"field": "companies.keyword", "size": 1000}},
    }

    try:
        res = es.search(index="merger_cases", size=0, aggs=aggs)
        print("✅ Résultat Elasticsearch reçu :", res)
    except Exception as e:
        print("❌ Erreur lors de l'appel à Elasticsearch :", e)
        raise e

    try:
        return {
            "languages": [b["key"] for b in res["aggregations"]["languages"]["buckets"]],
            "sectors": [b["key"] for b in res["aggregations"]["sectors"]["buckets"]],
            "companies": [b["key"] for b in res["aggregations"]["companies"]["buckets"]],
        }
    except Exception as e:
        print("❌ Error parsing aggregations:", e)
        return {}


class ElasticsearchService:
    def __init__(self, es_client):
        self.es = es_client

    def search_documents(self, filters: dict = {}, page: int = 1, page_size: int = 20):
        """
        Search documents with applied filters and pagination.
        """
        from_ = (page - 1) * page_size

        query = {"query": {"bool": {}}}
        query = apply_filters(query, filters)

        try:
            res = self.es.search(
                index="merger_cases",
                from_=from_,
                size=page_size,
                body=query,
            )
            hits = res["hits"]["hits"]
            return {
                "total": res["hits"]["total"]["value"],
                "results": [hit["_source"] for hit in hits],
            }

        except Exception as e:
            print("❌ Error executing search:", e)
            return {
                "total": 0,
                "results": [],
                "error": str(e)
            }
        
es_service = ElasticsearchService(es)

def search_documents(filters: dict = {}):
    return es_service.search_documents(
        filters=filters,
        page=filters.get("page", 1),
        page_size=filters.get("pageSize", 20)
    )