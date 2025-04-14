from flask import Blueprint, jsonify, request
from services.elasticsearch_service import get_distinct_filters, search_documents

concuria_bp = Blueprint('concuria', __name__)

@concuria_bp.route('/filters', methods=['GET'])
def filters():
    try:
        return jsonify(get_distinct_filters())
    except Exception as e:
        return jsonify({"error": f"/filters: {str(e)}"}), 500

@concuria_bp.route('/search', methods=['POST'])
def search():
    try:
        payload = request.get_json()
        results = search_documents(payload)
        return jsonify(results)
    except Exception as e:
        return jsonify({"error": f"/search: {str(e)}"}), 500