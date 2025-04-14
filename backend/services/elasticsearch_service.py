# services/elasticsearch_service.py
from utils.elasticsearch_utils import es

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

def search_documents(filters):
    page = filters.get("page", 1)
    page_size = filters.get("pageSize", 20)
    from_ = (page - 1) * page_size

    query = {"match_all": {}}  # You can make this dynamic later

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

# def search_documents(filters):
#     page = filters.get("page", 1)
#     page_size = filters.get("pageSize", 10)
#     from_ = (page - 1) * page_size

#     must = []

#     # Filter: Language
#     if language := filters.get("language"):
#         must.append({"term": {"language.keyword": language}})

#     # Filter: Title (text search)
#     if title := filters.get("title"):
#         must.append({"match": {"title": title}})

#     # Filter: Companies (multi-select)
#     if companies := filters.get("companies"):
#         must.append({"terms": {"companies.keyword": companies}})

#     # Filter: Label codes (multi-select)
#     if label_codes := filters.get("label_codes"):
#         must.append({"terms": {"label_codes.keyword": label_codes}})

#     # Filter: Date range
#     date_range = {}
#     if filters.get("date_from"):
#         date_range["gte"] = filters["date_from"]
#     if filters.get("date_to"):
#         date_range["lte"] = filters["date_to"]
#     if date_range:
#         must.append({"range": {"decision_date": date_range}})

#     # Final query object
#     query = {"bool": {"must": must}} if must else {"match_all": {}}

#     res = es.search(
#         index="merger_cases",
#         from_=from_,
#         size=page_size,
#         query=query
#     )

#     hits = res["hits"]["hits"]
#     return {
#         "total": res["hits"]["total"]["value"],
#         "results": [hit["_source"] for hit in hits]
#     }