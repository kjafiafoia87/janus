from typing import Dict


def apply_filters(query: Dict, filters: Dict) -> Dict:
    """
    Applies filters to an Elasticsearch query.

    Args:
        query: The base Elasticsearch query.
        filters: A dictionary containing filter parameters.

    Returns:
        The modified Elasticsearch query with filters applied.
    """
    must_clauses = []
    filter_clauses = []

    # Dates
    date_from = filters.get("date_from")
    date_to = filters.get("date_to")

    if date_from and date_to:
        filter_clauses.append({
            "range": {
                "date": {
                    "gte": date_from,
                    "lte": date_to,
                    "format": "yyyy-MM-dd",
                }
            }
        })
    elif date_from:
        filter_clauses.append({
            "range": {
                "date": {
                    "gte": date_from,
                    "format": "yyyy-MM-dd",
                }
            }
        })
    elif date_to:
        filter_clauses.append({
            "range": {
                "date": {
                    "lte": date_to,
                    "format": "yyyy-MM-dd",
                }
            }
        })

    # Entreprises (au moins une)
    companies = filters.get("companies")
    if companies:
        filter_clauses.append({
            "terms": {
                "companies.keyword": companies
            }
        })

    # Texte libre
    file_text = filters.get("file_text") or filters.get("text_search")
    if file_text:
        must_clauses.append({
            "match": {
                "file_text": file_text
            }
        })

    # Ajout au bool query
    query.setdefault("query", {}).setdefault("bool", {})

    if filter_clauses:
        query["query"]["bool"]["filter"] = filter_clauses
    if must_clauses:
        query["query"]["bool"]["must"] = must_clauses

    return query