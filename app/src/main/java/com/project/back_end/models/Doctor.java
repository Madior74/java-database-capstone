package com.project.back_end.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // 2. 'name' field:
    @NotNull(message = "Name cannot be null")
    @Size(min = 3, max = 100)
    private String name;

    // 3. 'specialty' field:
    @NotNull(message = "Specialty cannot be null")
    @Size(min = 3, max = 50)
    private String specialty;

    // 4. 'email' field:
    @NotNull(message = "Email cannot be Null")
    @Email
    private String email;

    // 5. 'password' field:
    @NotNull(message = "Password cannot be null")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Size(min = 6)
    private String password;

    // 6. 'phone' field:
    @NotNull(message = "Phone cannot be null")
    @Pattern(regexp = "\\d{10}", message = "Le numéro de téléphone doit comporter 10 chiffres")
    @Size(min = 10, max = 10)
    private String phone;

    // 7. 'availableTimes' field:
    @ElementCollection
    private List<String> availableTimes;

    // 8. Getters and Setters:
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

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
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

    public List<String> getAvailableTimes() {
        return availableTimes;
    }

    public void setAvailableTimes(List<String> availableTimes) {
        this.availableTimes = availableTimes;
    }

}
