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

function productCard(produit) {
  return `
    <div class="col-sm-6 col-lg-3">
      <div class="product-card">
        <img src="${produit.image}" alt="${produit.nom}">
        <div class="card-body d-flex flex-column">
          <span class="${badgeClass(produit.statut)} mb-3">${produit.statut}</span>
          <h3 class="h5">${produit.nom}</h3>
          <p class="mb-1">${produit.age} • ${produit.prix} €</p>
          <p class="small text-muted mb-3">${produit.epoque}</p>
          <a href="produit.html?id=${produit.id}" class="btn btn-retro mt-auto">Voir la pièce</a>
        </div>
      </div>
    </div>
  `;
}

async function initHome() {
  const container = document.getElementById("latestProducts");
  if (!container) return;

  try {
    const produits = await loadProducts();

    const latest = [...produits]
      .sort((a, b) => new Date(b.date_ajout) - new Date(a.date_ajout))
      .slice(0, 4);

    container.innerHTML = latest.map(productCard).join("");
  } catch (error) {
    container.innerHTML = `
      <div class="col-12">
        <div class="feature-card text-center">
          <p class="mb-0">Les dernières sorties n’ont pas pu être chargées.</p>
        </div>
      </div>
    `;
    console.error(error);
  }
}

initHome();