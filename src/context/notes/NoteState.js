import React, { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
  // const host = "http://localhost:6000";

  const notesInitial = [
    // { _id: "12334345", title: "sahil", description: "desc" },
  ];
  const [notes, setNotes] = useState(notesInitial);
  const [searchednotes, setSearchedNotes] = useState([]);
  const [searchedConstant, setSearchedConstant] = useState("");

  // get all notes
  const getNotes = async () => {
    const response = await fetch(`/api/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    // console.log("getnotes item data is here : " + json);
    setNotes(json);
  };
  //Add note
  const addNote = async (title, description) => {
    const response = await fetch(`/api/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });
    console.log("Your note has been added. " + response.json);
    const json = await response.json();

    setNotes(notes.concat(json));
  };
  // Delete a note
  const deleteNote = async (id) => {
    // todo api call
    console.log("deleting the note " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);

    const response = await fetch(`/api/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = response.json();
    console.log("deleting the note " + json);
  };

  // Edit a Note
  const editNote = async (id, title, description) => {
    // API Call

    const response = await fetch(`/api/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    // edit logic
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        break;
      }
    }
    setNotes(newNotes);
    searchNotes(searchedConstant);
  };

  const searchNotes = async (searchData) => {
    setSearchedConstant(searchData);
    const response = await fetch(`/api/search/${searchData}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    // console.log("getnotes item data is here : " + json);
    setSearchedNotes(json);
  };

  return (
    <noteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        editNote,
        getNotes,
        searchNotes,
        searchednotes,
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
