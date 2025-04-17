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
    date_mode = filters.get("date_mode", "any")
    date_from = filters.get("date_from")
    date_to = filters.get("date_to")

    if date_mode == "after" and date_from:
        filter_clauses.append({
            "range": {
                "decision_date": {
                    "gte": date_from,
                    "format": "yyyy-MM-dd",
                }
            }
        })
    elif date_mode == "before" and date_to:
        filter_clauses.append({
            "range": {
                "decision_date": {
                    "lte": date_to,
                    "format": "yyyy-MM-dd",
                }
            }
        })
    elif date_mode == "between" and date_from and date_to:
        filter_clauses.append({
            "range": {
                "decision_date": {
                    "gte": date_from,
                    "lte": date_to,
                    "format": "yyyy-MM-dd",
                }
            }
        })
        
    # Companies — match all selected
    companies = filters.get("companies")
    if companies:
        for company in companies:
            filter_clauses.append({
                "term": {
                    "companies.keyword": company
                }
            })

    # Label Titles — match all selected
    label_titles = filters.get("label_titles")
    if label_titles:
        for label in label_titles:
            filter_clauses.append({
                "term": {
                    "label_titles.keyword": label
                }
            })
        
    # Case Number
    case_number = filters.get("case_number")
    if case_number:
        filter_clauses.append({
            "wildcard": {
                "case_number.keyword": {
                    "value": f"*{case_number}*",
                    "case_insensitive": True
                }
            }
        })

    # Langues (sélection multiple)
    languages = filters.get("language") or []
    if isinstance(languages, str): 
        languages = [languages]
    if languages:
        filter_clauses.append({
            "terms": {
                "language.keyword": languages
            }
        })

    # Ajout au bool query
    query.setdefault("query", {}).setdefault("bool", {})

    if filter_clauses:
        query["query"]["bool"]["filter"] = filter_clauses
    if must_clauses:
        query["query"]["bool"]["must"] = must_clauses

    return query
