package com.project.back_end.models;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
public class Patient {

    // 1. 'id' field:
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 2. 'name' field:
    @NotNull(message = "Name cannot be null")
    @Size(min = 3, max = 100)
    private String name;

    // 3. 'email' field:
    @NotNull(message = "Email cannot be Null")
    @Email
    private String email;

    // 4. 'password' field:
    @NotNull(message = "Password cannot be null")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Size(min = 6)
    private String password;

    // 5. 'phone' field:
    @NotNull(message = "Phone cannot be null")
    @Pattern(regexp = "\\d{10}", message = "Le numéro de téléphone doit comporter 10 chiffres")
    @Size(min = 10, max = 10)
    private String phone;

    // 6. 'address' field:
    @NotNull(message = "Address cannot be null")
    @Size(max = 255)
    private String address;

    //date of birth
    @Past
    private LocalDate dateOfBirth;

    //emergencyContact
      @Pattern(regexp = "\\d{10}", message = "Le numéro de téléphone doit comporter 10 chiffres")
    @Size(min = 10, max = 10)
    private String emergencyContact;

    // 7. Getters and Setters:

    public String getEmergencyContact() {
        return emergencyContact;
    }

      public void setEmergencyContact(String emergencyContact) {
          this.emergencyContact = emergencyContact;
      }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

}
