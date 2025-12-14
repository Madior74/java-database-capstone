package com.project.back_end.models;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Document(collection = "prescriptions")
public class Prescription {

  // 1. 'id' field:
  @Id
  private String id;

  // 2. 'patientName' field:
  @NotNull(message = "Patient name cannot be null")
  private String patientName;

  // 3. 'appointmentId' field:
  @NotNull(message = "Appointment cannot be null!")
  private Long appointmentId;

  // 4. 'medication' field:
  @Size(min = 3, max = 100)
  @NotNull(message = "Medication cannot be null")
  private String medication;

  // 5. 'dosage' field:
  @NotNull(message = "Dosage cannot be null")
  private String dosage;

  // 6. 'doctorNotes' field:
  @Size(max = 200)
  private String doctorNotes;

  public Prescription() {
  }

  public Prescription(@NotNull(message = "Patient name cannot be null") String patientName,
      @NotNull(message = "Appointment cannot be null!") Long appointmentId,
      @Size(min = 3, max = 100) @NotNull(message = "Medication cannot be null") String medication,
      @NotNull(message = "Dosage cannot be null") String dosage, @Size(max = 200) String doctorNotes) {
    this.patientName = patientName;
    this.appointmentId = appointmentId;
    this.medication = medication;
    this.dosage = dosage;
    this.doctorNotes = doctorNotes;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getPatientName() {
    return patientName;
  }

  public void setPatientName(String patientName) {
    this.patientName = patientName;
  }
  
  public Long getAppointmentId() {
    return appointmentId;
  }

  public void setAppointmentId(Long appointmentId) {
    this.appointmentId = appointmentId;
  }

  public String getMedication() {
    return medication;
  }

  public void setMedication(String medication) {
    this.medication = medication;
  }

  public String getDosage() {
    return dosage;
  }

  public void setDosage(String dosage) {
    this.dosage = dosage;
  }

  public String getDoctorNotes() {
    return doctorNotes;
  }

  public void setDoctorNotes(String doctorNotes) {
    this.doctorNotes = doctorNotes;
  }

}
