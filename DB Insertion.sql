-- SELECTING THE DATABASE
USE hospitaldb;

-- CREATING NEW HOSPITAL
SET @hosp_id := 1;
INSERT INTO HOSPITAL VALUES(@hosp_id, 'Aster hospital', 'Yelahanka');


-- INSERTING HODS FOR NEW DEPARTMENTS
SET @admin_hod_id := 11111;
SET @manager_hod_id := 22222;
SET @pharmacy_hod_id := 33333;
SET @frontdesk_hod_id := 44444;
INSERT INTO HODS VALUES(@hosp_id, @admin_hod_id, 'Hrushikesh', 'MBBS', 10000000, 'Anantapur', 'Ananatapur', 'Andhra Pradesh');
INSERT INTO HODS VALUES(@hosp_id, @manager_hod_id, 'Tharun', 'Anaesthesiology', 1000000, 'Bangalore', 'Bangalore', 'Karnataka');
INSERT INTO HODS VALUES(@hosp_id, @pharmacy_hod_id, 'Ramesh', 'Pharmacology', 100000, 'Hyderabad', 'Hyderabad', 'Telangana');
INSERT INTO HODS VALUES(@hosp_id, @frontdesk_hod_id, 'Satish', 'Dermatology', 50000, 'Chennai', 'Chennai', 'Tamil Nadu');


-- CREATING BASIC DEPARTMENTS FOR THE HOSPITAL
SET @admin_dep_id := 1;
SET @manager_dep_id := 2;
SET @pharmacy_dep_id := 3;
SET @frontdesk_dep_id := 4;
INSERT INTO DEPARTMENT VALUES(@hosp_id, @admin_dep_id, 'ADMINS', @admin_hod_id);
INSERT INTO DEPARTMENT VALUES(@hosp_id, @manager_dep_id, 'MANAGERS', @manager_hod_id);
INSERT INTO DEPARTMENT VALUES(@hosp_id, @pharmacy_dep_id, 'PHARMACY', @pharmacy_hod_id);
INSERT INTO DEPARTMENT VALUES(@hosp_id, @frontdesk_dep_id, 'FRONT DESK', @frontdesk_hod_id);


-- CREATING LOGIN CREDENTIALS FOR EACH HOD
INSERT INTO USERS VALUES(@admin_hod_id, 'hrushikesh1234', 'HelloWorld', 1, NULL, @hosp_id, @admin_dep_id);
INSERT INTO USERS VALUES(@admin_hod_id, 'keerthana1234', 'HelloWorld', 1, NULL, @hosp_id, @admin_dep_id);
INSERT INTO USERS VALUES(@admin_hod_id, 'om1234', 'HelloWorld', 1, NULL, @hosp_id, @admin_dep_id);
INSERT INTO USERS VALUES(@manager_hod_id, 'tharun1234', 'HelloWorld', 2, NULL, @hosp_id, @manager_dep_id); 
INSERT INTO USERS VALUES(@pharmacy_hod_id, 'ramesh1234', 'HelloWorld', 3, NULL, @hosp_id, @pharmacy_dep_id);
INSERT INTO USERS VALUES(@frontdesk_hod_id, 'satish1234', 'HelloWorld', 3, NULL, @hosp_id, @frontdesk_dep_id);
INSERT INTO USERS VALUES(1000, 'faizaan1234', 'HelloWorld', 4, NULL, @hosp_id, 5);
INSERT INTO USERS VALUES(55555, 'harika1234', 'HelloWorld', 3, NULL, @hosp_id, 5);


-- INSERTING ROOMS 
INSERT INTO ROOMS VALUES(@hosp_id, 1, 101,'GENERAL', 0, TRUE);
INSERT INTO ROOMS VALUES(@hosp_id, 2, 201,'AC', 0, TRUE);
INSERT INTO ROOMS VALUES(@hosp_id, 3, 301,'ICU', 0, TRUE);
INSERT INTO ROOMS VALUES(@hosp_id, 4, 401,'SPECIAL WARD', 0, TRUE);
INSERT INTO ROOMS VALUES(@hosp_id, 5, 501,'GENERAL WITH VENTILATOR', 0, TRUE);


