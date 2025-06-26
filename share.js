// =============================================
// CONFIGURATION - À MODIFIER LORS DE LA MISE EN LIGNE
// =============================================
const sharingConfig = {
    siteUrl: "https://lmarket.netlify.app",  // Ton vrai lien
    urlType: "id",                            // "id" (recommandé) ou "slug"
    productsPath: "/produits/"                // Le chemin des produits
};

// =============================================
// FONCTIONS PRINCIPALES - NE PAS MODIFIER
// =============================================

/**
 * Initialise tous les boutons de partage
 */
function initShareButtons() {
    document.querySelectorAll('.share-btn').forEach(button => {
        button.addEventListener('click', handleShareClick);
    });

    document.querySelectorAll('.copy-link-btn').forEach(button => {
        button.addEventListener('click', handleCopyLinkClick);
    });
}

/**
 * Gère le clic sur un bouton de partage
 */
function handleShareClick(event) {
    const product = event.target.closest('.product');
    if (!product) return;

    const productId = product.getAttribute('data-id');
    const productName = product.getAttribute('data-name');

    const productUrl = generateProductUrl(productId, productName);
    const fullText = `Découvrez ${productName} sur ${productUrl}`;

    const platform = event.target.getAttribute('data-share');
    executeShare(platform, productUrl, fullText);
}

/**
 * Gère le clic sur le bouton "Copier le lien"
 */
function handleCopyLinkClick(event) {
    const product = event.target.closest('.product');
    if (!product) return;

    const productId = product.getAttribute('data-id');
    const productName = product.getAttribute('data-name');

    const productUrl = generateProductUrl(productId, productName);

    // Copier dans le presse-papiers
    navigator.clipboard.writeText(productUrl).then(() => {
        alert("🔗 Lien copié dans le presse-papiers !");
    }).catch(err => {
        console.error("Erreur de copie : ", err);
        alert("❌ Impossible de copier le lien.");
    });
}

/**
 * Génère l'URL du produit selon la configuration
 */
function generateProductUrl(id, name) {
    let productSlug;

    if (sharingConfig.urlType === "slug") {
        productSlug = name.toLowerCase()
            .replace(/\s+/g, '-')
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    } else {
        productSlug = id;
    }

    return sharingConfig.siteUrl + sharingConfig.productsPath + productSlug;
}

/**
 * Exécute le partage sur le réseau social
 */
function executeShare(platform, url, fullText) {
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(fullText);

    const shareUrls = {
        facebook: `https://www.facebook.com/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
        whatsapp: `https://wa.me/?text=${encodedText}`
    };

    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// =============================================
// LOGIQUE D'AFFICHAGE DU PRODUIT À L'ARRIVÉE PAR URL
// =============================================

document.addEventListener("DOMContentLoaded", function() {
    initShareButtons();

    const path = window.location.pathname;
    const regex = /^\/produits\/(.+)$/;
    const match = path.match(regex);

    if (match) {
        const idOuSlug = match[1];

        if (sharingConfig.urlType === "id") {
            const productElement = document.querySelector(`.product[data-id="${idOuSlug}"]`);
            if (productElement) {
                productElement.scrollIntoView({ behavior: "smooth" });
                productElement.classList.add("highlight");

                setTimeout(() => {
                    productElement.classList.remove("highlight");
                }, 3000);
            } else {
                afficherErreurProduitIntrouvable();
            }
        } else if (sharingConfig.urlType === "slug") {
            const products = document.querySelectorAll(".product");
            let found = false;

            products.forEach(product => {
                const name = product.getAttribute("data-name");
                const slug = name.toLowerCase()
                    .replace(/\s+/g, '-')
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

                if (slug === idOuSlug) {
                    product.scrollIntoView({ behavior: "smooth" });
                    product.classList.add("highlight");
                    found = true;
                }
            });

            if (!found) {
                afficherErreurProduitIntrouvable();
            }
        }
    }

    function afficherErreurProduitIntrouvable() {
        document.body.innerHTML = `<h2 style="text-align:center;">Produit introuvable 😢 <br> Accedez à <a href="https://lmarket.netlify.app"> La page d'acceuil</a> </h2>`;
    }
});