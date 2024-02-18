import React, { useEffect, useState } from "react";
import { ReactDOM } from "react-dom";
import OfferLicensePopUp from "./OfferLicensePopUp";
import { uploadFile, createMetadata } from "./ipfs";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import aggrementABI from "../abi/Aggrement.json";

function OfferLicense() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [isLoadingLicense, setIsLoadingLicense] = useState(false);
  const [bookMetadata, setBookMetadata] = useState("");
  const [url, setUrl] = useState("");
  const [state, setState] = useState({
    contentName: "",
    publisherName: "",
    totalSupply: 0,
  });

  const handleChangeFile = async (event) => {
    setIsLoadingFile(true);
    const { cid, url } = await uploadFile(event.target.files[0]);

    setUrl(url);
    const { url: bookUrl } = await createMetadata(
      state.contentName,
      state.publisherName,
      url
    );
    setIsLoadingFile(false);
    setBookMetadata(bookUrl);
  };

  const { config } = usePrepareContractWrite({
    address: process.env.REACT_APP_AGGREMENT_CONTRACT_ADDRESS,
    abi: aggrementABI,
    functionName: "createBook",
    args: [
      state.contentName,
      state.publisherName,
      state.totalSupply,
      state.incomePercentage,
      url,
      bookMetadata,
    ],
  });

  const { data, isLoading, isSuccess, write, status } =
    useContractWrite(config);

  const handleClick = async () => {
    setIsLoadingLicense(true);

    setIsLoadingLicense(false);
  };

  function handleChange(e) {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  }

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const hiddenClassFile = isLoadingFile ? "" : "hidden";
  const hiddenClassLicense = isLoadingLicense ? "" : "hidden";

  return (
    <div className="button-section">
      <button className="button-offer-license" onClick={togglePopup}>
        Offer License
      </button>
      {isOpen && (
        <OfferLicensePopUp
          content={
            <>
              <div className="offer-title">License</div>
              <form>
                <div className="form-container">
                  <div className="form-input-name">Content Name</div>
                  <span className="form-input-seperator">:</span>
                  <input
                    className="input-license"
                    type="text"
                    name="contentName"
                    value={state.contentName}
                    onChange={handleChange}
                  />
                  <div className="form-input-name">Content Creator</div>
                  <span className="form-input-seperator">:</span>
                  <input
                    className="input-license"
                    type="text"
                    name="publisherName"
                    value={state.publisherName}
                    onChange={handleChange}
                  />
                  <div className="form-input-name">Amount of Mint</div>
                  <span className="form-input-seperator">:</span>
                  <input
                    className="input-license"
                    type="text"
                    name="totalSupply"
                    value={state.totalSupply}
                    onChange={handleChange}
                  />
                  <div className="form-input-name">Income Percentage</div>
                  <span className="form-input-seperator">:</span>
                  <input
                    className="input-license"
                    type="text"
                    name="incomePercentage"
                    value={state.incomePercentage}
                    onChange={handleChange}
                  />
                  <div className="form-input-name">Upload To IPFS</div>
                  <span className="form-input-seperator">:</span>
                  <div className="file-input-wrapper">
                    <label for="bookFile" className={`file-input-container`}>
                      Upload PDF
                      <input
                        id="bookFile"
                        type="file"
                        className="input-license-file"
                        onChange={handleChangeFile}
                      />
                    </label>
                    <div style={{ color: "white" }} className={hiddenClassFile}>
                      Uploading...
                    </div>
                  </div>
                </div>
                <button
                  disabled={!write}
                  onClick={() => write?.()}
                  className="popup-offer-button"
                >
                  Offer License
                </button>
              </form>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
}

export default OfferLicense;
