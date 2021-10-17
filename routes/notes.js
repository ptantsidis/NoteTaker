const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {  readFromFile,  readAndAppend,  writeToFile, } = require('../helpers/fsUtils');
const fs = require("fs")
var userNotesList = []

//get all notes
notes.get('/', (req,res) => {
    readFromFile('./db/notes.json').then((data) => 
    {
        userNotesList =JSON.parse(data) || []
        res.json(JSON.parse(data))});
});

//get specific note
notes.get('/:Id', (req, res) => {
    readFromFile('./db/notes.json')
    .then((data) => res.json(JSON.parse(data))
     .then((json => {
         const result = json.filter((note) =>  note.Id===Id);
         return result.length > 0
         ? res.json(result)
         :res.json('No note with that ID');
     })));
  });

  //new note
  notes.post('/', (req,res) => {
    const {  title, text, Id, } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            Id: uuidv4(),
        };
        userNotesList.push(newNote)
        fs.writeFileSync("./db/notes.json",JSON.stringify(userNotesList),function(err,result){
            if(err) throw err;
        })
        res.json(userNotesList)
    }     
 });
  
//delete specific note
notes.delete('/:Id', (req,res) => {
    const note_Id = req.params.Id;
        const result = userNotesList.filter((note) => note.Id != note_Id);
        userNotesList = result;
        fs.writeFileSync("./db/notes.json",JSON.stringify(userNotesList),function(err,result){
            if(err) throw err;
        })
        res.json(userNotesList)        
});

module.exports = notes;