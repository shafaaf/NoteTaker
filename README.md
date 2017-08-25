# Note Taking App

Done as part of Focus21's interview process.

## Main Technologies Used
* React
* Redux
* Node.js
* postgress

## How to use
* Can add in new notes using "Add New Note" form
* Initially shows all notes and new ones that get added but can make customized searches.
* Can edit notes by clicking on either title or description, and then writing in new text.
* Can change color of notes for better organization.
* Can move notes around for better view. However doing this with customized searching will keep new note positions. So move them when not doing any custoimzed searching. Can refresh page to get back old note positions.

## Local installation
Make sure npm, node installed.
```
git clone https://github.com/shafaaf/NotesProject.git
```
Install packages on both server and notepad folders
```
npm install
```

Setup database and run server
```
cd server
psql -f notes.sql
nodemon server.js
```
Run React App
```
cd notepad
npm start
```
