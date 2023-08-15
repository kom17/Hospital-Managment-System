DROP DATABASE IF EXISTS hospitaldb;
CREATE DATABASE hospitaldb;
USE hospitaldb;

CREATE TABLE HOSPITAL(
hosp_id INTEGER,
hosp_name VARCHAR(20),
hosp_loc VARCHAR(30),
PRIMARY KEY(hosp_id) 
);


CREATE TABLE USERS(
user_id INTEGER,
login_id VARCHAR(20), 
password VARCHAR(100), 
user_type INTEGER,
jwt_token VARCHAR(200),
hosp_id INTEGER,
dep_id INTEGER,
FOREIGN KEY(hosp_id) REFERENCES HOSPITAL(hosp_id) ON DELETE CASCADE,
PRIMARY KEY(login_id)
);


CREATE TABLE PHARMACY(
hosp_id INTEGER, 
med_id INTEGER, 
med_name VARCHAR(20), 
company VARCHAR(20), 
price INTEGER, 
mfg_date DATE, 
exp_date DATE, 
stock INTEGER,
FOREIGN KEY(hosp_id) REFERENCES HOSPITAL(hosp_id) ON DELETE CASCADE,
PRIMARY KEY(hosp_id,med_id)
);


CREATE TABLE ROOMS(
hosp_id INTEGER, 
room_id INTEGER, 
room_no INTEGER,
room_type VARCHAR(40), 
floor INTEGER,
availability BOOL,
FOREIGN KEY(hosp_id) REFERENCES HOSPITAL(hosp_id) ON DELETE CASCADE,
PRIMARY KEY(hosp_id,room_id),
UNIQUE(room_id)
);

CREATE TABLE HODS(
hosp_id INTEGER,
hod_id INTEGER,
hod_name VARCHAR(20),
qualification VARCHAR(20),
salary INTEGER,
address VARCHAR(20),
city VARCHAR(20),
state VARCHAR(20),
FOREIGN KEY(hosp_id) REFERENCES HOSPITAL(hosp_id) ON DELETE CASCADE,
PRIMARY KEY(hod_id)
);


CREATE TABLE DEPARTMENT(
hosp_id INTEGER, 
dep_id INTEGER, 
dep_name VARCHAR(20),
hod_id INTEGER,
FOREIGN KEY(hosp_id) REFERENCES HOSPITAL(hosp_id) ON DELETE CASCADE,
FOREIGN KEY(hod_id) REFERENCES HODS(hod_id) ON DELETE SET NULL,
PRIMARY KEY(dep_id)
);



CREATE TABLE DOCTOR(
hosp_id INTEGER, 
dep_id INTEGER, 
doc_id INTEGER, 
doc_name VARCHAR(20), 
doc_type VARCHAR(30), 
qualification VARCHAR(20), 
salary INTEGER,
address VARCHAR(20), 
city VARCHAR(10), 
state VARCHAR(20),
phone_no VARCHAR(10),
FOREIGN KEY(hosp_id) REFERENCES HOSPITAL(hosp_id) ON DELETE CASCADE,
FOREIGN KEY(dep_id) REFERENCES DEPARTMENT(dep_id) ON DELETE CASCADE,
PRIMARY KEY(doc_id));


CREATE TABLE STAFF(
hosp_id INTEGER, 
dep_id INTEGER, 
staff_id INTEGER,
staff_name VARCHAR(20), 
works_as VARCHAR(20), 
address VARCHAR(30), 
city VARCHAR(10), 
state VARCHAR(20), 
salary INTEGER, 
FOREIGN KEY(hosp_id) REFERENCES HOSPITAL(hosp_id) ON DELETE CASCADE,
FOREIGN KEY(dep_id) REFERENCES DEPARTMENT(dep_id) ON DELETE CASCADE,
PRIMARY KEY(staff_id)
);


CREATE TABLE PATIENT(
hosp_id INTEGER, 
doc_id INTEGER, 
patient_id INTEGER, 
room_id INTEGER,
patient_name VARCHAR(20), 
age INTEGER,
blood_group VARCHAR(4),
phone_no VARCHAR(10), 
address VARCHAR(30), 
city VARCHAR(10), 
state VARCHAR(20), 
date_of_admit DATE, 
date_of_discharge DATE, 
FOREIGN KEY(hosp_id) REFERENCES HOSPITAL(hosp_id) ON DELETE CASCADE,
FOREIGN KEY(doc_id) REFERENCES DOCTOR(doc_id) ON DELETE SET NULL,
FOREIGN KEY(room_id) REFERENCES ROOMS(room_id) ON DELETE SET NULL,
PRIMARY KEY(patient_id)
);   


CREATE TABLE DIAGNOSIS(
hosp_id INTEGER, 
report_id INTEGER, 
patient_id INTEGER, 
description_of_illness LONGTEXT, 
prev_medical_issues LONGTEXT, 
FOREIGN KEY(hosp_id) REFERENCES HOSPITAL(hosp_id) ON DELETE CASCADE,
FOREIGN KEY(patient_id) REFERENCES PATIENT(patient_id) ON DELETE CASCADE,
PRIMARY KEY(hosp_id,patient_id,report_id)
);


CREATE TABLE BILL(
hosp_id INTEGER, 
patient_id INTEGER, 
bill_id INTEGER, 
pays_for VARCHAR(30), 
price INTEGER, 
amount_paid INTEGER, 
due_amount INTEGER, 
FOREIGN KEY(patient_id) REFERENCES PATIENT(patient_id) ON DELETE CASCADE,
FOREIGN KEY(hosp_id) REFERENCES HOSPITAL(hosp_id) ON DELETE CASCADE,
PRIMARY KEY(hosp_id,patient_id,bill_id)
);


CREATE TABLE PRESCRIPTION(
hosp_id INTEGER, 
patient_id INTEGER, 
prescription_id INTEGER, 
doc_id INTEGER, 
prescribed_date DATE, 
med_name VARCHAR(20), 
instructions VARCHAR(50), 
FOREIGN KEY(patient_id) REFERENCES PATIENT(patient_id) ON DELETE CASCADE,
FOREIGN KEY(hosp_id) REFERENCES HOSPITAL(hosp_id) ON DELETE CASCADE,
PRIMARY KEY(hosp_id,patient_id,prescription_id)
);

-- INSERT INTO HOSPITAL VALUES(0,'TEST HOSPITAL', 'TEST ADDRESS'); 












