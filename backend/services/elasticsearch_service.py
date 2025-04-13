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

    return {
        "languages": [b["key"] for b in res["aggregations"]["languages"]["buckets"]],
        "sectors": [b["key"] for b in res["aggregations"]["sectors"]["buckets"]],
        "companies": [b["key"] for b in res["aggregations"]["companies"]["buckets"]],
    }