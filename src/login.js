import React, { useEffect, useState } from "react";
import { ReactDOM } from "react-dom";
import PageChange from "./pageChange";
import { useConnect, useAccount, useContractRead } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Navigate } from "react-router-dom";
import aggrementABI from "./abi/Aggrement.json";

const routeMap = { 0: "/platform", 1: "/publisher", 2: "/user" };
function Login() {
  const { address, isConnected } = useAccount();
  const [dataVal, setdataVal] = useState(-1);

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const { data, isError, isLoading, isFetched } = useContractRead({
    address: process.env.REACT_APP_AGGREMENT_CONTRACT_ADDRESS,
    abi: aggrementABI,
    functionName: "getUserStatus",
    overrides: { from: address },
    enabled: !!address,
    onSettled(data, error) {
      setdataVal(data);
      console.log("data", data);
    },
  });

  return (
    <>
      {isConnected && dataVal in routeMap && (
        <Navigate to={routeMap[dataVal]} replace />
      )}
      {!isConnected && (
        <div>
          <div className="login-container">
            <div className="login-title">
              Welcome to the Decentralized Layer{" "}
            </div>
            <div className="metamask-box">
              <button
                onClick={() => {
                  connect();
                }}
              >
                <div></div>
                Login With Metamask
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
