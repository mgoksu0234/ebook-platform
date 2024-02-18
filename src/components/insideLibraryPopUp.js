import React, { useImperativeHandle } from "react";
import "../App.css";

function InsideLibraryPopUp(props) {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        {props.content}
      </div>
    </div>
  );
}

export default InsideLibraryPopUp;
