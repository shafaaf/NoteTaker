# Note Taking App
A single-page web app that helps keep track of notes. Allows coloring and querying of different notes.

## Main Technologies Used
* React
* Redux
* Node.js
* postgress

## How to use/ features
* Can add in new notes using the "Add New Note" form. Title and description are both optional.
* Initially shows all notes but can make customized searches based on order, limit and start index.
* Can edit notes by directly clicking on either title or description, and then writing in new text.
* Can change color of notes for better organization. Initial color is yellow.
* Can move notes around for better view and organization.
**However doing this and then doing a customized search as above will keep the new alteraed positions. Therefore, only move aound notes when not doing searching. Can refresh page to get back old note positions and start custom searches again.**

## Local installation
Make sure npm, node installed.
```
git clone https://github.com/shafaaf/NotesProject.git
```
### Setup server
```
cd server
npm install
node server.js
```

### Setup client side react-redux app
```
cd notepad
npm install
npm start
```
