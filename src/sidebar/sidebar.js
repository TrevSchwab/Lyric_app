import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sidebarItem';

const SidebarComponent = props => {

  const [addingNote, setAddingNote] = useState(false);
  const [title, setTitle] = useState(null);

  const { notes, classes, selectedNoteIndex } = props;

  const newNoteBtnClick = () => {
    setTitle(null);
    setAddingNote(!addingNote);
  }
  
  const updateTitle = (txt) => {
    setTitle(txt);
  }
  
  const newNote = () => {
    props.newNote(title);
    setTitle(null);
    setAddingNote(false);
  }
  
  const selectNote = (n, i) => props.selectNote(n, i);
  
  const deleteNote = (note) => props.deleteNote(note);


  if(notes) {
    return(
      <div className={classes.sidebarContainer}>
        <Button
          onClick={newNoteBtnClick}
          className={classes.newNoteBtn}>{addingNote ? 'Cancel' : 'New Note'}</Button>
          {
            addingNote ? 
            <div>
              <input type='text'
                className={classes.newNoteInput}
                placeholder='Enter note title'
                onKeyUp={(e) => updateTitle(e.target.value)}>
              </input>
              <Button 
                className={classes.newNoteSubmitBtn}
                onClick={newNote}>Submit Note</Button>
            </div> :
            null
          }
          <List>
            {
              notes.map((_note, _index) => {
                return(
                  <div key={_index}>
                    <SidebarItemComponent
                      _note={_note}
                      _index={_index}
                      selectedNoteIndex={selectedNoteIndex}
                      selectNote={selectNote}
                      deleteNote={deleteNote}>
                    </SidebarItemComponent>
                    <Divider></Divider>
                  </div>
                )
              })
            }
          </List>
      </div>
    );
  } else {
    return(<div></div>);
  }
}

export default withStyles(styles)(SidebarComponent);




// import React, { useState } from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import styles from './styles';
// import List from '@material-ui/core/List';
// import { Divider, Button } from '@material-ui/core';
// import SidebarItemComponent from '../sidebaritem/sidebarItem';

// const SidebarComponent = props => {

//   const [state, setState] = useState({
//     addingNote: false,
//     title: '',
//   })

//   const { classes, notes, selectedNoteIndex } = props

//   const newNoteBtnClick = () => {
//     setState({addingNote: !state.addingNote})
//     console.log('newNoteBtnClick')
//   }

//   const updateTitle = () => {
//     // console.log('update title');
//   }

//   const newNote = () => {
//     console.log('new note')
//   }

//   const selectNote = (n, i) => {
//     props.selectNote(n, i)
//     // console.log('SIDEBAR selectNote ', n, i)
//   }
//   const deleteNote = () => {
//     console.log('deleteNote');
//   }

//   if(notes) {
//     let render =
//       <div className={classes.sidebarContainer}>
//         <Button
//           onClick={newNoteBtnClick}
//           className={classes.newNoteBtn}>{state.addingNote ? 'Cancel' : 'New Note'}</Button>
//           {
//             state.addingNote ?
//               <div>
//                 <input
//                   type='text'
//                   className={classes.newNoteInput}
//                   placeholder='Enter note title'
//                   onKeyUp={(e) => updateTitle(e.target.value)}>
//                 </input>
//                 <Button
//                   className={classes.newNoteSubmitBtn}
//                   onClick={newNote}>Submit Note</Button>
//               </div> :
//               null
//           }
//           <List>
//             {notes.map((_note, _index) => {
//               return(
//                 <div key={_index}>
//                   <SidebarItemComponent
//                     _note={_note}
//                     _index={_index}
//                     selectedNoteIndex={selectedNoteIndex}
//                     selectNote={selectNote}
//                     deleteNote={deleteNote}>
//                   </SidebarItemComponent>
//                   <Divider></Divider>
//                 </div>
//               )
//             })}
//           </List>

//       </div>

//     return render 

//     } else {
//       let render=<div>Sorry..</div>

//       return render
//     }
  
  
// }


// export default withStyles(styles)(SidebarComponent);