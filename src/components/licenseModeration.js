import React, { useEffect, useState } from "react";
import { ReactDOM } from "react-dom";
import LicenseDetail from "./licenseDetail";
import {
  getWaitingBooks,
  getApprovedBooks,
  getRejectedBooks,
} from "./prepareData";

function LicenseModeration(props) {
  const [waitingStatus, setWaitingStatus] = useState(true);
  const [approvedStatus, setApprovedStatus] = useState(false);
  const [rejectedStatus, setRejectedStatus] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(0);
  const [arr, setArr] = useState([]);
  useEffect(() => {
    if (currentStatus == 0) {
      const waiting = getWaitingBooks(props.books);
      setArr(waiting);
    } else if (currentStatus == 1) {
      const approved = getApprovedBooks(props.books);
      setArr(approved);
    } else if (currentStatus == 2) {
      const rejected = getRejectedBooks(props.books);
      setArr(rejected);
    }
  }, [currentStatus]);

  const handleClick = (val) => {
    setCurrentStatus(val);
    if (val == 0) {
      setApprovedStatus(false);
      setWaitingStatus(true);
      setRejectedStatus(false);
    } else if (val == 1) {
      setApprovedStatus(true);
      setWaitingStatus(false);
      setRejectedStatus(false);
    } else if (val == 2) {
      setApprovedStatus(false);
      setWaitingStatus(false);
      setRejectedStatus(true);
    }
  };

  const waitingClass = waitingStatus ? "active-text" : "";
  const ApprovedClass = approvedStatus ? "active-text" : "";
  const RejectedClass = rejectedStatus ? "active-text" : "";

  return (
    <div className="license-moderation-container">
      <div className="license-type-container">
        <div
          className={`license-type-element ${waitingClass}`}
          onClick={() => handleClick(0)}
        >
          Waiting License
        </div>
        <div
          className={`license-type-element ${ApprovedClass}`}
          onClick={() => handleClick(1)}
        >
          Approved License
        </div>
        <div
          className={`license-type-element ${RejectedClass}`}
          onClick={() => handleClick(2)}
        >
          Rejected License
        </div>
      </div>
      <div className="license-type-separator"></div>
      <div className="license-detail-wrapper">
        {arr.map((book) => {
          console.log("book", book);
          console.log("status", currentStatus);
          return <LicenseDetail bookDetail={book} status={currentStatus} />;
        })}
      </div>
    </div>
  );
}
export default LicenseModeration;
