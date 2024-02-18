import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import bookABI from "../abi/Book.json";
import { getBookDetail } from "./prepareData";
import { useContractRead } from "wagmi";
function TopBooksCard(props) {
  const [bookName, setBookName] = useState("");
  const { data, isError, isLoading, isFetched } = useContractRead({
    address: props.title,
    abi: bookABI,
    functionName: "getFileUrl",
  });

  useEffect(() => {
    getBookDetail(data).then((e) => {
      if (e == undefined) {
        setBookName("");
      } else {
        setBookName(e.name);
      }
    });
  }, [data]);
  return (
    <div className="card-wrapper">
      <div className="book-title-column">
        <div className="book-title-text">{bookName}</div>
        <div className="view-license-text">View License</div>
      </div>
      <div className="detail-column">
        <div className="total-title">Total Read</div>
        <div className="total-value">
          <CountUp start={0} end={props.totalRead} duration={1.75} />
        </div>
        <div className="total-title">Total Generated</div>
        <div className="total-value">
          <CountUp start={0} end={props.totalGenerated} duration={1.75} />
        </div>
      </div>
    </div>
  );
}

export default TopBooksCard;
