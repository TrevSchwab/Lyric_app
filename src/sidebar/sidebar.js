import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sidebarItem';

class SidebarComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      addingNote: false,
      title: null
    };
  }
  render() {

    const { notes, classes, selectedNoteIndex } = this.props;

    if(notes) {
      return(
        <div className={classes.sidebarContainer}>
          <Button
            onClick={this.newNoteBtnClick}
            className={classes.newNoteBtn}>{this.state.addingNote ? 'Cancel' : 'New Note'}</Button>
            {
              this.state.addingNote ? 
              <div>
                <input type='text'
                  className={classes.newNoteInput}
                  placeholder='Enter note title'
                  onKeyUp={(e) => this.updateTitle(e.target.value)}>
                </input>
                <Button 
                  className={classes.newNoteSubmitBtn}
                  onClick={this.newNote}>Submit Note</Button>
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
                        selectNote={this.selectNote}
                        deleteNote={this.deleteNote}>
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

  newNoteBtnClick = () => {
    this.setState({ title: null, addingNote: !this.state.addingNote });
  }
  updateTitle = (txt) => {
    this.setState({ title: txt });
  }
  newNote = () => {
    this.props.newNote(this.state.title);
    this.setState({ title: null, addingNote: false });
  }
  selectNote = (n, i) => this.props.selectNote(n, i);
  deleteNote = (note) => this.props.deleteNote(note);

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