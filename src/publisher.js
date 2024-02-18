import React, { useState, useEffect } from "react";
import TotalInfo from "./components/publisherTotalInfo";
import TopBooksInfo from "./components/publisherTopBooksInfo";
import OfferLicense from "./components/publisherOfferLicense";
import { useConnect, useAccount, useContractRead } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import aggrementABI from "./abi/Aggrement.json";
import {
  prepareBookData,
  getPublisherBooks,
  getTotalGenerated,
  getTotalMint,
  getTotalApproved,
  sortAndReturnTopThree,
  getPublisherName,
} from "./components/prepareData";
import "./App.css";

function Publisher() {
  const { address } = useAccount();

  const [totalGenPublisher, settotalGenPublisher] = useState(0);
  const [totalMintPublisher, settotalMintPublisher] = useState(0);
  const [totalIssuedPublisher, settotalIssuedPublisher] = useState(0);
  const [topThreeBooks, setTopThreeBooks] = useState("");
  const [publisherName, setPublisherName] = useState("");

  const { data, isError, isLoading, isFetched } = useContractRead({
    address: process.env.REACT_APP_AGGREMENT_CONTRACT_ADDRESS,
    abi: aggrementABI,
    functionName: "getAllBooks",
  });

  const { data: publisherData } = useContractRead({
    address: process.env.REACT_APP_AGGREMENT_CONTRACT_ADDRESS,
    abi: aggrementABI,
    functionName: "getAllPublishers",
  });
  //Getting All the books and seperate to current publisher

  useEffect(() => {
    const allBooks = prepareBookData(data);
    const publisherBooks = getPublisherBooks(allBooks, address);

    const pubName = getPublisherName(publisherData, address);
    setPublisherName(pubName);
    //Total Generated Book For current Publisher
    const totalGenenrated = getTotalGenerated(publisherBooks);
    settotalGenPublisher(totalGenenrated);
    //Total Read Book For current Publisher
    const totalMint = getTotalMint(publisherBooks);
    settotalMintPublisher(totalMint);
    //Total Issued Books For current Publisher
    const totalIssued = getTotalApproved(publisherBooks);
    settotalIssuedPublisher(totalIssued);
    //Top 3 Books For current Publisher
    const topThree = sortAndReturnTopThree(publisherBooks, "mintCount");
    setTopThreeBooks(topThree);
  }, []);

  return (
    <div>
      <div className="publisher-name">{publisherName}</div>
      <TotalInfo
        totalGenerated={totalGenPublisher}
        totalRead={totalMintPublisher}
        totalLicense={totalIssuedPublisher}
      />
      <div className="top-read-text">Top Book That Are Read</div>
      <TopBooksInfo topBooks={topThreeBooks} />
      <OfferLicense />
    </div>
  );
}
export default Publisher;
