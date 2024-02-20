# Projet: Leitner System Back-end
## How to run it
Clone the project with
```
git clone https://github.com/vietanh2810/Leitner.git
```
Move to the directory:
```
cd Leitner
npm i
npm start
```

The API should be ready on localhost:3002 !

## Schema of the project:
![](https://cdn.discordapp.com/attachments/1208186930332967045/1209262063847735407/Sans-titre-2024-02-19-2236.png?ex=65e6480f&is=65d3d30f&hm=25d69513ee58c99d91d0f57f0157ce5690ee37df05617df804703cc0aaa39879&=)

## The database that we've used:

We've applied a "Fake-ODM" system that writes and reads directly from our JSON files. We put in place the Fake-ODM by ourselves. Furthermore, we have 3 principals JSON files: cards.json, quizzTakenDays.json and users.json

 1. Cards.json is used to store information about each card:
 2. quizzTakenDays.json is used to store the days that user have taken the quiz, e.g. if on the 3rd day user have used a GET to retrieve the quiz from the front UI, then the array in the file will add append 3
 3. Users.json is there 

So if u want to re-retrieve the quiz for today: simply remove 0 from the array in quizzTakenDays.json since I init the cycle using new Date() so a new cycle will be init everyday.

## Functionality we've done:
All the basic + bonus 1
