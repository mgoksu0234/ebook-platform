import React, { useEffect, useState } from "react";
import LicenseElement from "./license-element";
import bookABI from "../abi/Book.json";
import aggrementABI from "../abi/Aggrement.json";
import { getBookDetail } from "./prepareData";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useContractRead } from "wagmi";

function LicenseDetail(props) {
  const [bookDetail, setBookDetail] = useState({
    name: "",
    publisher: "",
    fileUrl: "",
  });

  const { data } = useContractRead({
    address: props.bookDetail.nft,
    abi: bookABI,
    functionName: "getFileUrl",
  });

  useEffect(() => {
    getBookDetail(data).then((e) => {
      setBookDetail({
        name: e.name,
        publisher: e.publisher,
        fileUrl: e.fileUrl,
      });
    });
  }, []);

  const { config: approveConfig } = usePrepareContractWrite({
    address: process.env.REACT_APP_AGGREMENT_CONTRACT_ADDRESS,
    abi: aggrementABI,
    functionName: "approveBook",
    args: [props.bookDetail.nft],
  });
  const { isSuccess, write: approve, status } = useContractWrite(approveConfig);

  const { config: rejectConfig } = usePrepareContractWrite({
    address: process.env.REACT_APP_AGGREMENT_CONTRACT_ADDRESS,
    abi: aggrementABI,
    functionName: "rejectBook",
    args: [props.bookDetail.nft],
  });
  const { write: reject } = useContractWrite(rejectConfig);

  return (
    <div className="license-detail-container">
      <div className="license-logo">
        <div></div>
      </div>
      <LicenseElement
        elementTitle="Content Name"
        elementValue={bookDetail.name}
      />
      <LicenseElement
        elementTitle="Content Creator"
        elementValue={bookDetail.publisher}
      />
      <LicenseElement
        elementTitle="Amount of Mint"
        elementValue={props.bookDetail.totalSupply}
      />
      <LicenseElement
        elementTitle="Income Percentage"
        elementValue={props.bookDetail.incomePercentage}
      />
      <LicenseElement
        elementTitle="IPFS Url"
        isUrl={true}
        elementValue={bookDetail.fileUrl}
      />

      {!props.status ? (
        <div className="approve-reject-container">
          <button className="approve-button" onClick={() => approve?.()}>
            Approve
          </button>
          <button className="reject-button" onClick={() => reject?.()}>
            Reject
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default LicenseDetail;
