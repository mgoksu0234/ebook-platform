import React from "react";
import { ReactDOM } from "react";
import CountUp from "react-countup";

function InfoCard(props) {
  return (
    <div className="info-card-total">
      <div className="info-card-title">{props.title}</div>
      <div className="info-card-value-container">
        <div className="info-card-value">
          <CountUp start={0} end={props.number} duration={1.75} />
        </div>
      </div>
    </div>
  );
}
export default InfoCard;
