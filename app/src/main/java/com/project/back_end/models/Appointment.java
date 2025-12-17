package com.project.back_end.models;

import java.beans.Transient;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
public class Appointment {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  // 2. 'doctor' field:
  @ManyToOne
  @JoinColumn(name = "doctor_id")
  @NotNull(message = "Doctor cannot be null")
  private Doctor doctor;

  // 3. 'patient' field:

  @ManyToOne
  @JoinColumn(name = "patient_id")
  @NotNull(message = "Patient cannot be null")
  private Patient patient;

  // appointment.
  @NotNull(message = "Appointment time cannot be null")
  @Future
  private LocalDateTime appointmentTime;

  // 5. 'status' field:
  @NotNull(message = "Status cannot be null")
  private int status; // 0 = Scheduled, 1 = Completed

  // 6. 'getEndTime' method:
  @Transient
  public LocalDateTime getEndTime() {
    return this.appointmentTime.plusHours(1);
  }

  // 7. 'getAppointmentDate' method:
  public LocalDate getAppointmentDate() {
    return this.appointmentTime.toLocalDate();
  }

  // 8. 'getAppointmentTimeOnly' method:
  public LocalTime getAppointmentTimeOnly() {
    return this.appointmentTime.toLocalTime();
  }

  //reasonForVisit
  @Size(max = 255)
private String reasonForVisit;

  public String getReasonForVisit() {
    return reasonForVisit;
  }

  public void setReasonForVisit(String reasonForVisit) {
    this.reasonForVisit = reasonForVisit;
  }

  // 9. Constructor(s):
  // - A no-argument constructor is implicitly provided by JPA for entity
  // creation.
  // - A parameterized constructor can be added as needed to initialize fields.
  public Appointment() {
  }

  public Appointment(Long id, @NotNull(message = "Doctor cannot be null") Doctor doctor,
      @NotNull(message = "Patient cannot be null") Patient patient,
      @NotNull(message = "Appointment time cannot be null") LocalDateTime appointmentTime,
      @NotNull(message = "Status cannot be null") int status) {
    this.id = id;
    this.doctor = doctor;
    this.patient = patient;
    this.appointmentTime = appointmentTime;
    this.status = status;
  }

  // 10. Getters and Setters:

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Doctor getDoctor() {
    return doctor;
  }

  public void setDoctor(Doctor doctor) {
    this.doctor = doctor;
  }

  public Patient getPatient() {
    return patient;
  }

  public void setPatient(Patient patient) {
    this.patient = patient;
  }

  public LocalDateTime getAppointmentTime() {
    return appointmentTime;
  }

  public void setAppointmentTime(LocalDateTime appointmentTime) {
    this.appointmentTime = appointmentTime;
  }

  public int getStatus() {
    return status;
  }

  public void setStatus(int status) {
    this.status = status;
  }

}
