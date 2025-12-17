/*
  Import getAllAppointments to fetch appointments from the backend
  Import createPatientRow to generate a table row for each patient appointment


  Get the table body where patient rows will be added
  Initialize selectedDate with today's date in 'YYYY-MM-DD' format
  Get the saved token from localStorage (used for authenticated API calls)
  Initialize patientName to null (used for filtering by name)


  Add an 'input' event listener to the search bar
  On each keystroke:
    - Trim and check the input value
    - If not empty, use it as the patientName for filtering
    - Else, reset patientName to "null" (as expected by backend)
    - Reload the appointments list with the updated filter


  Add a click listener to the "Today" button
  When clicked:
    - Set selectedDate to today's date
    - Update the date picker UI to match
    - Reload the appointments for today


  Add a change event listener to the date picker
  When the date changes:
    - Update selectedDate with the new value
    - Reload the appointments for that specific date


  Function: loadAppointments
  Purpose: Fetch and display appointments based on selected date and optional patient name

  Step 1: Call getAllAppointments with selectedDate, patientName, and token
  Step 2: Clear the table body content before rendering new rows

  Step 3: If no appointments are returned:
    - Display a message row: "No Appointments found for today."

  Step 4: If appointments exist:
    - Loop through each appointment and construct a 'patient' object with id, name, phone, and email
    - Call createPatientRow to generate a table row for the appointment
    - Append each row to the table body

  Step 5: Catch and handle any errors during fetch:
    - Show a message row: "Error loading appointments. Try again later."


  When the page is fully loaded (DOMContentLoaded):
    - Call renderContent() (assumes it sets up the UI layout)
    - Call loadAppointments() to display today's appointments by default
*/
import { getAllAppointments } from './services/appointmentRecordService.js';
import { createPatientRow } from './components/patientRows.js';

// Get references to DOM elements
const tableBody = document.getElementById('appointmentsTableBody');

// Initialize selectedDate with today's date in 'YYYY-MM-DD' format
const today = new Date();
const selectedDate = today.toISOString().split('T')[0]; // e.g., "2025-12-17"

// Get authentication token from localStorage
const token = localStorage.getItem('authToken');

// Initialize patientName for filtering (null means no name filter)
let patientName = null;

// Handle search input for patient name filtering
const searchBar = document.getElementById('searchBar');
if (searchBar) {
  searchBar.addEventListener('input', (e) => {
    const inputValue = e.target.value.trim();
    patientName = inputValue !== '' ? inputValue : null;
    loadAppointments();
  });
}

// Handle "Today" button click
const todayBtn = document.getElementById('todayBtn');
if (todayBtn) {
  todayBtn.addEventListener('click', () => {
    const newToday = new Date().toISOString().split('T')[0];
    selectedDateInput.value = newToday; // Update the date picker UI
    // Update the global selectedDate (we'll manage it via the input element below)
    loadAppointments();
  });
}

// Handle date picker changes
const selectedDateInput = document.getElementById('datePicker');
if (selectedDateInput) {
  // Initialize date picker to today
  selectedDateInput.value = selectedDate;

  selectedDateInput.addEventListener('change', () => {
    loadAppointments();
  });
}

/**
 * Fetch and display appointments based on selected date and optional patient name
 */
async function loadAppointments() {
  // Use the current value from the date picker as selectedDate
  const date = selectedDateInput?.value || selectedDate;
  // Use current patientName (could be string or null)
  const nameFilter = patientName;

  try {
    const appointments = await getAllAppointments(date, nameFilter, token);

    // Clear existing table rows
    tableBody.innerHTML = '';

    if (!appointments || appointments.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5" class="no-appointments">No Appointments found for ${date}.</td></tr>`;
      return;
    }

    // Render each appointment as a patient row
    appointments.forEach(appointment => {
      const patient = {
        id: appointment.patientId || appointment.id,
        name: appointment.patientName || 'N/A',
        phone: appointment.patientPhone || 'N/A',
        email: appointment.patientEmail || 'N/A',
        // Pass the full appointment if needed by createPatientRow
        appointmentTime: appointment.time || 'Unknown',
      };

      const row = createPatientRow(patient, appointment);
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error loading appointments:', error);
    tableBody.innerHTML = `<tr><td colspan="5" class="error">Error loading appointments. Try again later.</td></tr>`;
  }
}

// Initialize UI when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderContent === 'function') {
    renderContent(); // Assume this exists globally or is imported
  }
  loadAppointments();
});