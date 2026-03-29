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

async function initProductPage() {
  const container = document.getElementById("productDetail");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  try {
    const produits = await loadProducts();
    const produit = produits.find((p) => p.id === id);

    if (!produit) {
      container.innerHTML = `
        <div class="feature-card text-center">
          <h1 class="section-title">Pièce introuvable</h1>
          <p>Cette fiche n’existe pas ou n’est plus disponible.</p>
          <a href="catalogue.html" class="btn btn-retro">Retour au catalogue</a>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="row g-5 align-items-start">
        <div class="col-lg-6">
          <img src="${produit.image}" alt="${produit.nom}" class="product-detail-img">
        </div>

        <div class="col-lg-6">
          <div class="product-panel">
            <span class="${badgeClass(produit.statut)} mb-3 d-inline-block">${produit.statut}</span>
            <h1 class="section-title text-start">${produit.nom}</h1>
            <p class="fs-4 mb-3">${produit.prix} €</p>
            <p>${produit.description}</p>

            <ul class="meta-list mb-4">
              <li><strong>Catégorie :</strong> ${produit.categorie}</li>
              <li><strong>Âge :</strong> ${produit.age}</li>
              <li><strong>Taille :</strong> ${produit.taille}</li>
              <li><strong>Matière :</strong> ${produit.matiere}</li>
              <li><strong>Époque :</strong> ${produit.epoque}</li>
              <li><strong>Ajoutée le :</strong> ${produit.date_ajout}</li>
            </ul>

            <a href="contact.html" class="btn btn-retro">Réserver / demander</a>
            <a href="catalogue.html" class="btn btn-outline-retro ms-2">Retour</a>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    container.innerHTML = `
      <div class="feature-card text-center">
        <p class="mb-0">La fiche produit n’a pas pu être chargée.</p>
      </div>
    `;
    console.error(error);
  }
}

initProductPage();