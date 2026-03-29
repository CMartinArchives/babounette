from pathlib import Path
import json
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent
EXCEL_FILE = BASE_DIR / "data" / "catalogue.xlsx"
JSON_FILE = BASE_DIR / "data" / "produits.json"

REQUIRED_COLUMNS = [
    "id",
    "date_ajout",
    "nom",
    "categorie",
    "age",
    "taille",
    "prix",
    "statut",
    "matiere",
    "epoque",
    "description",
    "image",
]

def main():
    if not EXCEL_FILE.exists():
        raise FileNotFoundError(f"Fichier introuvable : {EXCEL_FILE}")

    df = pd.read_excel(EXCEL_FILE)

    missing = [col for col in REQUIRED_COLUMNS if col not in df.columns]
    if missing:
        raise ValueError(f"Colonnes manquantes dans l'Excel : {missing}")

    df = df[REQUIRED_COLUMNS].copy()

    df["id"] = df["id"].astype(int)
    df["prix"] = df["prix"].astype(float)
    df["date_ajout"] = pd.to_datetime(df["date_ajout"], errors="coerce")

    if df["date_ajout"].isna().any():
        raise ValueError("Certaines dates dans 'date_ajout' sont invalides.")

    df["date_ajout"] = df["date_ajout"].dt.strftime("%Y-%m-%d")

    produits = df.to_dict(orient="records")

    JSON_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(JSON_FILE, "w", encoding="utf-8") as f:
        json.dump(produits, f, ensure_ascii=False, indent=2)

    print(f"JSON généré : {JSON_FILE}")

if __name__ == "__main__":
    main()