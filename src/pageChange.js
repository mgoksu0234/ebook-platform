import React from "react";
import { ReactDOM } from "react-dom";
import { Link } from "react-router-dom";

function PageChange() {
  return (
    <div>
      <div className="page-routes">
        <Link to="/login">Login</Link>
      </div>
      <div className="page-routes">
        <Link to="/publisher">Publisher</Link>
      </div>
      <div className="page-routes">
        <Link to="/user">User</Link>
      </div>
      <div className="page-routes">
        <Link to="/platform">Platform</Link>
      </div>
    </div>
  );
}

export default PageChange;
