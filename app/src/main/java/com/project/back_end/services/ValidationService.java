package com.project.back_end.services;

// 1. **@Service Annotation**
// The @Service annotation marks this class as a service component in Spring. This allows Spring to automatically detect it through component scanning
// and manage its lifecycle, enabling it to be injected into controllers or other services using @Autowired or constructor injection.

// 2. **Constructor Injection for Dependencies**
// The constructor injects all required dependencies (TokenService, Repositories, and other Services). This approach promotes loose coupling, improves testability,
// and ensures that all required dependencies are provided at object creation time.

// 3. **validateToken Method**
// This method checks if the provided JWT token is valid for a specific user. It uses the TokenService to perform the validation.
// If the token is invalid or expired, it returns a 401 Unauthorized response with an appropriate error message. This ensures security by preventing
// unauthorized access to protected resources.

// 4. **validateAdmin Method**
// This method validates the login credentials for an admin user.
// - It first searches the admin repository using the provided username.
// - If an admin is found, it checks if the password matches.
// - If the password is correct, it generates and returns a JWT token (using the admin’s username) with a 200 OK status.
// - If the password is incorrect, it returns a 401 Unauthorized status with an error message.
// - If no admin is found, it also returns a 401 Unauthorized.
// - If any unexpected error occurs during the process, a 500 Internal Server Error response is returned.
// This method ensures that only valid admin users can access secured parts of the system.

// 5. **filterDoctor Method**
// This method provides filtering functionality for doctors based on name, specialty, and available time slots.
// - It supports various combinations of the three filters.
// - If none of the filters are provided, it returns all available doctors.
// This flexible filtering mechanism allows the frontend or consumers of the API to search and narrow down doctors based on user criteria.

// 6. **validateAppointment Method**
// This method validates if the requested appointment time for a doctor is available.
// - It first checks if the doctor exists in the repository.
// - Then, it retrieves the list of available time slots for the doctor on the specified date.
// - It compares the requested appointment time with the start times of these slots.
// - If a match is found, it returns 1 (valid appointment time).
// - If no matching time slot is found, it returns 0 (invalid).
// - If the doctor doesn’t exist, it returns -1.
// This logic prevents overlapping or invalid appointment bookings.

// 7. **validatePatient Method**
// This method checks whether a patient with the same email or phone number already exists in the system.
// - If a match is found, it returns false (indicating the patient is not valid for new registration).
// - If no match is found, it returns true.
// This helps enforce uniqueness constraints on patient records and prevent duplicate entries.

// 8. **validatePatientLogin Method**
// This method handles login validation for patient users.
// - It looks up the patient by email.
// - If found, it checks whether the provided password matches the stored one.
// - On successful validation, it generates a JWT token and returns it with a 200 OK status.
// - If the password is incorrect or the patient doesn't exist, it returns a 401 Unauthorized with a relevant error.
// - If an exception occurs, it returns a 500 Internal Server Error.
// This method ensures only legitimate patients can log in and access their data securely.

// 9. **filterPatient Method**
// This method filters a patient's appointment history based on condition and doctor name.
// - It extracts the email from the JWT token to identify the patient.
// - Depending on which filters (condition, doctor name) are provided, it delegates the filtering logic to PatientService.
// - If no filters are provided, it retrieves all appointments for the patient.
// This flexible method supports patient-specific querying and enhances user experience on the client side.






