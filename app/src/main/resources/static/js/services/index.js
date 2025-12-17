/*
  Import the openModal function to handle showing login popups/modals
  Import the base API URL from the config file
  Define constants for the admin and doctor login API endpoints using the base URL

  Use the window.onload event to ensure DOM elements are available after page load
  Inside this function:
    - Select the "adminLogin" and "doctorLogin" buttons using getElementById
    - If the admin login button exists:
        - Add a click event listener that calls openModal('adminLogin') to show the admin login modal
    - If the doctor login button exists:
        - Add a click event listener that calls openModal('doctorLogin') to show the doctor login modal


  Define a function named adminLoginHandler on the global window object
  This function will be triggered when the admin submits their login credentials

  Step 1: Get the entered username and password from the input fields
  Step 2: Create an admin object with these credentials

  Step 3: Use fetch() to send a POST request to the ADMIN_API endpoint
    - Set method to POST
    - Add headers with 'Content-Type: application/json'
    - Convert the admin object to JSON and send in the body

  Step 4: If the response is successful:
    - Parse the JSON response to get the token
    - Store the token in localStorage
    - Call selectRole('admin') to proceed with admin-specific behavior

  Step 5: If login fails or credentials are invalid:
    - Show an alert with an error message

  Step 6: Wrap everything in a try-catch to handle network or server errors
    - Show a generic error message if something goes wrong


  Define a function named doctorLoginHandler on the global window object
  This function will be triggered when a doctor submits their login credentials

  Step 1: Get the entered email and password from the input fields
  Step 2: Create a doctor object with these credentials

  Step 3: Use fetch() to send a POST request to the DOCTOR_API endpoint
    - Include headers and request body similar to admin login

  Step 4: If login is successful:
    - Parse the JSON response to get the token
    - Store the token in localStorage
    - Call selectRole('doctor') to proceed with doctor-specific behavior

  Step 5: If login fails:
    - Show an alert for invalid credentials

  Step 6: Wrap in a try-catch block to handle errors gracefully
    - Log the error to the console
    - Show a generic error message
*/

// 1. Importations
import { openModal } from '../components/modals.js'; // Gestionnaire d'affichage des modals
import { BASE_URL } from '../config/config.js';         // URL de base de l'API

// 2. Définition des constantes d'endpoints
const ADMIN_API = `${BASE_URL}/admin/login`;
const DOCTOR_API = `${BASE_URL}/doctor/login`;

// 3. Initialisation au chargement de la page
window.onload = () => {
    const adminBtn = document.getElementById("adminLogin");
    const doctorBtn = document.getElementById("doctorLogin");

    // Écouteur pour le modal Admin
    if (adminBtn) {
        adminBtn.addEventListener('click', () => openModal('adminLogin'));
    }

    // Écouteur pour le modal Docteur
    if (doctorBtn) {
        doctorBtn.addEventListener('click', () => openModal('doctorLogin'));
    }
};

/**
 * 4. Gestionnaire de connexion Administrateur
 */
window.adminLoginHandler = async () => {
    // Étape 1 : Récupération des données
    const username = document.getElementById("adminUsername").value;
    const password = document.getElementById("adminPassword").value;

    // Étape 2 : Création de l'objet
    const admin = { username, password };

    try {
        // Étape 3 : Requête POST
        const response = await fetch(ADMIN_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(admin)
        });

        // Étape 4 : Succès
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('authToken', data.token);
            selectRole('admin'); // Fonction globale pour rediriger/adapter l'UI
        } else {
            // Étape 5 : Identifiants invalides
            alert("Identifiants administrateur invalides.");
        }
    } catch (error) {
        // Étape 6 : Erreur réseau ou serveur
        console.error("Erreur Admin Login:", error);
        alert("Une erreur est survenue lors de la connexion au serveur.");
    }
};

/**
 * 5. Gestionnaire de connexion Médecin
 */
window.doctorLoginHandler = async () => {
    // Étape 1 : Récupération des données
    const email = document.getElementById("doctorEmail").value;
    const password = document.getElementById("doctorPassword").value;

    // Étape 2 : Création de l'objet
    const doctorData = { email, password };

    try {
        // Étape 3 : Requête POST
        const response = await fetch(DOCTOR_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(doctorData)
        });

        // Étape 4 : Succès
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('authToken', data.token);
            selectRole('doctor');
        } else {
            // Étape 5 : Identifiants invalides
            alert("Email ou mot de passe médecin incorrect.");
        }
    } catch (error) {
        // Étape 6 : Gestion des erreurs
        console.error("Erreur Doctor Login:", error);
        alert("Impossible de contacter le serveur pour le moment.");
    }
};
