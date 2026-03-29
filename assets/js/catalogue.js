async function loadProducts() {
  const response = await fetch("data/produits.json");
  if (!response.ok) {
    throw new Error("Impossible de charger produits.json");
  }
  return await response.json();
}

function badgeClass(statut) {
  if (statut === "Réservé") return "badge-soft badge-reserve";
  if (statut === "Vendu") return "badge-soft badge-vendu";
  return "badge-soft";
}

function renderCard(produit) {
  return `
    <div class="col-sm-6 col-lg-4">
      <div class="product-card">
        <img src="${produit.image}" alt="${produit.nom}">
        <div class="card-body d-flex flex-column">
          <span class="${badgeClass(produit.statut)} mb-3">${produit.statut}</span>
          <h2 class="h5">${produit.nom}</h2>
          <p class="mb-1">
            ${produit.taille || produit.age || ""}${produit.prix ? ` • ${produit.prix} €` : ""}
          </p>
          <p class="small text-muted mb-2">
            ${produit.collection ? `Collection ${produit.collection}` : ""}
          </p>
          <p class="small text-muted mb-3">${produit.description}</p>
          <a href="produit.html?id=${produit.id}" class="btn btn-retro mt-auto">Voir la pièce</a>
        </div>
      </div>
    </div>
  `;
}

async function initCatalogue() {
  const grid = document.getElementById("catalogueGrid");
  const filtreCategorie = document.getElementById("filtreCategorie");
  const filtreTaille = document.getElementById("filtreTaille");
  const filtreCollection = document.getElementById("filtreCollection");
  const filtreStatut = document.getElementById("filtreStatut");
  const recherche = document.getElementById("recherche");

  if (!grid) return;

  let produits = [];

  try {
    produits = await loadProducts();
  } catch (error) {
    grid.innerHTML = `
      <div class="col-12">
        <div class="feature-card text-center">
          <p class="mb-0">Le catalogue n’a pas pu être chargé.</p>
        </div>
      </div>
    `;
    console.error(error);
    return;
  }

  function afficher(data) {
    if (!data.length) {
      grid.innerHTML = `
        <div class="col-12">
          <div class="feature-card text-center">
            <p class="mb-0">Aucune pièce ne correspond à la recherche.</p>
          </div>
        </div>
      `;
      return;
    }

    grid.innerHTML = data.map(renderCard).join("");
  }

  function filtrer() {
    const categorie = filtreCategorie ? filtreCategorie.value : "tous";
    const taille = filtreTaille ? filtreTaille.value : "tous";
    const collection = filtreCollection ? filtreCollection.value : "toutes";
    const statut = filtreStatut ? filtreStatut.value : "tous";
    const texte = recherche ? recherche.value.toLowerCase().trim() : "";

    const resultat = produits.filter((p) => {
      const categorieProduit = (p.categorie || "").toLowerCase();
      const tailleProduit = (p.taille || p.age || "").toLowerCase();
      const collectionProduit = (p.collection || "").toLowerCase();
      const statutProduit = p.statut || "";

      const nom = (p.nom || "").toLowerCase();
      const description = (p.description || "").toLowerCase();
      const matiere = (p.matiere || "").toLowerCase();
      const epoque = (p.epoque || "").toLowerCase();

      const okCategorie =
        categorie === "tous" || categorieProduit === categorie.toLowerCase();

      const okTaille =
        taille === "tous" || tailleProduit === taille.toLowerCase();

      const okCollection =
        collection === "toutes" || collectionProduit === collection.toLowerCase();

      const okStatut =
        statut === "tous" || statutProduit === statut;

      const okTexte =
        texte === "" ||
        nom.includes(texte) ||
        description.includes(texte) ||
        matiere.includes(texte) ||
        epoque.includes(texte) ||
        tailleProduit.includes(texte) ||
        collectionProduit.includes(texte);

      return okCategorie && okTaille && okCollection && okStatut && okTexte;
    });

    afficher(resultat);
  }

  if (filtreCategorie) filtreCategorie.addEventListener("change", filtrer);
  if (filtreTaille) filtreTaille.addEventListener("change", filtrer);
  if (filtreCollection) filtreCollection.addEventListener("change", filtrer);
  if (filtreStatut) filtreStatut.addEventListener("change", filtrer);
  if (recherche) recherche.addEventListener("input", filtrer);

  afficher(produits);
}

initCatalogue();