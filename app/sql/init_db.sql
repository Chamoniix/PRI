-- creation de l'utilisateur projetApp / mot de passe 'projetApp'
CREATE USER 'projetApp' IDENTIFIED BY 'projetApp';

-- creation de la base projetApp
CREATE DATABASE appliPP;
grant all on appliPP.* to 'projetApp'@'localhost';
