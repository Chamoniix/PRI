-- creation des tables

CREATE TABLE Utilisateur (
	user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	user_pseudo VARCHAR(255) NOT NULL,
	user_identifiant VARCHAR(255) NOT NULL,
	user_mdp VARCHAR(255) NOT NULL,
	user_age INT NOT NULL,
	user_chargeMax INT,
	user_description TEXT
);

CREATE TABLE Photo (
	photo_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	photo_lien VARCHAR(255),
	photo_description TEXT,
	photo_date DATE NOT NULL,
	user_id INT
);

CREATE TABLE Activite (
	activite_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	activite_nom VARCHAR(255) NOT NULL,
	activite_info VARCHAR(255)
);

CREATE TABLE Ut_Activite (
	user_id INT NOT NULL,
	activite_id INT NOT NULL
);

CREATE TABLE Objectif (
	objectif_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	objectif_nom VARCHAR(255) NOT NULL,
	objectif_info VARCHAR(255)
);

CREATE TABLE Obj_Activite (
	objectif_id INT NOT NULL,
	activite_id INT NOT NULL
);

CREATE TABLE Plan (
	plan_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	plan_nom VARCHAR(255) NOT NULL,
	plan_difficulte ENUM('Debutant','Intermediaire','Difficile') NOT NULL,
	plan_duree ENUM('1 mois','3 mois','6 mois') NOT NULL,
	plan_photo VARCHAR(255),
	plan_info VARCHAR(255),
	plan_note INT,
	objectif_id INT NOT NULL,
	createur_id INT
);

CREATE TABLE Plan_Ut (
	plan_id INT NOT NULL,
	user_id INT NOT NULL,
	plan_enCours BOOLEAN NOT NULL,
	date_debut DATE NOT NULL,
	date_fin DATE,
	user_com VARCHAR(255),
	user_note INT
);

CREATE TABLE Seance(
	seance_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	seance_nom VARCHAR(255) NOT NULL,
	seance_objectif VARCHAR(255) NOT NULL,
	seance_numero INT NOT NULL,
	seance_jourRepos INT NOT NULL,
	seance_info VARCHAR(255),
	plan_id INT NOT NULL
);

CREATE TABLE Seance_Ut(
	seance_id INT NOT NULL,
	user_id INT NOT NULL,
	date_seance DATE NOT NULL,
	user_com VARCHAR(255),
	seance_fait BOOLEAN NOT NULL
);

CREATE TABLE Exercice(
	exercice_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	exercice_nom VARCHAR(255) NOT NULL,
	exercice_info VARCHAR(255),
	exercice_video VARCHAR(255),
	createur_id INT
);

CREATE TABLE Seance_Exo(
	seance_id INT NOT NULL,
	exercice_id INT NOT NULL,
	nbr_repetiion INT NOT NULL,
	nbr_serie INT NOT NULL,
	poids_materiel INT,
	chrono_serie DOUBLE
);


CREATE TABLE Materiel(
	materiel_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	materiel_nom VARCHAR(255) NOT NULL
);

CREATE TABLE Materiel_Ex(
	materiel_id INT NOT NULL,
	exercice_id INT NOT NULL
);

CREATE TABLE Muscle(
	muscle_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	muscle_nom VARCHAR(255) NOT NULL,
	muscle_info VARCHAR(255),
	zone_id INT NOT NULL
);

CREATE TABLE Muscle_Ex(
	muscle_id INT NOT NULL,
	exercice_id INT NOT NULL
);

CREATE TABLE Zone_Corps(
	zone_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	zone_nom VARCHAR(255) NOT NULL,
	zone_info VARCHAR(255)
);


  
-- creation des contraintes FK
ALTER TABLE Photo
  ADD FOREIGN KEY (user_id)
REFERENCES Utilisateur(user_id);

ALTER TABLE Plan
  ADD FOREIGN KEY (objectif_id)
REFERENCES Objectif(objectif_id);

ALTER TABLE Plan
  ADD FOREIGN KEY (createur_id)
REFERENCES Utilisateur(user_id);

ALTER TABLE Seance
  ADD FOREIGN KEY (plan_id)
REFERENCES Plan(plan_id);

ALTER TABLE Exercice
  ADD FOREIGN KEY (createur_id)
REFERENCES Utilisateur(user_id);

ALTER TABLE Muscle
  ADD FOREIGN KEY (zone_id)
REFERENCES Zone_Corps(zone_id);

ALTER TABLE Ut_Activite
  ADD FOREIGN KEY (user_id)
REFERENCES Utilisateur(user_id);

ALTER TABLE Ut_Activite
  ADD FOREIGN KEY (activite_id)
REFERENCES Activite(activite_id);

ALTER TABLE Obj_Activite
  ADD FOREIGN KEY (activite_id)
REFERENCES Activite(activite_id);

ALTER TABLE Obj_Activite
  ADD FOREIGN KEY (objectif_id)
REFERENCES Objectif(objectif_id);

ALTER TABLE Plan_Ut
  ADD FOREIGN KEY (plan_id)
REFERENCES Plan(plan_id);

ALTER TABLE Plan_Ut
  ADD FOREIGN KEY (user_id)
REFERENCES Utilisateur(user_id);

ALTER TABLE Seance_Ut
  ADD FOREIGN KEY (user_id)
REFERENCES Utilisateur(user_id);

ALTER TABLE Seance_Ut
  ADD FOREIGN KEY (seance_id)
REFERENCES Seance(seance_id);

ALTER TABLE Seance_Exo
  ADD FOREIGN KEY (seance_id)
REFERENCES Seance(seance_id);

ALTER TABLE Seance_Exo
  ADD FOREIGN KEY (exercice_id)
REFERENCES Exercice(exrcice_id);

ALTER TABLE Materiel_Ex
  ADD FOREIGN KEY (exercice_id)
REFERENCES Exercice(exercice_id);

ALTER TABLE Materiel_Ex
  ADD FOREIGN KEY (materiel_id)
REFERENCES Materiel(materiel_id);

ALTER TABLE Muscle_Ex
  ADD FOREIGN KEY (exercice_id)
REFERENCES Exercice(exercice_id);

ALTER TABLE Muscle_Ex
  ADD FOREIGN KEY (muscle_id)
REFERENCES Muscle(muscle_id);