-- INSERTING MEDICINES INTO PHARMACY
INSERT INTO PHARMACY VALUES(@hosp_id, 1000, 'DOLO 650', 'DOLO MEDICS', 10, '2020-06-11', '2020-12-11',1000);
INSERT INTO PHARMACY VALUES(@hosp_id, 1001, 'PARACITIMOL', 'VIKRAM MEDICS', 5, '2020-03-13', '2020-11-13',2000);
INSERT INTO PHARMACY VALUES(@hosp_id, 1002, 'VICKS ACTION 500', 'YASH MEDICS', 2, '2021-07-11', '2023-07-11',3000);
INSERT INTO PHARMACY VALUES(@hosp_id, 1003, 'PAN D', 'BEN MEDICS', 15, '2021-05-11', '2021-11-11',4000);
INSERT INTO PHARMACY VALUES(@hosp_id, 1004, 'PANTOP D', 'MY DOCTOR', 12, '2020-01-05', '2020-11-05',5000);


-- CREATING OPTIONAL DEPARTMENTS
INSERT INTO HODS VALUES(@hosp_id, 55555, 'Harika', 'Cardiologist', 100000, 'Mumbai', 'Mumbai', 'Maharastra');
INSERT INTO HODS VALUES(@hosp_id, 66666, 'Nikhil', 'Neurologist', 100000, 'Guntur', 'Guntur', 'Andhra Pradesh');


INSERT INTO DEPARTMENT VALUES(@hosp_id, 5, 'CARDIOLOGY', 55555);
INSERT INTO DEPARTMENT VALUES(@hosp_id, 6, 'NEUROLOGY', 66666);


-- INSERTING DOCTORS INTO RESPECTIVE DEPARTMENTS
INSERT INTO DOCTOR VALUES(@hosp_id, 5, 1000, 'Faizaan', 'Surgeon', 'MBBS', 200000, 'Kurnool', 'Kurnool', 'Andhra Pradesh', '1233212131');
INSERT INTO DOCTOR VALUES(@hosp_id, 5, 1001, 'Anirudh', 'Electrophysiologist ', 'MBBS', 300000, 'Vizag', 'Vizag', 'Andhra Pradesh', '3213213211');

INSERT INTO DOCTOR VALUES(@hosp_id, 6, 1002, 'Akhil', 'Vascular Neurologists', 'MBBS', 400000, 'Kurnool', 'Kurnool', 'Andhra Pradesh', '5675675675');
INSERT INTO DOCTOR VALUES(@hosp_id, 6, 1003, 'Santhosh', 'Pediatric Neurologists ', 'MBBS', 450000, 'Vizag', 'Vizag', 'Andhra Pradesh', '7657657656');

-- INSERTING STAFF INTO RESPECTIVE DEPARTMENT
INSERT INTO STAFF VALUES(@hosp_id, 5, 100, 'Rajesh', 'Nurse', 'Hampi', 'Hampi', 'Karnatak', 20000);
INSERT INTO STAFF VALUES(@hosp_id, 5, 101, 'Pooja', 'Nurse', 'Dhone', 'Dhone', 'Andhra Pradesh', 30000);
INSERT INTO STAFF VALUES(@hosp_id, 5, 102, 'Sukumar', 'Office Boy', 'Yelahanka', 'Yelahanak', 'Karnatak', 15000);

INSERT INTO STAFF VALUES(@hosp_id, 6, 103, 'Suresh', 'Office Boy', 'Guntur', 'Guntur', 'Andhra Pradesh', 25000);
INSERT INTO STAFF VALUES(@hosp_id, 6, 104, 'Shalini', 'Nurse', 'Hampi', 'Hampi', 'Karnatak', 20000);
INSERT INTO STAFF VALUES(@hosp_id, 6, 105, 'Ramya', 'Nurse', 'Bangalore', 'Bangalore', 'Karnatak', 18000);


