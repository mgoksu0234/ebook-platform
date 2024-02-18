import React from "react";
import PageChange from "./pageChange";
import Login from "./login";
import Platform from "./platform";
import Publisher from "./publisher";
import User from "./user";
import { Route, Routes } from "react-router-dom";
import client from "./wagmiCofig";
import "./App.css";
import { WagmiConfig, useAccount } from "wagmi";
import ProtectRoute from "./protectedRoute";

function App() {
  // console.log("ca", process.env.REACT_APP_AGGREMENT_CONTRACT_ADDRESS);

  return (
    <WagmiConfig client={client}>
      <div className="App">
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/"
            element={
              <ProtectRoute>
                <PageChange />
              </ProtectRoute>
            }
          />
          <Route
            exact
            path="/publisher"
            element={
              <ProtectRoute>
                <Publisher />
              </ProtectRoute>
            }
          />
          <Route
            exact
            path="/platform"
            element={
              <ProtectRoute>
                <Platform />
              </ProtectRoute>
            }
          />
          <Route
            exact
            path="/user"
            element={
              <ProtectRoute>
                <User />
              </ProtectRoute>
            }
          />
        </Routes>
      </div>
    </WagmiConfig>
  );
}

export default App;
