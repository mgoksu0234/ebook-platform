import React from "react";
import "../App.css";

function OutsideLibraryPopUp(props) {
  return (
    <div className="popup-box-outside-library">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        {props.content}
      </div>
    </div>
  );
}

export default OutsideLibraryPopUp;