-- INSERTING PATIENTS
INSERT INTO PATIENT VALUES(@hosp_id, 1000, 10000, 1, 'Jhon', 35, 'O+', '8978978978', 'Anantapur', 'Anantapur', 'Andhra Pradesh', '2023-01-04', NULL);
INSERT INTO PATIENT VALUES(@hosp_id, 1000, 10001, 2, 'Saithys', 20, 'A+', '5435435433', 'Vizag', 'Vizag', 'Andhra Pradesh', '2022-12-28', '2023-01-04');
INSERT INTO PATIENT VALUES(@hosp_id, 1001, 10002, 3, 'Rohan', 65, 'AB-', '6546546544', 'Anantapur', 'Anantapur', 'Andhra Pradesh', '2022-11-04', '2022-11-14');
INSERT INTO PATIENT VALUES(@hosp_id, 1002, 10003, 4, 'Indra', 45, 'O-', '7657657655', 'Kurnool', 'Kurnool', 'Andhra Pradesh', '2023-01-01', NULL);
INSERT INTO PATIENT VALUES(@hosp_id, 1003, 10004, 5, 'Ahalya', 20, 'AB-', '4324324322', 'Anantapur', 'Anantapur', 'Andhra Pradesh', '2022-12-20', '2022-12-24');

-- INSERTING DIAGNOSIS OF EACH PATIENT
INSERT INTO DIAGNOSIS VALUES(@hosp_id, 1, 10000, 'HEART ATTACK', 'GOT ONE TIME 6 MONTHS AGO');
INSERT INTO DIAGNOSIS VALUES(@hosp_id, 1, 10001, 'SUFFERING FROM HOLE IN THE HEART', 'NO PREVIOUS MEDICAL ISSUES');
INSERT INTO DIAGNOSIS VALUES(@hosp_id, 1, 10002, 'Suffering from Atrial flutter', 'NO PREVIOUS MEDICAL ISSUES');
INSERT INTO DIAGNOSIS VALUES(@hosp_id, 1, 10003, 'Suffering with Acute Spinal Cord Injury', 'NO PREVIOUS MEDICAL ISSUES');
INSERT INTO DIAGNOSIS VALUES(@hosp_id, 1, 10004, 'Suffering with Ataxia', 'NO PREVIOUS MEDICAL ISSUES');

-- INSERTING PRESCRIPTIONS OF EACH PATIENT
INSERT INTO PRESCRIPTION VALUES(@hosp_id, 10000, 1, 1000, '2023-01-04', 'DOLO','AFTER FOOD');
INSERT INTO PRESCRIPTION VALUES(@hosp_id, 10000, 2, 1000, '2023-01-04', 'ASPIRIN','BEFORE FOOD');
INSERT INTO PRESCRIPTION VALUES(@hosp_id, 10001, 1, 1000, '2022-12-28', 'DOLO', 'AFTER FOOD');
INSERT INTO PRESCRIPTION VALUES(@hosp_id, 10001, 2, 1000, '2022-12-28', 'PAN D','BEFORE FOOD');
INSERT INTO PRESCRIPTION VALUES(@hosp_id, 10001, 3, 1000, '2023-01-02', 'VICKS ACTION 500', 'AFTER FOOD');
INSERT INTO PRESCRIPTION VALUES(@hosp_id, 10002, 1, 1001, '2022-11-04', 'PANTOPD','BEFORE FOOD');
INSERT INTO PRESCRIPTION VALUES(@hosp_id, 10003, 1, 1002, '2023-01-01', 'PANTOPD','AFTER FOOD');
INSERT INTO PRESCRIPTION VALUES(@hosp_id, 10004, 1, 1003, '2022-12-20', 'AZAKVLUIN ASTAM','BEFORE FOOD');

-- INSERTING BILLS OF EACK PATIENT
INSERT INTO BILL VALUES(@hosp_id, 10000, 1, 'DOCOTOR CONSULTANCY', 500, 500, 0);
INSERT INTO BILL VALUES(@hosp_id, 10000, 2, 'SURGERY', 500000, 300000, 200000);
INSERT INTO BILL VALUES(@hosp_id, 10001, 1, 'SURGERY', 800000, 500000, 800000);
INSERT INTO BILL VALUES(@hosp_id, 10002, 1, 'DOCOTOR CONSULTANCY', 500, 500, 0);
INSERT INTO BILL VALUES(@hosp_id, 10003, 1, 'DOCOTOR CONSULTANCY', 500, 500, 0);
INSERT INTO BILL VALUES(@hosp_id, 10003, 2, 'SPINE SURGERY', 1500000, 100000, 500000);
INSERT INTO BILL VALUES(@hosp_id, 10004, 1, 'DOCOTOR CONSULTANCY', 500, 500, 0);











