import React from "react";
import { ReactDOM } from "react-dom";

function LicenseElement(props){

    let link;
    if(props.isUrl == true){
        link = <a href={props.elementValue} target="_blank">Go to IPFS file</a>
    }
    else{
        link = props.elementValue
    }
    return(
            <div className="license-element">
                <div className="element-title">{props.elementTitle}</div>
                <div className="element-separator"></div>
                <div className="element-value">{link}</div>
            </div>
    )
}

export default LicenseElement