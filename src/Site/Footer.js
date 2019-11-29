import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div>
        This app uses localStorage. All the information is saved in your
        browser.
      </div>
      <br />
      <div>
        (c) Mauro Cano.
        <br />
        Made with React.
        <br />
        <a href="https://github.com/mauroc8/react-time-tracker">View source.</a>
      </div>
    </footer>
  );
}

export default Footer;
