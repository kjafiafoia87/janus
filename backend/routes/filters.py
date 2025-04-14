from flask import Blueprint, jsonify
from services.elasticsearch_service import get_distinct_filters

filters_bp = Blueprint('filters', __name__)

@filters_bp.route("/filters")
def filters():
    data = get_distinct_filters()
    return jsonify(data)