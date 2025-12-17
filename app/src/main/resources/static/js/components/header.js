/*
  Step-by-Step Explanation of Header Section Rendering

  This code dynamically renders the header section of the page based on the user's role, session status, and available actions (such as login, logout, or role-switching).
*/

// Fonction principale pour rendre l'en-tête
function renderHeader() {
  // 1. Sélectionner l'élément div de l'en-tête
  const headerDiv = document.getElementById("header");
  
  if (!headerDiv) {
    console.error("Header div not found");
    return;
  }

  // 2. Vérifier si la page actuelle est la page d'accueil (racine)
  // Sur la page d'accueil, on affiche uniquement le logo sans éléments basés sur le rôle
  if (window.location.pathname === "/" || window.location.pathname.endsWith("/index.html")) {
    localStorage.removeItem("userRole");
    headerDiv.innerHTML = `
      <header class="header">
        <div class="logo-section">
          <img src="assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
          <span class="logo-title">Hospital CMS</span>
        </div>
      </header>`;
    return;
  }

  // 3. Récupérer le rôle et le token de l'utilisateur depuis localStorage
  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");

  // 4. Vérifier l'expiration de session ou connexion invalide
  if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
    localStorage.removeItem("userRole");
    alert("Session expirée ou connexion invalide. Veuillez vous reconnecter.");
    window.location.href = "/";
    return;
  }

  // 5. Initialiser le contenu de l'en-tête avec le logo
  let headerContent = `
    <header class="header">
      <div class="logo-section">
        <img src="../assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
        <span class="logo-title">Hospital CMS</span>
      </div>
      <nav>`;

  // 6. Ajouter le contenu spécifique selon le rôle de l'utilisateur
  if (role === "admin") {
    headerContent += `
      <button id="addDocBtn" class="adminBtn" onclick="openModal('addDoctor')">Add Doctor</button>
      <a href="#" onclick="logout()">Logout</a>`;
  } else if (role === "doctor") {
    headerContent += `
      <button class="adminBtn" onclick="selectRole('doctor')">Home</button>
      <a href="#" onclick="logout()">Logout</a>`;
  } else if (role === "patient") {
    headerContent += `
      <button id="patientLogin" class="adminBtn">Login</button>
      <button id="patientSignup" class="adminBtn">Sign Up</button>`;
  } else if (role === "loggedPatient") {
    headerContent += `
      <button id="home" class="adminBtn" onclick="window.location.href='/pages/loggedPatientDashboard.html'">Home</button>
      <button id="patientAppointments" class="adminBtn" onclick="window.location.href='/pages/patientAppointments.html'">Appointments</button>
      <a href="#" onclick="logoutPatient()">Logout</a>`;
  }

  // 7. Fermer les balises nav et header
  headerContent += `
      </nav>
    </header>`;

  // 8. Insérer le contenu généré dans le div de l'en-tête
  headerDiv.innerHTML = headerContent;

  // 9. Attacher les écouteurs d'événements aux boutons de l'en-tête
  attachHeaderButtonListeners();
}

// Fonction pour attacher les écouteurs d'événements aux boutons de l'en-tête
function attachHeaderButtonListeners() {
  const patientLoginBtn = document.getElementById("patientLogin");
  const patientSignupBtn = document.getElementById("patientSignup");

  if (patientLoginBtn) {
    patientLoginBtn.addEventListener("click", () => {
      openModal("patientLogin");
    });
  }

  if (patientSignupBtn) {
    patientSignupBtn.addEventListener("click", () => {
      openModal("patientSignup");
    });
  }
}

// Fonction de déconnexion pour admin et docteur
function logout() {
  localStorage.removeItem("userRole");
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  window.location.href = "/";
}

// Fonction de déconnexion pour les patients connectés
function logoutPatient() {
  localStorage.removeItem("userRole");
  localStorage.removeItem("token");
  localStorage.removeItem("patientId");
  window.location.href = "/pages/patientDashboard.html";
}

// Appeler renderHeader au chargement de la page
document.addEventListener("DOMContentLoaded", renderHeader);
