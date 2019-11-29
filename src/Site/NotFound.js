import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <h1>Woops!</h1>
      <p>The page you were looking is not here (404).</p>
      <Link to="/">Go back.</Link>
    </>
  );
}

export default NotFound;
