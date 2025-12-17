// Attach a click listener to the "Add Doctor" button
document.getElementById('addDoctorBtn')?.addEventListener('click', () => {
  openModal('addDoctor');
});

// When the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  loadDoctorCards();
});

/**
 * Fetch all doctors and display them as cards
 */
async function loadDoctorCards() {
  try {
    const doctors = await getDoctors();
    const contentDiv = document.getElementById('doctorCardsContainer');
    contentDiv.innerHTML = ''; // Clear current content

    doctors.forEach(doctor => {
      const card = createDoctorCard(doctor);
      contentDiv.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading doctor cards:', error);
  }
}

// Attach event listeners to filter inputs
const searchBar = document.getElementById('searchBar');
const timeFilter = document.getElementById('timeFilter');
const specialtyFilter = document.getElementById('specialtyFilter');

[searchBar, timeFilter, specialtyFilter].forEach(element => {
  if (element) {
    element.addEventListener('input', filterDoctorsOnChange);
    element.addEventListener('change', filterDoctorsOnChange);
  }
});

/**
 * Filter doctors based on name, available time, and specialty
 */
async function filterDoctorsOnChange() {
  try {
    const name = searchBar?.value.trim() || '';
    const time = timeFilter?.value || '';
    const specialty = specialtyFilter?.value || '';

    const normalizedName = name === '' ? '' : name;
    const normalizedTime = time === 'all' || time === '' ? '' : time;
    const normalizedSpecialty = specialty === 'all' || specialty === '' ? '' : specialty;

    const response = await filterDoctors(normalizedName, normalizedTime, normalizedSpecialty);
    const doctors = response.doctors || [];

    const contentDiv = document.getElementById('doctorCardsContainer');
    contentDiv.innerHTML = '';

    if (doctors.length > 0) {
      doctors.forEach(doctor => {
        const card = createDoctorCard(doctor);
        contentDiv.appendChild(card);
      });
    } else {
      contentDiv.innerHTML = '<p class="no-results">No doctors found with the given filters.</p>';
    }
  } catch (error) {
    console.error('Error during filtering:', error);
    alert('An error occurred while filtering doctors. Please try again.');
  }
}

/**
 * Helper function to render a list of doctors
 * @param {Array} doctors - Array of doctor objects
 */
function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById('doctorCardsContainer');
  contentDiv.innerHTML = '';

  if (doctors && doctors.length > 0) {
    doctors.forEach(doctor => {
      const card = createDoctorCard(doctor);
      contentDiv.appendChild(card);
    });
  } else {
    contentDiv.innerHTML = '<p class="no-results">No doctors available.</p>';
  }
}

/**
 * Collect form data and add a new doctor to the system
 */
async function adminAddDoctor() {
  // Collect form values
  const name = document.getElementById('doctorName')?.value.trim();
  const email = document.getElementById('doctorEmail')?.value.trim();
  const phone = document.getElementById('doctorPhone')?.value.trim();
  const password = document.getElementById('doctorPassword')?.value;
  const specialty = document.getElementById('doctorSpecialty')?.value;
  const availableTimes = Array.from(document.querySelectorAll('input[name="availableTimes"]:checked'))
    .map(cb => cb.value);

  // Validate required fields (optional but recommended)
  if (!name || !email || !password || !specialty || availableTimes.length === 0) {
    alert('Please fill in all required fields and select at least one available time.');
    return;
  }

  // Retrieve auth token
  const token = localStorage.getItem('authToken');
  if (!token) {
    alert('Authentication token missing. Please log in again.');
    return;
  }

  // Build doctor object
  const doctor = {
    name,
    email,
    phone,
    password,
    specialty,
    availableTimes,
  };

  try {
    const result = await saveDoctor(doctor, token);
    if (result.success) {
      alert('Doctor added successfully!');
      closeModal('addDoctor');
      location.reload(); // Reload to show new doctor
    } else {
      alert('Failed to add doctor: ' + (result.message || 'Unknown error'));
    }
  } catch (error) {
    console.error('Error in adminAddDoctor:', error);
    alert('An unexpected error occurred while adding the doctor.');
  }
}