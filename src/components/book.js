import React, { useEffect, useState } from "react";
import { useContractRead, useAccount } from "wagmi";
import { ethers } from "ethers";
import bookABI from "../abi/Book.json";
import aggrementABI from "../abi/Aggrement.json";
import { getBookDetail } from "./prepareData";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

function Book(props) {
  const { address } = useAccount();
  const [hover, setHover] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [bookDetail, setBookDetail] = useState({
    name: "",
    publisher: "",
    fileUrl: "",
  });

  const { data: balanceOf } = useContractRead({
    address: props.bookDetail.nft,
    abi: bookABI,
    functionName: "balanceOf",
    args: [address],
  });
  const { data, isError, isLoading, isFetched } = useContractRead({
    address: props.bookDetail.nft,
    abi: bookABI,
    functionName: "getFileUrl",
  });

  useEffect(() => {
    const isEqual = balanceOf > 0;
    if ((props.library && isEqual) || (!props.library && !isEqual)) {
      getBookDetail(data).then((e) => {
        setBookDetail({
          name: e.name,
          publisher: e.publisher,
          fileUrl: e.fileUrl,
        });
      });
      setRendering(true);
    } else {
      setRendering(false);
    }
  }, [balanceOf, address, props.library]);

  console.log(ethers.utils.parseEther("0.1").toString());

  const { config } = usePrepareContractWrite({
    address: process.env.REACT_APP_AGGREMENT_CONTRACT_ADDRESS,
    abi: aggrementABI,
    functionName: "buyBook",
    args: [props.bookDetail.nft],
    overrides: {
      from: address,
      value: ethers.utils.parseEther("0.1"),
    },
  });
  const { isSuccess, write, status } = useContractWrite(config);

  const handleRead = () => {
    window.open(bookDetail.fileUrl, "_blank");
  };

  const Hovering = ({ hoverBoolean }) => {
    if (hoverBoolean) {
      if (props.library) {
        return (
          <div className="buy-book-container buy-book-container-active">
            <button
              className="buy-button buy-button-active"
              onClick={handleRead}
            >
              Read Book
            </button>
          </div>
        );
      } else {
        return (
          <div className="buy-book-container buy-book-container-active">
            <button
              className="buy-button buy-button-active"
              onClick={() => write?.()}
            >
              Buy Book
            </button>
          </div>
        );
      }
    } else {
    }
  };
  return (
    <>
      {rendering && (
        <div
          className="book"
          onMouseOver={() => {
            setHover(true);
          }}
          onMouseOut={() => {
            setHover(false);
          }}
        >
          <div className={`book-name`}>{bookDetail.name}</div>
          <Hovering hoverBoolean={hover} />
        </div>
      )}
    </>
  );
}
export default Book;
