import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const host="http://localhost:5000"
  const notesInitial = []
    

  const [notes, setNotes] = useState(notesInitial);
  //getallnotes
  const getNotes = async () => {
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`,
      {
          headers: {
            'auth-token':localStorage.getItem('token'),
            'Content-Type': 'application/json'
          },
          method: "GET",
         
      });
      const json=await response.json()
   
   console.log(json)
   setNotes(json)
  };
  //Add a note
  const addNote = async (title, description, tag) => {
    //TODO:API Call
    const response = await fetch(`${host}/api/notes/addnote`,
      {
          headers: {
            'auth-token':localStorage.getItem('token'),
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({title,description,tag})
      });
const json=await response.json();
   
   //add in client
    console.log("Adding a new note")
    const note = json;
    
    setNotes(notes.concat(note))
  };
  //Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`,
      {
          headers: {
            'auth-token':localStorage.getItem('token'),
            'Content-Type': 'application/json'
          },
          method: "DELETE",
          
      });
      const json = await response.json()
      console.log(json)
   
    console.log("deleting a note with id"+id)
    const newNotes = notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes)
    
  };
  //Edit a note
  const editNote =async (id,title,description,tag)=>{
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`,
      {
          headers: {
            'auth-token':localStorage.getItem('token'),
            'Content-Type': 'application/json'
          },
          method: "PUT",
          body: JSON.stringify({title,description,tag})
      });
   const json=await response.json();
   console.log(json)
    //logic to edit in client
    let newNotes=JSON.parse(JSON.stringify(notes))
for (let index = 0; index < newNotes.length; index++) {
  const element = notes[index];
  if(element._id ===id){
    newNotes[index].title=title;
    newNotes[index].description=description;
    newNotes[index].tag=tag;
  }
  break;
  
}
setNotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{ notes,addNote,deleteNote,editNote ,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
