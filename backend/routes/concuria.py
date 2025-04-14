from flask import Blueprint, jsonify, request
from services.elasticsearch_service import get_distinct_filters, ElasticsearchService
from utils.elasticsearch_utils import es  # ton client Elasticsearch initialisé

concuria_bp = Blueprint('concuria', __name__)
es_service = ElasticsearchService(es)

@concuria_bp.route('/filters', methods=['GET'])
def filters():
    try:
        return jsonify(get_distinct_filters())
    except Exception as e:
        return jsonify({"error /filters ": str(e)}), 500

@concuria_bp.route('/search', methods=['POST'])
def search():
    try:
        payload = request.get_json()
        query_text = payload.get("text_search", "")
        results = es_service.search_documents(query_text=query_text, filters=payload, page=payload.get("page", 1), page_size=payload.get("pageSize", 20))
        return jsonify(results)
    except Exception as e:
        return jsonify({"error /search ": str(e)}), 500