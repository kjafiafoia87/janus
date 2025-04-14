from datetime import datetime
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

    date_from = filters.get("date_from")
    date_to = filters.get("date_to")
    companies = filters.get("companies")
    file_text = filters.get("file_text")

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

    if companies:
        company_should = [{"term": {"companies": company}} for company in companies]
        filter_clauses.append({"bool": {"should": company_should}})

    if file_text:
        must_clauses.append({"match": {"file_text": file_text}})

    if filter_clauses:
        query.setdefault("query", {}).setdefault("bool", {})["filter"] = filter_clauses
    if must_clauses:
        query.setdefault("query", {}).setdefault("bool", {})["must"] = must_clauses

    return query