import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.project.back_end.models.Admin;
import com.project.back_end.models.Appointment;
import com.project.back_end.models.Doctor;
import com.project.back_end.models.Patient;
import com.project.back_end.repo.AdminRepository;
import com.project.back_end.repo.DoctorRepository;
import com.project.back_end.repo.PatientRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ValidationService {

    private final TokenService tokenService;
    private final AdminRepository adminRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final PatientService patientService;
    private final PasswordEncoder passwordEncoder;

    // Constructor Injection (Recommended by Spring)
    public ValidationService(TokenService tokenService,
                             AdminRepository adminRepository,
                             DoctorRepository doctorRepository,
                             PatientRepository patientRepository,
                             PatientService patientService,
                             PasswordEncoder passwordEncoder) {
        this.tokenService = tokenService;
        this.adminRepository = adminRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
        this.patientService = patientService;
        this.passwordEncoder = passwordEncoder;
    }

    // 3. validateToken
    public boolean validateToken(String token, String username) {
        try {
            return tokenService.validateToken(token, username);
        } catch (Exception e) {
            return false;
        }
    }

    // 4. validateAdmin
    public ResponseEntity<Map<String, Object>> validateAdmin(String username, String password) {
        try {
            Optional<Admin> adminOpt = adminRepository.findByUsername(username);
            if (adminOpt.isPresent()) {
                Admin admin = adminOpt.get();
                if (passwordEncoder.matches(password, admin.getPassword())) {
                    String token = tokenService.generateToken(username);
                    Map<String, Object> response = new HashMap<>();
                    response.put("token", token);
                    response.put("message", "Admin login successful");
                    return ResponseEntity.ok(response);
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                            .body(Map.of("error", "Invalid credentials"));
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Admin not found"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Internal server error during admin validation"));
        }
    }

    // 5. filterDoctor
    public List<Doctor> filterDoctor(String name, String specialty, String availableTime) {
        if (name == null && specialty == null && availableTime == null) {
            return doctorRepository.findAll();
        }

        return doctorRepository.findAll().stream()
                .filter(doctor -> (name == null || doctor.getName().toLowerCase().contains(name.toLowerCase())))
                .filter(doctor -> (specialty == null || doctor.getSpecialty().equalsIgnoreCase(specialty)))
                .filter(doctor -> (availableTime == null || 
                    doctor.getAvailableTimeSlots().stream()
                        .anyMatch(slot -> slot.equals(availableTime))))
                .collect(Collectors.toList());
    }

    // 6. validateAppointment
    public int validateAppointment(Long doctorId, LocalDate appointmentDate, String requestedTime) {
        Optional<Doctor> doctorOpt = doctorRepository.findById(doctorId);
        if (doctorOpt.isEmpty()) {
            return -1; // Doctor not found
        }

        Doctor doctor = doctorOpt.get();
        // Assume doctor has a map: Map<LocalDate, List<String>> availableSlots
        List<String> availableSlots = doctor.getAvailableSlots().get(appointmentDate);

        if (availableSlots == null || availableSlots.isEmpty()) {
            return 0; // No slots on that date
        }

        // Check if requested time matches any available slot (exact match)
        if (availableSlots.contains(requestedTime)) {
            return 1; // Valid
        }
        return 0; // Invalid time
    }

    // 7. validatePatient (for registration)
    public boolean validatePatient(String email, String phone) {
        return !patientRepository.existsByEmailOrPhone(email, phone);
    }

    // 8. validatePatientLogin
    public ResponseEntity<Map<String, Object>> validatePatientLogin(String email, String password) {
        try {
            Optional<Patient> patientOpt = patientRepository.findByEmail(email);
            if (patientOpt.isPresent()) {
                Patient patient = patientOpt.get();
                if (passwordEncoder.matches(password, patient.getPassword())) {
                    String token = tokenService.generateToken(patient.getEmail());
                    Map<String, Object> response = new HashMap<>();
                    response.put("token", token);
                    response.put("message", "Patient login successful");
                    return ResponseEntity.ok(response);
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                            .body(Map.of("error", "Invalid password"));
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Patient not found"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Internal server error during patient login"));
        }
    }

    // 9. filterPatient
    public List<Appointment> filterPatient(String token, String condition, String doctorName) {
        String email = tokenService.extractUsername(token); // Assumes email is the subject

        if (condition != null && doctorName != null) {
            return patientService.getAppointmentsByConditionAndDoctor(email, condition, doctorName);
        } else if (condition != null) {
            return patientService.getAppointmentsByCondition(email, condition);
        } else if (doctorName != null) {
            return patientService.getAppointmentsByDoctor(email, doctorName);
        } else {
            return patientService.getAllAppointments(email);
        }
    }
}
