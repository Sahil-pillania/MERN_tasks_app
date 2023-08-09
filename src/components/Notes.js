import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import {
  faToggleOn,
  faToggleOff,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DataTable from "react-data-table-component";

const Notes = ({ showAlert }) => {
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const [show, setshow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleSearchBox, settoggleSearchBox] = useState(false);

  const ref = useRef(null);
  const refClose = useRef(false);
  const context = useContext(noteContext);
  const { notes, getNotes, editNote, searchNotes, searchednotes, deleteNote } =
    context;

  useEffect(() => {
    getNotes();
    //react-hooks/exhaustive-deps;
  }, []);

  const updateNote = (currentNote) => {
    const { _id, title, description } = currentNote;
    setshow(true);
    ref.current.click();
    setNote({
      id: _id,
      etitle: title,
      edescription: description,
    });
  };

  // data table data structure
  const column = [
    {
      name: "Titles",
      selector: (row) => row.title,
      width: "200px",
      wrap: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      width: "230px",
      wrap: true,
    },
    {
      name: "Date Created",
      selector: (row) => row.date.slice(0, 10),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button to="#" className="btn btn-sm btn-danger mx-2">
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => {
                deleteNote(row._id);
                showAlert("Deleted successfully", "success");
              }}
            />
          </button>
          <button to="#" className=" btn btn-sm btn-warning">
            <FontAwesomeIcon
              icon={faPenToSquare}
              onClick={() => {
                updateNote(row);
              }}
            />
          </button>
        </>
      ),
      sortable: true,
    },
  ];

  const tableStyle = {
    headRow: {
      style: {
        backgroundColor: "#eee",
        fontWeight: "bold",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#fff",
      },
    },
    cells: {
      style: {
        backgroundColor: "#fff",
      },
    },
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    console.log("Updating the note " + note);
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription);
    refClose.current.click();

    showAlert("Updated successfully", "success");
  };

  const handleSearch = (e) => {
    // e.preventDefault();

    searchNotes(searchTerm);
  };

  return (
    <>
      <div style={{ textAlign: "center", paddingBottom: 20 }}>
        <h5 style={{ fontSize: "3rem", color: "#fff" }}>Notes App</h5>
      </div>
      <AddNote showAlert={showAlert} />

      {/* <!-- Button trigger modal --> */}
      // <button
      //   ref={ref}
      //   type="button"
      //   className="btn btn-primary d-none"
      //   data-bs-toggle="modal"
      //   data-bs-target="#exampleModal"
      // >
      //   Launch modal
      // </button>

      {/* <!-- Modal --> */}
      {show && (
        <div
          className=""
          tabindex="-1"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          style={{
            position: "absolute",
            left: "0",
            right: "0",
            top: "30%",
            // bottom: "10%",
            zIndex: 100,
            width: "50%",
            // display: "flex",
            height: "auto",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "transparent",
            padding: "50px",
            borderRadius: "15px",
          }}
          // aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id="exampleModalLabel"
                  style={{ fontSize: "22px" }}
                >
                  Update your task
                </h5>
                <div
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span
                    aria-hidden="true"
                    onClick={() => setshow(false)}
                    style={{
                      background: "red",
                      borderRadius: "50%",
                      textAlign: "center",
                      padding: "7px 15px",
                    }}
                  >
                    &times;
                  </span>
                </div>
              </div>
              <div className="modal-body">
                <form className="my-3">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      aria-describedby="title"
                      name="etitle"
                      value={note.etitle}
                      onChange={onChange}
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
                      id="edescription"
                      name="edescription"
                      value={note.edescription}
                      onChange={onChange}
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  ref={refClose}
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={() => setshow(false)}
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={
                    note?.etitle?.length < 3 || note?.edescription?.length < 3
                  }
                  onClick={handleClick}
                  className="btn btn-primary mx-3"
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className="row my-3"
        style={{
          position: "relative",
          background: "rgb(245 243 243)",
          padding: "20px",
          borderRadius: "20px",
          maxWidth: "60vw",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* // switch to search  */}
        <div
          type="button"
          // className="btn btn-primary"
          style={{
            position: "absolute",
            right: "10px",
            top: "10px",
            width: "80px",
            borderRadius: "10px",
            marginRight: "10px",
            padding: "10px",
          }}
        >
          <FontAwesomeIcon
            icon={toggleSearchBox === false ? faToggleOff : faToggleOn}
            style={{ fontSize: "33px" }}
            title="Search Box"
            onClick={() => settoggleSearchBox(!toggleSearchBox)}
          />
        </div>
        {/* <hr /> */}
        <h2>Your Notes 📒</h2>
       

        {toggleSearchBox && (
          <div style={{ textAlign: "center" }}>
            <div
              className="row my-3"
              style={{
                background: "rgb(245 243 243)",
                padding: "10px",
                borderRadius: "20px",
                maxWidth: "60vw",
                marginLeft: "auto",
                marginRight: "auto",
                // backgroundColor: "grey",
              }}
            >
              <h2>Your Search Results 🔎</h2>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "40px",
              }}
            >
              <input
                type="text"
                name="search"
                placeholder="Search here..."
                style={{
                  borderRadius: "10px",
                  border: "1px solid #000",
                  marginRight: "10px",
                  padding: "10px",
                }}
                value={searchTerm}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                className="btn btn-success"
                disabled={searchTerm === ""}
                style={{
                  borderRadius: "10px",
                  marginRight: "10px",
                  padding: "10px",
                }}
                onClick={() => handleSearch()}
              >
                Search
              </button>
            </div>
          
            <div style={{ padding: "50px 20px" }}>
              <DataTable
                columns={column}
                data={searchednotes}
                style={[tableStyle, { borderRadius: "20px" }]}
                pagination
              />
            </div>
          </div>
        )}
        {!toggleSearchBox && (
          <>
          
            <div style={{ padding: "50px 10px" }}>
              <DataTable
                columns={column}
                data={notes}
                style={[tableStyle, { borderRadius: "20px" }]}
                pagination
                className="custom-data-table"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Notes;
