document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const noResultsMessage = document.getElementById('no-results-message');
    
    // Fonction optimisée
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const products = document.querySelectorAll('.product'); // Déplacé ici pour rafraîchir la liste
        let hasResults = false;
        
        products.forEach(product => {
            const productName = product.dataset.name.toLowerCase();
            const productClass = product.dataset.class.toLowerCase();
            const isVisible = searchTerm === '' || 
                             productName.includes(searchTerm) || 
                             productClass.includes(searchTerm);
            
            product.classList.toggle('hidden', !isVisible);
            if (isVisible) hasResults = true;
        });
        
        noResultsMessage.classList.toggle('hidden', hasResults || searchTerm === '');
    }
    
    // Gestionnaires d'événements améliorés
    searchButton.addEventListener('click', filterProducts);
    searchInput.addEventListener('input', filterProducts); // Réponse en temps réel
});

// Liste des suggestions (à adapter avec vos produits réels)
const suggestionsData = [
    "Accessoires",
    "Montre",
    "rolex",
    "Nike",
    "Jordan",
"téléphones",
"iphones",
"livres gratuits",
"livre payants",
"phones",
"ordinateurs",
"samsung",
"tecno",
"itel",
"sac",
"casio",
"veste",
"robe",
    "Pull Over",
    "Vêtement",
    "adidas",
    "Chaussure"
];

const searchInput = document.getElementById('search-input');
const searchSuggestions = document.getElementById('search-suggestions');

searchInput.addEventListener('input', function() {
    const inputText = this.value.toLowerCase();
    
    if (inputText.length < 2) {
        searchSuggestions.classList.add('hidden');
        return;
    }
    
    const filteredSuggestions = suggestionsData.filter(item => 
        item.toLowerCase().includes(inputText)
    );
    
    displaySuggestions(filteredSuggestions);
});

function displaySuggestions(suggestions) {
    if (suggestions.length === 0) {
        searchSuggestions.classList.add('hidden');
        return;
    }
    
    searchSuggestions.innerHTML = '';
    suggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.classList.add('search-suggestion-item');
        div.textContent = suggestion;
        div.addEventListener('click', function() {
            searchInput.value = suggestion;
            searchSuggestions.classList.add('hidden');
            filterProducts(); // Déclenche la recherche
        });
        searchSuggestions.appendChild(div);
    });
    
    searchSuggestions.classList.remove('hidden');
}

// Fermer les suggestions quand on clique ailleurs
document.addEventListener('click', function(e) {
    if (e.target !== searchInput) {
        searchSuggestions.classList.add('hidden');
    }
});



document.addEventListener('DOMContentLoaded', function() {
  const backToTopBtn = document.getElementById('back-to-top');
  const pageHeight = document.body.scrollHeight;
  const triggerOffset = 100; // 100px avant le bas

  function checkScroll() {
    // Vérifie si l'utilisateur est près du bas
    const nearBottom = window.innerHeight + window.scrollY >= pageHeight - triggerOffset;
    
    if (nearBottom) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  // Écoute le scroll
  window.addEventListener('scroll', checkScroll);

  // Clic sur le bouton
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Vérifie au chargement
  checkScroll();
});

// Gestion de la modale
const modal = document.getElementById('categories-modal');
const openBtn = document.getElementById('open-categories');
const closeBtn = document.querySelector('.close-modal');

openBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Filtrage des produits
document.querySelectorAll('.categories-list button').forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.category;
    
    // Masquer tous les produits
    document.querySelectorAll('.product').forEach(product => {
      product.style.display = 'none';
    });

    // Afficher ceux de la catégorie sélectionnée
    if (category === 'all') {
      document.querySelectorAll('.product').forEach(product => {
        product.style.display = 'block';
      });
    } else {
      document.querySelectorAll(`.product[data-category="${category}"]`).forEach(product => {
        product.style.display = 'block';
      });
    }

    // Fermer la modale
    modal.style.display = 'none';
  });
});

// Acheter l'article

document.querySelectorAll('.whatsapp-order-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const product = this.getAttribute('data-product');
    const price = this.getAttribute('data-price');
    const phone = this.getAttribute('data-phone');
    
    const message = `Bonjour depuis Lmarket, je souhaite commander cet article :\n*${product}* (${price})\n\nEst-il disponible ?`;
    
    const encodedMessage = encodeURIComponent(message);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    window.open(
      isMobile 
        ? `https://wa.me/${phone}?text=${encodedMessage}` 
        : `https://web.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`,
      '_blank'
    );
  });
});


function downloadPDF(url) {
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = url.split('/').pop(); // Nom du fichier
      a.click();
    })
    .catch(() => alert('Hors ligne : PDF non disponible'));
}

document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menuButton');
    const menuOverlay = document.getElementById('menuOverlay');

    menuButton.addEventListener('click', function() {
        menuOverlay.classList.toggle('active');
    });
});
