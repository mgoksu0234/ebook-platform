import React from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import aggrementABI from "../abi/Aggrement.json";

function PublisherElement(props) {
  const { config } = usePrepareContractWrite({
    address: process.env.REACT_APP_AGGREMENT_CONTRACT_ADDRESS,
    abi: aggrementABI,
    functionName: "removePublisher",
    args: [props.publisherNumber],
  });

  const { data, isLoading, isSuccess, write, status } =
    useContractWrite(config);
  return (
    <div className="publisher-element">
      <div className="element-publisher-info">
        <div className="element-publisher-name">{props.publisherName}</div>
        <div className="element-publisher-number">{props.publisherNumber}</div>
      </div>
      <div className="element-publisher-trash">
        <div className="trash-logo" onClick={() => write?.()}></div>
      </div>
    </div>
  );
}
export default PublisherElement;
