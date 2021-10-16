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
        console.log("Get",userNotesList)
        res.json(JSON.parse(data))});
});

//get specific note
notes.get('/:noteId', (req, res) => {
    readFromFile('./db/notes.json')
    .then((data) => res.json(JSON.parse(data))
     .then((json => {
         const result = json.filter((note) =>  note.noteId===noteId);
         return result.length > 0
         ? res.json(result)
         :res.json('No note with that ID');
     })));
  });

  //new note
  notes.post('/', (req,res) => {
    console.log(req.body);

    const {  title, text, noteId, } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            noteId: uuidv4(),
        };
        // readAndAppend(newNote, './db/notes.json');
        userNotesList.push(newNote)
        fs.writeFileSync("./db/notes.json",JSON.stringify(userNotesList),function(err,result){
            if(err) throw err;
            console.log("Data",result)
        })
        console.log("POST",userNotesList)
        res.json(userNotesList)
    //     writeToFile(userNotesList)
    //             res.json(`Note Added🚀`);
    // } else {
    //     res.error('Note in Error')
    }     
 });
  
//delete specific note
notes.delete('/api/notes/:noteId', (req,res) => {
    const note_Id = req.params.noteId;
    readFromFile('./db/notes.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        // make a new array of all tips except this one
        const result = json.filter((note) => note.noteID !== note_Id);

        writeToFile('./db/notes.json', result);
        res.json(`Item ${note_Id} has been deleted 🗑️`);
    });
});

module.exports = notes;