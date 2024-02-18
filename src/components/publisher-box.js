import { useState } from "react";
import React from "react";
import PublisherElement from "./publisher-element";
import aggrementABI from "../abi/Aggrement.json";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

function PublisherBox(props) {
  const [btnState, setBtnState] = useState(false);
  const [state, setState] = useState({
    name: "",
    wallet: "",
  });

  function handleChange(e) {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  }

  const { config } = usePrepareContractWrite({
    address: process.env.REACT_APP_AGGREMENT_CONTRACT_ADDRESS,
    abi: aggrementABI,
    functionName: "addPublisher",
    args: [state.wallet, state.name],
  });

  const { data, isLoading, isSuccess, write, status } =
    useContractWrite(config);

  const publisherArray = props.publishers;

  function openForm() {
    setBtnState((btnState) => !btnState);
  }
  let formToggle = btnState ? "" : "hidden";
  let buttonToggle = btnState ? "hidden" : "";

  return (
    <div className="publisher-box-container">
      <div className="publisher-box-col1">
        <div className="publisher-title-text">Publishers</div>
        <form className={formToggle}>
          <input
            className="publisher-name-input"
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
            placeholder="Publisher Name"
          />
          <input
            className="publisher-number-input"
            type="text"
            name="wallet"
            value={state.wallet}
            onChange={handleChange}
            placeholder="Publisher Number"
          />
          <button
            className="add-publisher-form"
            disabled={!write}
            onClick={() => write?.()}
          >
            Add Publisher
          </button>
        </form>
        <button
          className={`add-publisher-button ${buttonToggle}`}
          onClick={openForm}
        >
          Add Publisher
        </button>
      </div>
      <div className="publisher-box-col2">
        <div className="publisher-element-wrapper">
          {publisherArray.map((publisher) => (
            <PublisherElement
              publisherName={publisher.name}
              publisherNumber={publisher.wallet}
            />
          ))}
          <PublisherElement
            publisherName={"İş Bankası"}
            publisherNumber={"0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"}
          />
        </div>
      </div>
    </div>
  );
}

export default PublisherBox;
