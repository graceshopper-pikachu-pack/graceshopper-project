import React from "react";
import { Link } from "react-router-dom";

const NotFound = (props) => {
  return (
    <div className="not-found">
      <h1 className="helper-message">404 - Not Found!</h1>
      <Link className="link" to="/">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
