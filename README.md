# 🌍 GeoPulse-AI

> **Géoportail Intelligent & Analyse Géospatiale Conversationnelle**  
> *Transformer les données géospatiales brutes en décisions urbaines éclairées grâce à l'IA générative.*

[![Licence: MIT](https://img.shields.io/badge/Licence-MIT-blue.svg)](LICENSE)
[![Python 3.10+](https://img.shields.io/badge/Python-3.10%2B-green.svg)](https://www.python.org/)
[![Statut: Alpha](https://img.shields.io/badge/Statut-Alpha-orange.svg)]()

---

## 📖 Présentation

**GeoPulse-AI** est un framework open source conçu pour démocratiser l'analyse géospatiale en combinant la puissance de l'**IA générative** (Google Gemini) avec des outils **SIG** modernes. Il permet de transformer des requêtes en langage naturel en analyses cartographiques automatisées et en recommandations exploitables.

> *Testé initialement sur le cas d'étude de **Ouagadougou (Burkina Faso)** pour analyser la croissance urbaine, le moteur est **agnostique au territoire** : intégrez vos propres données géographiques pour analyser n'importe quelle zone.*

---

## ✨ Fonctionnalités Clés

| Fonctionnalité | Description |
|----------------|-------------|
| 🗣️ **Interface Conversationnelle** | Interrogez vos données en langage naturel : *"Quelle est l'évolution du bâti dans le secteur 25 depuis 2015 ?"* |
| 🧠 **Insights Automatisés** | L'agent Gemini interprète la requête, sélectionne les algorithmes spatiaux et génère des recommandations contextuelles |
| 🧩 **Architecture Modulaire** | Séparez la logique IA du rendu cartographique pour une extensibilité maximale |
| 📂 **Open Data Ready** | Support natif des formats GeoJSON, Shapefile et standards vectoriels |
| 🌐 **Multi-territoire** | Conçu pour s'adapter à n'importe quel contexte géographique |

---

## 🛠️ Stack Technique

### Backend
- **Serveur** : Python 3.10+ avec FastAPI
- **IA/LLM** : Google Gemini API (Gemini 2.5 Flash)
- **Analyse Spatiale** : GeoPandas, Shapely, Fiona
- **Base de Données** : PostgreSQL avec extension PostGIS
- **Cache** : Redis (optionnel)

### Frontend
- **Framework** : Angular 21+
- **Cartographie** : Leaflet.js / OpenLayers
- **UI** : SCSS

---

## 📦 Installation

### Prérequis

- Python 3.10 ou supérieur
- PostgreSQL + avec PostGIS
- Compte Google Cloud avec API Gemini activée
- Node.js 18+ (pour le frontend)

### Étapes

```bash
# 1. Cloner le dépôt
git clone https://github.com/votre-username/GeoPulse-AI.git
cd GeoPulse-AI

# 2. Créer un environnement virtuel
python -m venv venv
source venv/bin/activate  # Linux/MacOS
# ou
venv\Scripts\activate     # Windows

# 3. Installer les dépendances
pip install -r requirements.txt

# 4. Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos clés API et configuration DB
```

**Fichier `.env` requis :**
```env
GEMINI_API_KEY=votre_cle_api
DATABASE_URL=postgresql://user:password@localhost:5432/geopulse
REDIS_URL=redis://localhost:6379  # Optionnel
```

```bash
# 5. Initialiser la base de données
python scripts/init_db.py

# 6. Lancer le serveur
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

L'API est maintenant accessible sur `http://localhost:8000`  
Documentation interactive : `http://localhost:8000/docs`

---

## 🚀 Utilisation Rapide

### Via l'API Python

```python
from geopulse import GeoAgent
from geopulse.config import Config

# Configuration
config = Config(
    data_path="data/ouagadougou_2026.geojson",
    model="gemini-2.5-flash"
)

# Initialisation de l'agent
agent = GeoAgent(config)

# Analyse conversationnelle
response = agent.ask(
    "Identifie les zones de forte densité sans accès aux infrastructures de santé"
)

print(f"Résumé : {response.summary}")
print(f"Carte : {response.map_url}")
print(f"Recommandations : {response.recommendations}")
```

### Via l'API REST

```bash
curl -X POST http://localhost:8000/api/v1/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Quelle est l'\''évolution du couvert végétal depuis 2020 ?",
    "dataset": "ouagadougou",
    "format": "geojson"
  }'
```

### Exemples de Requêtes Supportées

- 🏗️ *"Montre l'expansion urbaine dans l'arrondissement 5 entre 2015 et 2025"*
- 🌳 *"Identifie les zones à risque d'inondation selon la topographie"*
- 🏥 *"Quels quartiers sont à plus de 2 km d'un centre de santé ?"*
- 🛣️ *"Analyse la connectivité du réseau routier dans les zones périphériques"*

---

## 📁 Structure du Projet

```
GeoPulse-AI/
├── src/
│   ├── core/               # Logique métier
│   │   ├── agent.py        # GeoAgent principal
│   │   ├── spatial/        # Algorithmes d'analyse spatiale
│   │   └── prompts/        # Templates de prompts Gemini
│   ├── api/                # Routes FastAPI
│   ├── models/             # Modèles de données
│   └── utils/              # Utilitaires
├── frontend/               # Application Angular
├── data/                   # Datasets exemple
├── tests/                  # Tests unitaires et intégration
├── docs/                   # Documentation détaillée
├── scripts/                # Scripts utilitaires
├── .env.example            # Template de configuration
├── requirements.txt        # Dépendances Python
└── main.py                 # Point d'entrée
```

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici les axes prioritaires :

### 🔍 Nous Recherchons

- **Prompt Engineering** : Amélioration des prompts système Gemini pour l'analyse spatiale
- **Data Scientists** : Optimisation des algorithmes d'analyse géospatiale
- **Développeurs Full-Stack** : Amélioration du frontend Angular et visualisations
- **Experts SIG** : Support pour nouveaux formats (GeoPackage, KML, etc.)
- **Testeurs** : Validation sur différents territoires et jeux de données

### Processus de Contribution

1. Forkez le projet
2. Créez une branche : `git checkout -b feature/ma-fonctionnalite`
3. Committez vos changements : `git commit -m 'feat: ajout du support KML'`
4. Poussez : `git push origin feature/ma-fonctionnalite`
5. Ouvrez une Pull Request

> Consultez [CONTRIBUTING.md](CONTRIBUTING.md) pour les conventions de code et le processus détaillé.

---

## 📊 Roadmap

- [x] Support GeoJSON et Shapefile
- [x] Intégration Gemini API
- [x] Analyse de densité et buffer zones
- [ ] Export des résultats en PDF/PNG
- [ ] Tableau de bord d'indicateurs urbains
- [ ] Support d'OpenStreetMap en source de données
- [ ] Analyse temporelle multi-dates
- [ ] Intégration imagerie satellite

---

## 📜 Licence

Distribué sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus d'informations.

---

## 👥 Auteurs & Remerciements

**Développeur Principal** : [Votre Nom]  
- GitHub : [@votre-username](https://github.com/votre-username)
- LinkedIn : [Votre Profil](https://linkedin.com/in/votre-profil)

**Projet réalisé dans le cadre du Master FD&IA - Université Virtuelle du Burkina Faso**

*Si vous utilisez GeoPulse-AI pour vos recherches ou projets de développement urbain, signalez-le nous ! Nous serons ravis de référencer vos travaux.*

---

## 📚 Références

- [Google Gemini API Documentation](https://ai.google.dev/docs)
- [GeoPandas User Guide](https://geopandas.org/en/stable/docs/user_guide.html)
- [PostGIS Manual](https://postgis.net/documentation/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
