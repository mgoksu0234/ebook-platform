import React, { useState, useEffect } from "react";
import { ReactDOM } from "react-dom";
import TotalInfo from "./components/publisherTotalInfo";
import LicenseModeration from "./components/licenseModeration";
import { useConnect, useAccount, useContractRead } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import aggrementABI from "./abi/Aggrement.json";
import PublisherBox from "./components/publisher-box";
import {
  prepareBookData,
  preparePublisherData,
  getTotalGenerated,
  getTotalMint,
  getTotalApproved,
} from "./components/prepareData";
import "./App.css";

function Platform() {
  const [totalGen, settotalGen] = useState(0);
  const [totalMint, settotalMint] = useState(0);
  const [totalIssued, settotalIssued] = useState(0);

  const { data, isError, isLoading, isFetched } = useContractRead({
    address: process.env.REACT_APP_AGGREMENT_CONTRACT_ADDRESS,
    abi: aggrementABI,
    functionName: "getAllBooks",
  });
  //Getting All the books and seperate to current publisher
  const allBooks = prepareBookData(data);

  const { data: publisherData } = useContractRead({
    address: process.env.REACT_APP_AGGREMENT_CONTRACT_ADDRESS,
    abi: aggrementABI,
    functionName: "getAllPublishers",
  });
  //Getting All Publishers
  const allPublishers = preparePublisherData(publisherData);

  useEffect(() => {
    //Total Generated Book
    const totalGenenrated = getTotalGenerated(allBooks);
    settotalGen(totalGenenrated);
    //Total Read Book
    const totalMint = getTotalMint(allBooks);
    settotalMint(totalMint);
    //Total Issued Books
    const totalIssued = getTotalApproved(allBooks);
    settotalIssued(totalIssued);
  }, []);

  return (
    <div>
      <TotalInfo
        totalGenerated={totalGen}
        totalRead={totalMint}
        totalLicense={totalIssued}
      />
      <LicenseModeration books={allBooks} />
      <PublisherBox publishers={allPublishers} />
    </div>
  );
}
export default Platform;
