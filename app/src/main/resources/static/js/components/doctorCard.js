/*
  Fonction pour créer et retourner un élément DOM pour une carte de docteur
  Cette carte affiche les informations du docteur et des actions selon le rôle de l'utilisateur
*/

// Import des fonctions nécessaires (à définir dans les fichiers respectifs)
// import { showBookingOverlay } from './loggedPatient.js';
// import { deleteDoctor } from '../services/doctorServices.js';
// import { fetchPatientDetails } from '../services/patientServices.js';

/**
 * Crée une carte de docteur avec les informations et actions appropriées
 * @param {Object} doctor - Objet contenant les informations du docteur
 * @param {number} doctor.id - ID du docteur
 * @param {string} doctor.name - Nom du docteur
 * @param {string} doctor.specialization - Spécialisation du docteur
 * @param {string} doctor.email - Email du docteur
 * @param {Array<string>} doctor.availableTimes - Horaires disponibles
 * @returns {HTMLElement} - Élément DOM de la carte du docteur
 */
function createDoctorCard(doctor) {
  // 1. Créer le conteneur principal pour la carte du docteur
  const card = document.createElement('div');
  card.className = 'doctor-card';
  card.setAttribute('data-doctor-id', doctor.id);

  // 2. Récupérer le rôle actuel de l'utilisateur depuis localStorage
  const userRole = localStorage.getItem('userRole');

  // 3. Créer un div pour contenir les informations du docteur
  const doctorInfo = document.createElement('div');
  doctorInfo.className = 'doctor-info';

  // 4. Créer et définir le nom du docteur
  const doctorName = document.createElement('h3');
  doctorName.className = 'doctor-name';
  doctorName.textContent = doctor.name || 'Nom non disponible';

  // 5. Créer et définir la spécialisation du docteur
  const doctorSpecialization = document.createElement('p');
  doctorSpecialization.className = 'doctor-specialization';
  doctorSpecialization.innerHTML = `<strong>Spécialisation:</strong> ${doctor.specialization || 'Non spécifiée'}`;

  // 6. Créer et définir l'email du docteur
  const doctorEmail = document.createElement('p');
  doctorEmail.className = 'doctor-email';
  doctorEmail.innerHTML = `<strong>Email:</strong> ${doctor.email || 'Non disponible'}`;

  // 7. Créer et lister les horaires disponibles
  const availableTimes = document.createElement('div');
  availableTimes.className = 'doctor-available-times';
  
  const timesTitle = document.createElement('p');
  timesTitle.innerHTML = '<strong>Horaires disponibles:</strong>';
  availableTimes.appendChild(timesTitle);

  if (doctor.availableTimes && doctor.availableTimes.length > 0) {
    const timesList = document.createElement('ul');
    timesList.className = 'times-list';
    doctor.availableTimes.forEach(time => {
      const timeItem = document.createElement('li');
      timeItem.textContent = time;
      timesList.appendChild(timeItem);
    });
    availableTimes.appendChild(timesList);
  } else {
    const noTimes = document.createElement('p');
    noTimes.textContent = 'Aucun horaire disponible';
    noTimes.className = 'no-times';
    availableTimes.appendChild(noTimes);
  }

  // 8. Ajouter tous les éléments d'information au conteneur d'informations
  doctorInfo.appendChild(doctorName);
  doctorInfo.appendChild(doctorSpecialization);
  doctorInfo.appendChild(doctorEmail);
  doctorInfo.appendChild(availableTimes);

  // 9. Créer un conteneur pour les boutons d'action de la carte
  const actionsContainer = document.createElement('div');
  actionsContainer.className = 'doctor-card-actions';

  // 10. Gérer les actions selon le rôle de l'utilisateur
  
  // === ADMIN ROLE ACTIONS ===
  if (userRole === 'admin') {
    // Créer un bouton de suppression
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete';
    deleteBtn.textContent = 'Supprimer';
    
    // Ajouter un gestionnaire de clic pour le bouton de suppression
    deleteBtn.addEventListener('click', async () => {
      if (confirm(`Êtes-vous sûr de vouloir supprimer le Dr. ${doctor.name}?`)) {
        try {
          // Récupérer le token admin depuis localStorage
          const adminToken = localStorage.getItem('token');
          
          if (!adminToken) {
            alert('Session expirée. Veuillez vous reconnecter.');
            return;
          }

          // Appeler l'API pour supprimer le docteur
          const result = await deleteDoctor(doctor.id, adminToken);
          
          // Afficher le résultat et supprimer la carte si réussi
          if (result.success) {
            alert(`Le Dr. ${doctor.name} a été supprimé avec succès.`);
            card.remove();
          } else {
            alert(`Erreur lors de la suppression: ${result.message || 'Erreur inconnue'}`);
          }
        } catch (error) {
          console.error('Erreur lors de la suppression du docteur:', error);
          alert('Une erreur est survenue lors de la suppression du docteur.');
        }
      }
    });
    
    // Ajouter le bouton de suppression au conteneur d'actions
    actionsContainer.appendChild(deleteBtn);
  }
  
  // === PATIENT (NOT LOGGED-IN) ROLE ACTIONS ===
  else if (userRole === 'patient') {
    // Créer un bouton "Réserver maintenant"
    const bookBtn = document.createElement('button');
    bookBtn.className = 'btn-book';
    bookBtn.textContent = 'Réserver maintenant';
    
    // Alerter le patient qu'il doit se connecter avant de réserver
    bookBtn.addEventListener('click', () => {
      alert('Veuillez vous connecter pour réserver un rendez-vous.');
    });
    
    // Ajouter le bouton au conteneur d'actions
    actionsContainer.appendChild(bookBtn);
  }
  
  // === LOGGED-IN PATIENT ROLE ACTIONS ===
  else if (userRole === 'loggedPatient') {
    // Créer un bouton "Réserver maintenant"
    const bookBtn = document.createElement('button');
    bookBtn.className = 'btn-book';
    bookBtn.textContent = 'Réserver maintenant';
    
    // Gérer la logique de réservation pour un patient connecté
    bookBtn.addEventListener('click', async () => {
      try {
        // Vérifier si le token est disponible
        const patientToken = localStorage.getItem('token');
        
        if (!patientToken) {
          alert('Session expirée. Veuillez vous reconnecter.');
          window.location.href = '/pages/patientDashboard.html';
          return;
        }

        // Récupérer les données du patient avec le token
        const patientId = localStorage.getItem('patientId');
        if (!patientId) {
          alert('Informations patient non disponibles.');
          return;
        }

        const patientData = await fetchPatientDetails(patientId, patientToken);
        
        // Afficher l'overlay de réservation avec les infos du docteur et du patient
        if (typeof showBookingOverlay === 'function') {
          showBookingOverlay(doctor, patientData);
        } else {
          console.error('La fonction showBookingOverlay n\'est pas disponible');
          alert('Erreur: Impossible d\'ouvrir le formulaire de réservation');
        }
      } catch (error) {
        console.error('Erreur lors de la réservation:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
      }
    });
    
    // Ajouter le bouton au conteneur d'actions
    actionsContainer.appendChild(bookBtn);
  }

  // 11. Ajouter les informations du docteur et les boutons d'action à la carte
  card.appendChild(doctorInfo);
  card.appendChild(actionsContainer);

  // 12. Retourner l'élément complet de la carte du docteur
  return card;
}
