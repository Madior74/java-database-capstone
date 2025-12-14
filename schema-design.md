## MySQL Database Design

### Table: patients
- id: INT, Primary Key, Auto Increment
- surname: TEXT, Not Null
- firstname: TEXT, Not Null
- gender: TXT, Not Null
- Birth_date: DATE
- phone: TEXT
- email: TEXT ,Not Null
- password: TEXT
- adress: TEXT
- medical_history: TEXT
- created_at: DATE


### Table: doctors
- id: INT, Primary Key, Auto Increment
- surname: TEXT, Not Null
- firstname: TEXT, Not Null
- gender: TXT, Not Null
- Birth_date: DATE
- phone: TEXT
- email: TEXT ,Not Null
- specialty. TEXT
- availableTimes: TEXT
- password: TEXT
- adress: TEXT
- created_at: DATE


### Table: admin
- id: INT, Primary Key, Auto Increment
- surname: TEXT, Not Null
- firstname: TEXT, Not Null
- email: TEXT ,Not Null
- password: TEXT
- adress: TEXT



### Table: appointments
- id: INT, Primary Key, Auto Increment
- doctor_id: INT, Foreign Key → doctors(id)
- patient_id: INT, Foreign Key → patients(id)
- appointment_time: DATETIME, Not Null
- status: INT (0 = Scheduled, 1 = Completed, 2 = Cancelled)







## MongoDB Collection Design

### Collection: prescriptions

```json


{
  "_id": "ObjectId('64abc123456')",
  "patientName": "John Smith",
  "appointmentId": 51,
  "medication": "Paracétamol",
  "dosage": "500mg",
  "doctorNotes": "Prenez 1 comprimé toutes les 6 heures.",
  "refillCount": 2,
  "pharmacy": {
    "name": "Walgreens SF",
    "location": "Market Street"
  }
}