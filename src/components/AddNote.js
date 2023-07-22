import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";

const AddNote = ({ showAlert }) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
  });
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleClick = async (e) => {
    // console.log("Adding note", note);
    e.preventDefault();
    await addNote(note.title, note.description);
    setNote({ title: "", description: "" });
    showAlert("Added successfully", "success");
  };
  return (
    <div
      className="container"
      style={{
        maxWidth: "60vw",
        background: "rgb(245 243 243)",
        padding: "20px",
        borderRadius: "20px",
      }}
    >
      <h2 style={{ paddingLeft: "80px", paddingRight: "80px" }}>Add a Note</h2>
      <form
        className="my-3"
        style={{ paddingLeft: "80px", paddingRight: "80px" }}
      >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="title"
            name="title"
            onChange={onChange}
            minLength={3}
            value={note.title}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            minLength={3}
            value={note.description}
            required
          />
        </div>
        <div style={{ textAlign: "center", paddingTop: "10px" }}>
          <button
            disabled={note.title.length < 3 || note.description.length < 3}
            type="submit"
            onClick={handleClick}
            className="btn btn-success"
            style={{ textAlign: "center" }}
          >
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;
