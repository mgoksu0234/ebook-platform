import React, { useEffect, useState } from "react";
import { useContractRead, useAccount } from "wagmi";
import Book from "./components/book";
import aggrementABI from "./abi/Aggrement.json";
import {
  prepareBookData,
  getPublisherBooks,
  getTotalGenerated,
  getTotalMint,
  getApprovedBooks,
  sortAndReturnTopThree,
  getPublisherName,
} from "./components/prepareData";

function User() {
  const { address } = useAccount();
  //const [allBooks, setAllBooks] = useState("");

  const { data, isError, isLoading, isFetched } = useContractRead({
    address: process.env.REACT_APP_AGGREMENT_CONTRACT_ADDRESS,
    abi: aggrementABI,
    functionName: "getAllBooks",
  });
  const allBooks = prepareBookData(data);
  const approvedBooks = getApprovedBooks(allBooks);

  return (
    <div className="user-body">
      <div className="title-book-show">Top Rated Books</div>
      <div className="bookshelf">
        {approvedBooks.map((book) => {
          return <Book bookDetail={book} library={false} />;
        })}
      </div>
      <div className="title-book-show">Library</div>
      <div className="bookshelf">
        {approvedBooks.map((book) => {
          return <Book bookDetail={book} library={true} />;
        })}
      </div>
    </div>
  );
}
export default User;
