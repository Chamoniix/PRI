-- ---- Données dans Zone_Corps ---- --

INSERT INTO Zone_Corps
VALUES (1, 'Bras', null);

INSERT INTO Zone_Corps
VALUES (2, 'Jambes', null);

INSERT INTO Zone_Corps
VALUES (3, 'Pectoraux', null);

INSERT INTO Zone_Corps
VALUES (4, 'Dos', null);

INSERT INTO Zone_Corps
VALUES (5, 'Mollets', null);

INSERT INTO Zone_Corps
VALUES (6, 'Poignets', null);

INSERT INTO Zone_Corps
VALUES (7, 'Epaules', null);

INSERT INTO Zone_Corps
VALUES (8, 'Abdominaux', null);

INSERT INTO Zone_Corps
VALUES (9, 'Fessiers', null);

INSERT INTO Zone_Corps
VALUES (10, 'Global', null);


-- ---- Données dans Muscle ---- --

-- BRAS 

INSERT INTO Muscle
VALUES (1, 'Biceps', null, 1);

INSERT INTO Muscle
VALUES (2, 'Brachial antérieur',null,1);

INSERT INTO Muscle
VALUES (3, 'Long supinateur',null,1);

INSERT INTO Muscle
VALUES (4, 'Rond pronateur',null,1);

INSERT INTO Muscle
VALUES (5, 'Biceps brachial',null,1);

-- JAMBES

INSERT INTO Muscle
VALUES (6, 'Ischio', null, 2);

INSERT INTO Muscle
VALUES (7, 'Quadriceps', null, 2);

INSERT INTO Muscle
VALUES (8, 'Adducteurs', null, 2);

-- PECTORAUX

INSERT INTO Muscle
VALUES (9, 'Grand pectoral', null, 3);

INSERT INTO Muscle
VALUES (10, 'Petit pectoral', null, 3);

INSERT INTO Muscle
VALUES (11, 'Denteles', null, 3);

INSERT INTO Muscle
VALUES (12, 'Pectoraux', null, 3);

-- DOS

INSERT INTO Muscle
VALUES (13, 'Grand dorsal', null,4);

INSERT INTO Muscle
VALUES (14, 'Rhomboide', null,4);

INSERT INTO Muscle
VALUES (15, 'Grand rond', null, 4);

INSERT INTO Muscle
VALUES (16, 'Trapeze', null, 4);

-- MOLLETS

INSERT INTO Muscle
VALUES (17, 'Mollets', null, 5);

-- POIGNETS

INSERT INTO Muscle
VALUES (18, 'avant-bras', null, 6);

-- EPAULES

INSERT INTO Muscle
VALUES (19, 'Deltoide posterieur', null, 7);

INSERT INTO Muscle
VALUES (20, 'Sous epineux', null, 7);

INSERT INTO Muscle
VALUES (21, 'Petit rond', null, 7);

INSERT INTO Muscle
VALUES (22, 'Coraco', null, 7);

-- ABDOMINAUX

INSERT INTO Muscle
VALUES (23, 'Abdos hauts (grand droit)', null, 8);

INSERT INTO Muscle
VALUES (24, 'Obliques', null, 8);

INSERT INTO Muscle
VALUES (25, 'Transverse', null, 8);

INSERT INTO Muscle
VALUES (26,'Intercostaux', null, 8);

-- FESSIERS

INSERT INTO Muscle
VALUES (27, 'Fessiers', null, 9);

INSERT INTO Muscle
VALUES (28, 'Psoas', null, 9);

INSERT INTO Muscle
VALUES (29, 'Iliaque', null, 9);

-- ---- Données dans Exercice ---- --

-- BRAS 

INSERT INTO Exercice
VALUES (1, 'Curl a la barre', null, null, null);

INSERT INTO Exercice
VALUES (2, 'Curl a la barre en supination', null, null, null);

INSERT INTO Exercice
VALUES (3, 'Curl a la barre en pronation', null, null, null);

-- JAMBES

INSERT INTO Exercice
VALUES (4, 'Souleve de terre jambes tendues', null, null, null);

