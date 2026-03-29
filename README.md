# Babounette

Babounette est le site de la collection enfant de Babetchka Vintage.

Le projet présente un catalogue de vêtements bébé et enfant, un univers visuel inspiré des années 60–70 et des fiches produit générées à partir d’un fichier Excel.

---

## Aperçu

Le site contient :

- une page d’accueil
- un catalogue filtrable
- des fiches produit
- une page « univers »
- une page contact
- une page mentions légales

Le catalogue est alimenté automatiquement à partir d’un fichier Excel converti en JSON.

---

## Technologies utilisées

- HTML5
- CSS3
- JavaScript vanilla
- Bootstrap 5
- Python 3
- Pandas

---

## Arborescence

```text
.
├── assets
│   ├── css
│   │   └── style.css
│   ├── img
│   │   ├── deco
│   │   └── produits
│   └── js
│       ├── catalogue.js
│       ├── main.js
│       └── produit.js
├── catalogue.html
├── contact.html
├── data
│   ├── catalogue.xlsx
│   └── produits.json
├── index.html
├── mentions-legales.html
├── produit.html
├── univers.html
├── scripts
│   └── excel_to_json.py
└── requirements.txt
```

---

## Installation en local

### Cloner le dépôt

#### Linux / Ubuntu / macOS

```bash
git clone https://github.com/CMartinArchives/babounette.git
cd babounette
```

#### Windows (PowerShell)

```powershell
git clone https://github.com/CMartinArchives/babounette.git
cd babounette
```

### Installer les dépendances Python

#### Linux / Ubuntu

```bash
pip3 install -r requirements.txt
```

#### macOS

```bash
python3 -m pip install -r requirements.txt
```

#### Windows (PowerShell)

```powershell
pip install -r requirements.txt
```

### Générer le fichier JSON à partir du catalogue Excel

#### Linux / Ubuntu

```bash
python3 scripts/excel_to_json.py
```

#### macOS

```bash
python3 scripts/excel_to_json.py
```

#### Windows (PowerShell)

```powershell
python scripts\excel_to_json.py
```

### Lancer un serveur local

#### Linux / Ubuntu

```bash
python3 -m http.server 8000
```

#### macOS

```bash
python3 -m http.server 8000
```

#### Windows (PowerShell)

```powershell
python -m http.server 8000
```

Puis ouvrir dans le navigateur :

```text
http://localhost:8000
```

---

## Fonctionnement du catalogue

Le site utilise deux fichiers :

- `data/catalogue.xlsx` : fichier modifiable contenant les produits
- `data/produits.json` : fichier généré automatiquement utilisé par le site

Après chaque modification du fichier Excel, il faut régénérer le JSON :

```bash
python scripts/excel_to_json.py
```

Les colonnes attendues dans le fichier Excel sont :

- `id`
- `date_ajout`
- `nom`
- `categorie`
- `age`
- `taille`
- `prix`
- `statut`
- `matiere`
- `epoque`
- `description`
- `image`

---

## Pages du site

| Fichier | Description |
|---------|-------------|
| `index.html` | Page d’accueil |
| `catalogue.html` | Catalogue filtrable |
| `produit.html` | Fiche produit dynamique |
| `univers.html` | Univers visuel et histoire de Babounette |
| `contact.html` | Page de contact |
| `mentions-legales.html` | Mentions légales |

---

## Scripts JavaScript

| Fichier | Rôle |
|---------|------|
| `assets/js/main.js` | Affiche les dernières pièces sur la page d’accueil |
| `assets/js/catalogue.js` | Gère le catalogue et les filtres |
| `assets/js/produit.js` | Charge une fiche produit selon l’ID présent dans l’URL |