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

## For Bonus 1:
How we've done it:
Instead of using the calendar base:
![](https://cdn.discordapp.com/attachments/1208186930332967046/1209320175707357184/image.png?ex=65e67e2d&is=65d4092d&hm=b36928b7006d6bb38d436cb4592405432433cbb2768aa3ca2ad1258c7db776ed&=)
We added a notion of nextDate in each Card which represents the next day the card will be in the quiz: the property will only be added when user submits an answer for the card. The when generate the quizz for a day we simply added all the card in 1st category and then all the card whose nextDate = current day.
![](https://cdn.discordapp.com/attachments/1208186930332967046/1209320854459129977/image.png?ex=65e67ecf&is=65d409cf&hm=088543307d221e049348fa29467cc631d11764d71755af2322b31f51e7a0d8c1&=)