INSERT INTO Exercice
VALUES (5, 'Montee sur banc', null, null, null);

-- PECTORAUX

INSERT INTO Exercice
VALUES (6, 'Dips', null, null, null);

INSERT INTO Exercice
VALUES (7, 'Dips aide', null, null, null);

INSERT INTO Exercice
VALUES (8, 'Developpe-couche', null, null, null);

-- Dos

INSERT INTO Exercice
VALUES (9, 'Tractions', null, null, null);

INSERT INTO Exercice
VALUES (10, 'Rowing allonge barre', null, null, null);

INSERT INTO Exercice
VALUES (11, 'Rowing debout/ Shrug', null, null, null);

-- MOLLETS

INSERT INTO Exercice
VALUES (12, 'Mollets  la presse a cuisses', null, null, null);

INSERT INTO Exercice
VALUES (13, 'Elevation des mollets a 45 degres', null, null, null);

-- POIGNETS

INSERT INTO Exercice
VALUES (14, 'Curl poignets avec halteres', null, null, null);

INSERT INTO Exercice
VALUES (15, 'Curl poignets barre en pronation', null, null, null);

-- EPAULES

INSERT INTO Exercice
VALUES (16, 'Oiseau a la poulie', null, null, null);

INSERT INTO Exercice
VALUES (17, 'Developpes epaules', null, null, null);

-- ABDOMINAUX

INSERT INTO Exercice
VALUES (18, 'Crunch au sol (assis)', null, null, null);

INSERT INTO Exercice
VALUES (19, 'Gainage', null, null, null);

-- FESSIERS

INSERT INTO Exercice
VALUES (20, 'Abduction hanche', null, null, null);

INSERT INTO Exercice
VALUES (21, 'Abduction hanche allongee', null, null, null);

-- GLOBAL

INSERT INTO Exercice
VALUES (22, 'Squats', null, null, null);

INSERT INTO Exercice
VALUES (23, 'Arrache', null, null, null);

-- ---- Données dans Materiel ---- --

INSERT INTO Materiel
VALUES (1, 'Sans materiel');

INSERT INTO Materiel
VALUES (2, 'Materiel leger');

INSERT INTO Materiel
VALUES (3, 'Gros materiel');


-- ---- Données dans Materiel_Ex ---- --

INSERT INTO Materiel_Ex
VALUES (2, 1);

INSERT INTO Materiel_Ex
VALUES (3, 2);

INSERT INTO Materiel_Ex
VALUES (3, 3);

INSERT INTO Materiel_Ex
VALUES (1, 4);

INSERT INTO Materiel_Ex
VALUES (2, 5);

INSERT INTO Materiel_Ex
VALUES (1, 6);

INSERT INTO Materiel_Ex
VALUES (1, 7);

INSERT INTO Materiel_Ex
VALUES (3, 8);

INSERT INTO Materiel_Ex
VALUES (2, 9);

INSERT INTO Materiel_Ex
VALUES (3, 10);

INSERT INTO Materiel_Ex
VALUES (1, 11);

INSERT INTO Materiel_Ex
VALUES (3, 12);

INSERT INTO Materiel_Ex
VALUES (1, 13);

INSERT INTO Materiel_Ex
VALUES (2, 14);

INSERT INTO Materiel_Ex
VALUES (3, 15);

INSERT INTO Materiel_Ex
VALUES (3, 16);

INSERT INTO Materiel_Ex
VALUES (3, 17);

INSERT INTO Materiel_Ex
VALUES (1, 18);

INSERT INTO Materiel_Ex
VALUES (2, 19);

INSERT INTO Materiel_Ex
VALUES (1, 20);

INSERT INTO Materiel_Ex
VALUES (2, 21);

INSERT INTO Materiel_Ex
VALUES (1, 22);

INSERT INTO Materiel_Ex
VALUES (3, 23);

-- ---- Données dans Muscle_Ex ---- --

INSERT INTO Muscle_Ex
VALUES (27,21);

INSERT INTO Muscle_Ex
VALUES (27,20);

