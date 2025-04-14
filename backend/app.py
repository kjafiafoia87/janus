from flask import Flask
from flask_cors import CORS
from routes.filters import filters_bp
from routes.concuria import concuria_bp

app = Flask(__name__)
CORS(app)

# ✅ enregistre les deux blueprints
app.register_blueprint(filters_bp, url_prefix='/api')
app.register_blueprint(concuria_bp, url_prefix='/api')
print("✅ Chargement de app.py avec imports corrects")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False, use_reloader=False)