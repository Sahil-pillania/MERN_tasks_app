import React from "react";
import "../App.css";

const Alert = (props) => {
  const capitalize = (word) => {
    if (word === "danger") {
      word = "Error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    <div
      style={{
        height: "70px",
        width: "60%",
        position: "relative",

        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <strong> {capitalize(props.alert.type)}</strong>: {props.alert.msg}
          </div>
          <button
            type="button"
            style={{
              width: "30px",
              height: "30px",
              position: "absolute",
              right: "15px",
              top: "12px",
              borderRadius: "5px",
              background: "#ff7e7e",
            }}
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default Alert;