INSERT INTO Muscle_Ex
VALUES (24,19);

INSERT INTO Muscle_Ex
VALUES (25,19);

INSERT INTO Muscle_Ex
VALUES (26,19);

INSERT INTO Muscle_Ex
VALUES (28,19);

INSERT INTO Muscle_Ex
VALUES (29,19);

INSERT INTO Muscle_Ex
VALUES (24,18);

INSERT INTO Muscle_Ex
VALUES (23,18);

INSERT INTO Muscle_Ex
VALUES (22,17);

INSERT INTO Muscle_Ex
VALUES (20,17);

INSERT INTO Muscle_Ex
VALUES (16,17);

INSERT INTO Muscle_Ex
VALUES (9,17);

INSERT INTO Muscle_Ex
VALUES (21,16);

INSERT INTO Muscle_Ex
VALUES (20,16);

INSERT INTO Muscle_Ex
VALUES (19,16);

INSERT INTO Muscle_Ex
VALUES (16,16);

INSERT INTO Muscle_Ex
VALUES (14,16);

INSERT INTO Muscle_Ex
VALUES (18,15);

INSERT INTO Muscle_Ex
VALUES (18,14);

INSERT INTO Muscle_Ex
VALUES (17,13);

INSERT INTO Muscle_Ex
VALUES (17,12);

INSERT INTO Muscle_Ex
VALUES (14,11);

INSERT INTO Muscle_Ex
VALUES (16,10);

INSERT INTO Muscle_Ex
VALUES (15,10);

INSERT INTO Muscle_Ex
VALUES (14,10);

INSERT INTO Muscle_Ex
VALUES (13,10);

INSERT INTO Muscle_Ex
VALUES (14,9);

INSERT INTO Muscle_Ex
VALUES (13,9);

INSERT INTO Muscle_Ex
VALUES (3,9);

INSERT INTO Muscle_Ex
VALUES (2,9);

INSERT INTO Muscle_Ex
VALUES (1,9);

INSERT INTO Muscle_Ex
VALUES (12,9);

INSERT INTO Muscle_Ex
VALUES (21,8);

INSERT INTO Muscle_Ex
VALUES (12,8);

INSERT INTO Muscle_Ex
VALUES (11,8);

INSERT INTO Muscle_Ex
VALUES (16,7);

INSERT INTO Muscle_Ex
VALUES (10,7);

INSERT INTO Muscle_Ex
VALUES (9,7);

INSERT INTO Muscle_Ex
VALUES (16,6);

INSERT INTO Muscle_Ex
VALUES (10,6);

INSERT INTO Muscle_Ex
VALUES (9,6);

INSERT INTO Muscle_Ex
VALUES (7,5);

INSERT INTO Muscle_Ex
VALUES (26,5);

INSERT INTO Muscle_Ex
VALUES (6,5);

INSERT INTO Muscle_Ex
VALUES (6,4);

INSERT INTO Muscle_Ex
VALUES (26,4);

INSERT INTO Muscle_Ex
VALUES (1,1);

INSERT INTO Muscle_Ex
VALUES (1,2);

INSERT INTO Muscle_Ex
VALUES (2,2);

INSERT INTO Muscle_Ex
VALUES (3,2);

INSERT INTO Muscle_Ex
VALUES (4,2);

INSERT INTO Muscle_Ex
VALUES (2,3);

INSERT INTO Muscle_Ex
VALUES (5,3);

INSERT INTO Muscle_Ex
VALUES (3,3);

INSERT INTO Muscle_Ex
VALUES (4,3);

-- ---- Données dans Activite ---- --

INSERT INTO Activite
VALUES (1, 'Athletisme', null);

INSERT INTO Activite
VALUES (2, 'Reprise', null);

INSERT INTO Activite
VALUES (3, 'Culturisme', null);

-- ---- Données dans Objectif ---- --

INSERT INTO Objectif
VALUES (1, 'Developper bas du corps', null);

INSERT INTO Objectif
VALUES (2, 'Developper haut du corps', null);

