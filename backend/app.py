from flask import Flask, request, jsonify
from elasticsearch import Elasticsearch
import psycopg2

app = Flask(__name__)

es = Elasticsearch("http://elasticsearch:9200")

@app.route("/search")
def search():
    query = request.args.get("q", "")
    company = request.args.get("company")
    sector = request.args.get("sector")

    es_query = {
        "query": {
            "bool": {
                "must": [{"match": {"file_text": query}}] if query else [],
                "filter": []
            }
        }
    }

    if company:
        es_query["query"]["bool"]["filter"].append({"term": {"companies.keyword": company}})
    if sector:
        es_query["query"]["bool"]["filter"].append({"term": {"label_titles.keyword": sector}})

    result = es.search(index="merger_cases", body=es_query)
    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)