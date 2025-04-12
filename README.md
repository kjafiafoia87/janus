# 📚 Janus — European Commission Merger Decisions Explorer

Janus est une plateforme de recherche intelligente permettant d’explorer, filtrer et rechercher les décisions de fusion de la Commission Européenne.  
Elle combine une base PostgreSQL, un moteur de recherche Elasticsearch, un backend Flask, et un frontend React avec Vite, le tout orchestré en Docker.

---

## 🗂️ Stack technique

| Layer           | Tech                              |
| --------------- | --------------------------------- |
| Frontend        | React (Vite, TailwindCSS, Router) |
| Backend         | Flask (API REST, reindexation)    |
| Base de données | PostgreSQL                        |
| Search          | Elasticsearch + Kibana            |
| Orchestration   | Docker + Docker Compose           |

---

## 🚀 Lancer le projet

### 1. 🔧 Prérequis

- Docker + Docker Compose installés
- `make` installé (disponible sur macOS/Linux ou via WSL sur Windows)

### 2. 🧱 Build & lancement complet

```bash
make up

Cela :
	•	Build tous les services
	•	Lance Elasticsearch, PostgreSQL, Kibana, le backend et le frontend
	•	Expose les services suivants :

Service	URL
Frontend (React)	http://localhost:3000
Backend (Flask)	http://localhost:5000
Elasticsearch	http://localhost:9200
Kibana	http://localhost:5601
PostgreSQL	localhost:5432 (externe)



⸻

🔍 Base de données
	•	Schéma initial défini dans backend/db/dump.sql
	•	Au démarrage avec volume vide, ce fichier est importé automatiquement
	•	Tables clés : cases, decisions, attachments, sectors, case_sectors

⸻

⚙️ Commandes Makefile

make up           # Build et démarre tous les services
make down         # Stoppe tout proprement
make logs         # Suivi des logs en direct
make reindex      # Re-indexe les documents depuis PostgreSQL vers Elasticsearch
make psql         # Accès terminal PostgreSQL dans le conteneur
make pg-dump-local  # Dump de la BDD locale dans dump.sql
make reset-pg     # Réinitialise PostgreSQL et réimporte le dump



⸻

🔄 Importer ta BDD locale dans Docker
	1.	Génère le dump local (si besoin) :

make pg-dump-local

	2.	Vérifie que le fichier est bien à backend/db/dump.sql
	3.	Réinitialise la base Docker et réimporte :

make reset-pg



⸻

🔎 Recherche Elasticsearch
	•	L’index merger_cases est créé automatiquement par le backend lors de la réindexation.
	•	Les documents sont indexés à partir d’une requête SQL vers PostgreSQL.
	•	Utilisable via Kibana ou via l’API /search?q=...

⸻

📦 Frontend React (Bolt)
	•	Structure multi-page (SPA avec react-router)
	•	Composants : Concuria, Profile, Notifications, Archives
	•	Utilise vite.config.ts avec un proxy API vers le backend

⸻

🧪 Tester l’import

make psql
\dt                      # Liste les tables
SELECT COUNT(*) FROM cases;



⸻

🧰 TODO (pistes futures)
	•	Ajout de filtres UI dynamiques connectés à ES
	•	Indexation automatique quotidienne depuis de nouveaux fichiers
	•	Authentification utilisateur
	•	Visualisation statistique des décisions

⸻

🤝 Contribution

Tu veux contribuer ? N’hésite pas à cloner ce projet, proposer des issues ou pull requests.

⸻

📄 Licence

Projet personnel non officiel. Données basées sur des documents publics de la Commission Européenne.

---

💡 Tu veux que je te le mette aussi dans un fichier `.md` directement ou l’ajouter automatiquement dans ton dossier avec une commande `make doc` ?
```
