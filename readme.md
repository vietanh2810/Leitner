# Back de l'application

## Pour lancer le back de l'application
1. `npm install`
2. `npm start`

## Schéma architecture hexagonale et DDD de l'application

![Image schéma architecture hexagonale et DDD](./schema.png)

### Explications schéma

Tout d'abord nous avons fait un schéma DDD qui reprend l'expression de beoin des utilisateurs.
Ici Card représente les fiches à mémoriser.
Pour l'rchitecture hexagonale, notre back est représenté par le rond jaune qui représente le user Interface. Lorsque l'utilisateur tente de se connecter, l'API (backend) est solicité par le front.
Le data file est lorsque l'utilisateur essaye de créer une nouvelle fiche, lire une fiche ou encore répondre à une fiche. Cette action va lire et écrire dans nos fichiers présents dans notre dossier fakeOdm (les données ici sont en dur).
Ensuite il doit normalement un système de notification qui envoit une requête dans le back.
Ensuite nous avons conclu que nous avons 3 services principaux: l'utilisateur, les fiches et le quizz.