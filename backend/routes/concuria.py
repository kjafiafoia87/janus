from flask import Blueprint, jsonify, request
from app.services.elasticsearch_service import get_distinct_filters, search_documents

concuria_bp = Blueprint('concuria', __name__)

@concuria_bp.route('/api/filters', methods=['GET'])
def filters():
    filters = get_distinct_filters()
    return jsonify(filters)

@concuria_bp.route('/api/search', methods=['POST'])
def search():
    payload = request.get_json()
    results = search_documents(payload)
    return jsonify(results)