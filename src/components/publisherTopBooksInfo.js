import React from "react";
import TopBooksCard from "./publisherTopBooksCard";

function TopBooksInfo(props) {
  if (props.topBooks.length == 0) {
    return <TopBooksCard title={""} totalRead={0} totalGenerated={0} />;
  }
  return (
    <div className="top-books-wrapper">
      {props.topBooks.map((book) => {
        return (
          <TopBooksCard
            title={book.nft}
            totalRead={book.mintCount}
            totalGenerated={book.totalSupply}
          />
        );
      })}
    </div>
  );
}

export default TopBooksInfo;
