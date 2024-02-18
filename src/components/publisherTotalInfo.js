import React from "react";
import { ReactDOM } from "react-dom";
import InfoCard from "./publisherTotalCard";





function TotalInfo(props) {
    
    return(
        <div className="info-card-wrapper">
            <InfoCard title="Total Generated Number" number={props.totalGenerated} />
            <InfoCard title="Total of  Books Read" number={props.totalRead} />
            <InfoCard title="Total Issued License" number={props.totalLicense} /> 
        </div>
    )
}

export default TotalInfo