from utils.elasticsearch_utils import get_es

def get_distinct_filters():
    es = get_es()  # ✅ appel correct
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

def search_documents(filters):
    es = get_es()  # ✅ appel correct
    page = filters.get("page", 1)
    page_size = filters.get("pageSize", 20)
    from_ = (page - 1) * page_size

    query = {"match_all": {}}  # You can make this dynamic later

    try:
        res = es.search(
            index="merger_cases",
            from_=from_,
            size=page_size,
            query=query
        )

        print("🔍 Backend total hits:", res["hits"]["total"]["value"])

        hits = res["hits"]["hits"]
        return {
            "total": res["hits"]["total"]["value"],
            "results": [hit["_source"] for hit in hits]
        }
    except Exception as e:
        print("❌ Erreur lors de la recherche :", e)
        raise e