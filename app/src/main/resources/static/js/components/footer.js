/*
  Fonction pour rendre le contenu du pied de page dans la page
  Cette section génère dynamiquement le contenu du pied de page pour la page web, 
  incluant le logo de l'hôpital, les informations de copyright et divers liens utiles.
*/

// Fonction principale pour rendre le pied de page
function renderFooter() {
  // 1. Sélectionner l'élément footer du DOM
  const footerElement = document.getElementById("footer");
  
  if (!footerElement) {
    console.error("Footer element not found");
    return;
  }

  // 2. Déterminer le chemin relatif des assets selon la page actuelle
  const isRootPage = window.location.pathname === "/" || window.location.pathname.endsWith("/index.html");
  const assetsPath = isRootPage ? "assets" : "../assets";

  // 3. Créer le contenu HTML du pied de page
  const footerContent = `
    <footer class="footer">
      <div class="footer-container">
        <!-- Logo et informations de copyright -->
        <div class="footer-logo">
          <img src="${assetsPath}/images/logo/logo.png" alt="Hospital CMS Logo">
          <p>© Copyright 2025. All Rights Reserved by Hospital CMS.</p>
        </div>

        <!-- Section des liens organisés en colonnes -->
        <div class="footer-links">
          <!-- Colonne Company -->
          <div class="footer-column">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
          </div>

          <!-- Colonne Support -->
          <div class="footer-column">
            <h4>Support</h4>
            <a href="#">Account</a>
            <a href="#">Help Center</a>
            <a href="#">Contact Us</a>
          </div>

          <!-- Colonne Legals -->
          <div class="footer-column">
            <h4>Legals</h4>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Licensing</a>
          </div>
        </div>
      </div>
    </footer>
  `;

  // 4. Insérer le contenu généré dans l'élément footer
  footerElement.innerHTML = footerContent;
}

// Appeler renderFooter au chargement de la page
document.addEventListener("DOMContentLoaded", renderFooter);
