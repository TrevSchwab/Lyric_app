import React, { useState, useEffect } from 'react';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';
import './App.css';

const firebase = require('firebase');

const App = () => {

  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] = _doc.id;
          return data;
        });
        setNotes(notes);
      });
  }, []);

  const newNote = async (title) => {
    const note = {
      title: title,
      body: ''
    };
    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    const newID = newFromDB.id;
    setNotes([...notes, note]);
    const newNoteIndex = notes.indexOf(notes.filter(_note => _note.id === newID)[0]);
    setSelectedNote(notes[newNoteIndex]);
    setSelectedNoteIndex(newNoteIndex);
  }

  const selectNote = (note, index) => {
    setSelectedNoteIndex(index);
    setSelectedNote(note);
  };

  const noteUpdate = (id, noteObj) => {
    if (id !== null && id !== undefined && id !== "") {
      firebase
        .firestore()
        .collection('notes')
        .doc(id)
        .update({
          title: noteObj.title,
          body: noteObj.body,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
  }

  const deleteNote = async (note) => {
    const noteIndex = notes.indexOf(note);
    setNotes(notes.filter(_note => _note !== note))
    if(selectedNoteIndex === noteIndex) {
      setSelectedNoteIndex(null);
      setSelectedNote(null);
    } else {
      notes.length > 1 ?
      selectNote(notes[selectedNoteIndex - 1], selectedNoteIndex - 1) :
      setSelectedNoteIndex(null);
      setSelectedNote(null);
    }
  firebase
    .firestore()
    .collection('notes')
    .doc(note.id)
    .delete();
  }

  return(
    <div className="app-container">
      <SidebarComponent 
        selectedNoteIndex={selectedNoteIndex}
        notes={notes}
        deleteNote={deleteNote}
        selectNote={selectNote}
        newNote={newNote}></SidebarComponent>
      {
        selectedNote ?
        <EditorComponent 
          selectedNote={selectedNote}
          selectedNoteIndex={selectedNoteIndex}
          notes={notes}
          noteUpdate={noteUpdate}></EditorComponent> 
        : null
      }
    </div>
  );
}

export default App;