INSERT INTO Objectif
VALUES (3, 'Mincir', null);

INSERT INTO Objectif
VALUES (4, 'Developper bras', null);

INSERT INTO Objectif
VALUES (5, 'Reprise de sport apres arret', null);

INSERT INTO Objectif
VALUES (6, 'Ventre plat', null);

-- ---- Données dans Objectif ---- --

INSERT INTO Obj_Activite
VALUES (1,1);

INSERT INTO Obj_Activite
VALUES (1,3);

INSERT INTO Obj_Activite
VALUES (2,1);

INSERT INTO Obj_Activite
VALUES (2,3);

INSERT INTO Obj_Activite
VALUES (3,2);

INSERT INTO Obj_Activite
VALUES (4,1);

INSERT INTO Obj_Activite
VALUES (4,3);

INSERT INTO Obj_Activite
VALUES (5,2);

INSERT INTO Obj_Activite
VALUES (6,2);

INSERT INTO Obj_Activite
VALUES (6,3);

-- ---- Données dans Utilisateur ---- --

INSERT INTO Utilisateur
VALUES (1,'hug_bg', 'hugo', 'huhu', 22, 50, "je m'entraine pour etre toujours plus fort" );

INSERT INTO Utilisateur
VALUES (2,'benjoCoco', 'Benji', 'benben', 22, 60, "No Pain No Gain" );

-- ---- Données dans Plan ---- --

INSERT INTO Plan
VALUES (1,'Bras de BG', 'Intermediaire', '3 mois', null, "Tu veux des bras d'Apollon ? Ce plan est fait pour toi ! " , null, 4,null );

INSERT INTO Plan
VALUES (2,'Quelques kilos en moins', 'Debutant', '1 mois', null, "Tu n'aime plus tes petites poignets d'amour ? Parfait, au terme de ces 3 mois tu n'en n'aura plus !" , null, 3, null );

-- ---- Données dans Plan_Ut ---- --

INSERT INTO Plan_Ut
VALUES (1,1  , true , '2017-11-27', null , null , null );

INSERT INTO Plan_Ut
VALUES (2,1  , false , '2017-10-20', '2017-11-20', "Super programme ! J'ai perdu les 2kg que je voulais !", 5 );

INSERT INTO Plan_Ut
VALUES (1,2  , true , '2017-12-04', null , null , null  );

-- ---- Données dans Seance ---- --

INSERT INTO Seance
VALUES (1, 'Biceps' , 'Developper biceps' ,1 , 2 , null , 1);

INSERT INTO Seance
VALUES (2, 'Avant bras' , 'Developper avant bras' ,2 , 3 , null , 1);

INSERT INTO Seance
VALUES (3, 'Gonflette' , 'Grossir les muscles' ,3 , 2 , null , 1);

INSERT INTO Seance
VALUES (4, 'Puissance' , 'Puissance bras' ,4 , 3 , null , 1);

INSERT INTO Seance
VALUES (5, 'Biceps' , 'Developper biceps' ,5 , 2 , null , 1);


INSERT INTO Seance
VALUES (6, 'Ventre ultra plat' , 'Travailler abdominaux' ,1 , 2 , null , 2);

INSERT INTO Seance
VALUES (7, 'Cuisse' , 'Cuisse plus ferme' ,2 , 2 , null , 2);

INSERT INTO Seance
VALUES (8, 'Allure' , 'Allure plus fine' ,3 , 2 , null , 2);

INSERT INTO Seance
VALUES (9, 'Bras tout ferme' , 'Developper bras' ,4 , 2 , null , 2);

INSERT INTO Seance
VALUES (10, 'Ventre ultra plat' , 'Travailler abdominaux' ,5 , 2 , null , 2);

INSERT INTO Seance
VALUES (11, 'Cuisse' , 'Cuisse plus ferme' ,6 , 2 , null , 2);

INSERT INTO Seance
VALUES (12, 'Allure' , 'Allure plus fine' ,7 , 2 , null , 2);

INSERT INTO Seance
VALUES (13, 'Bras tout ferme' , 'Developper bras' ,8 , 2 , null , 2);

