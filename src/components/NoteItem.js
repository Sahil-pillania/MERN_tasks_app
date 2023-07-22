import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const { note, updateNote } = props;
  //console.log("note in noteitem is : " + note);
  return (
    <div className="col-md-3" key={note._id}>
      <div className="card my-2" style={{ minHeight: "170px" }}>
        <div className="card-body">
          <div className="">
            <h5 className="card-title m-0">{note.title}</h5>
            <i className="fa-solid fa-trash mx-2"></i>
            <i className="fa-solid fa-pen-clip mx-1"></i>
          </div>

          <p className="card-text">{note.description}</p>
          <Link to="#" className="btn btn-sm btn-primary">
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Deleted successfully", "success");
              }}
            />
          </Link>
          <Link to="#" className="mx-3 btn btn-sm btn-primary">
            <FontAwesomeIcon
              icon={faPenToSquare}
              onClick={() => {
                updateNote(note);
              }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
