from flask import Blueprint, jsonify, request
from services.elasticsearch_service import get_distinct_filters, search_documents

concuria_bp = Blueprint('concuria', __name__)

@concuria_bp.route('/filters', methods=['GET'])
def filters():
    try: 
        filters = get_distinct_filters()
        return jsonify(filters)
    except Exception as e:
            return jsonify({"error /filters ": str(e)}), 500


@concuria_bp.route('/search', methods=['POST'])
def search():
    payload = request.get_json()
    results = search_documents(payload)
    return jsonify(results)