-- ---- Données dans Seance_Ut ---- --

INSERT INTO Seance_Ut
VALUES (1, 1, '2017-11-27',null,true);

INSERT INTO Seance_Ut
VALUES (2, 1, '2017-11-29',null,false);

INSERT INTO Seance_Ut
VALUES (3, 1, '2017-12-02',null,false);

INSERT INTO Seance_Ut
VALUES (4, 1, '2017-12-05',null,false);

INSERT INTO Seance_Ut
VALUES (5, 1, '2017-12-07',null,false);

INSERT INTO Seance_Ut
VALUES (1, 2, '2017-12-04',null,false);

INSERT INTO Seance_Ut
VALUES (2, 2, '2017-12-06',null,false);

INSERT INTO Seance_Ut
VALUES (3, 2, '2017-12-09',null,false);

INSERT INTO Seance_Ut
VALUES (4, 2, '2017-12-11',null,false);

INSERT INTO Seance_Ut
VALUES (5, 2, '2017-12-14',null,false);

INSERT INTO Seance_Ut
VALUES (6, 2, '2018-01-14',null,false);
INSERT INTO Seance_Ut
VALUES (7, 2, '2018-01-15',null,false);

INSERT INTO Seance_Ut
VALUES (8, 2, '2018-01-16',null,false);

INSERT INTO Seance_Ut
VALUES (9, 2, '2018-01-18',null,false);
-- ---- Données dans Seance_Exo ---- --

INSERT INTO Seance_Exo
VALUES (1, 1, 6, 3 , null, null);

INSERT INTO Seance_Exo
VALUES (1, 2, 6, 3 , null, null);

INSERT INTO Seance_Exo
VALUES (1, 14, 6, 3 , null, null);

INSERT INTO Seance_Exo
VALUES (2, 15, 6, 3 , null, null);

INSERT INTO Seance_Exo
VALUES (2, 17, 6, 3 , null, null);

INSERT INTO Seance_Exo
VALUES (3, 1, 6, 3 , null, null);

INSERT INTO Seance_Exo
VALUES (3, 1, 6, 3 , null, null);

INSERT INTO Seance_Exo
VALUES (4, 1, 6, 3 , null, null);

INSERT INTO Seance_Exo
VALUES (4, 3, 6, 3 , null, null);

INSERT INTO Seance_Exo
VALUES (5, 14, 6, 3 , null, null);

INSERT INTO Seance_Exo
VALUES (5, 16, 6, 3 , null, null);

INSERT INTO Seance_Exo
VALUES (6, 18, 6, 2 , null, null);

INSERT INTO Seance_Exo
VALUES (6, 19, 6, 2 , null, 30.15);

INSERT INTO Seance_Exo
VALUES (7, 4, 6, 2 , null, null);

INSERT INTO Seance_Exo
VALUES (7, 5, 6, 2 , null, null);

INSERT INTO Seance_Exo
VALUES (8, 22, 6, 2 , null, null);

INSERT INTO Seance_Exo
VALUES (8, 23, 6, 2 , null, null);

INSERT INTO Seance_Exo
VALUES (9, 1, 6, 2 , null, null);

INSERT INTO Seance_Exo
VALUES (9, 2, 6, 2 , null, null);

INSERT INTO Seance_Exo
VALUES (10, 18, 6, 2 , null, null);

INSERT INTO Seance_Exo
VALUES (10, 19, 6, 2 , null, 30.15);

INSERT INTO Seance_Exo
VALUES (11, 4, 6, 2 , null, null);

INSERT INTO Seance_Exo
VALUES (11, 5, 6, 2 , null, null);

INSERT INTO Seance_Exo
VALUES (12, 22, 6, 2 , null, null);

INSERT INTO Seance_Exo
VALUES (12, 23, 6, 2 , null, null);

INSERT INTO Seance_Exo
VALUES (13, 1, 6, 2 , null, null);

INSERT INTO Seance_Exo
VALUES (13, 2, 6, 2 , null, null);

