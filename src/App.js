import React from 'react';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';
import './App.css';

const firebase = require('firebase');

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    };
  }

  

  render() {

    const noteUpdate = (id, noteObj) => {
      console.log('app id notObj ', id, noteObj)
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

    return(
      <div className="app-container">
        <SidebarComponent 
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}></SidebarComponent>
        {
          this.state.selectedNote ?
          <EditorComponent 
            selectedNote={this.state.selectedNote}
            selectedNoteIndex={this.state.selectedNoteIndex}
            notes={this.state.notes}
            noteUpdate={noteUpdate}></EditorComponent> 
          : null
        }
      </div>
    );
  }

  componentDidMount = () => {
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] = _doc.id;
          return data;
        });
        console.log(notes);
        this.setState({ notes: notes });
      });
  }

  selectNote = (note, index) => this.setState({ selectedNoteIndex: index, selectedNote: note });
  
  // const noteUpdate = (id, noteObj) => {
  //   console.log('app id notObj ', id, noteObj)
  //   firebase
  //     .firestore()
  //     .collection('notes')
  //     .doc(id)
  //     .update({
  //       title: noteObj.title,
  //       // body: noteObj.body,
  //       timestamp: firebase.firestore.FieldValue.serverTimestamp()
  //     });
  // }
  
  newNote = async (title) => {
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
    await this.setState({ notes: [...this.state.notes, note] });
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]);
    this.setState({ selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex });
  }
  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({ notes: this.state.notes.filter(_note => _note !== note) });
    if(this.state.selectedNoteIndex === noteIndex) {
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    } else {
      this.state.notes.length > 1 ?
      this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    }

    firebase
      .firestore()
      .collection('notes')
      .doc(note.id)
      .delete();
  }
}

export default App;




// import React, { useState, useEffect } from 'react';
// import SidebarComponent from './sidebar/sidebar';
// import EditorComponent from './editor/editor';
// import './App.css';

// const firebase = require('firebase');

// const App = () => {

//   const [selectedNote, setSelectedNote] = useState(null)
//   const [selectedNoteIndex, setSelectedNoteIndex] = useState(null)
//   const [notes, setNotes] = useState(null)

//   console.log('app state selectedNote, ', selectedNote, 'notes ', notes)

//   useEffect(() => {
//     firebase
//       .firestore()
//       .collection('notes')
//       .onSnapshot(dbChange => {
//         const notes = dbChange.docs.map(doc => {
//           const data = doc.data()
//           return data
//         })
//         // console.log('notes ', notes)
//         setNotes(notes)
//       })
//   }, [])

//   const selectNote = (note, index) => {
//     // console.log('selectNOte ', note, index)
//     setSelectedNote(note)
//     setSelectedNoteIndex(index)
//   }

//   const newNote = () => {
//     console.log('newNote')
//   }

//   const deleteNote = () => {
//     console.log('deleteNote')
//   }

//   const noteUpdate = (id, noteObj) => {
//     setSelectedNote(noteObj)
//     console.log('id ', id, 'noteObj ', noteObj)
//   }

//   let render = 
//     <div className="app-container">
//       <SidebarComponent
//         selectedNoteIndex={selectedNoteIndex}
//         notes={notes}
//         selectNote={selectNote}
//         deleteNote={deleteNote}
//         newNote={newNote}>       
//       </SidebarComponent>
//       { selectedNote ?
//         <EditorComponent
//           selectedNote={selectedNote}
//           selectedNoteIndex={selectedNoteIndex}
//           notes={notes}
//           noteUpdate={noteUpdate}>
//         </EditorComponent>
//         : null
//       } 
//     </div>

//   return render;
// }

// export default App;
