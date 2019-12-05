import React, { useState, useEffect } from "react";

function LocalStorageNotice() {
  const [isUnderstood, setIsUnderstood] = useState(
    Boolean(localStorage.getItem("understood-local-storage-notice"))
  );

  useEffect(() => {
    if (isUnderstood) {
      localStorage.setItem("understood-local-storage-notice", "1");
    }
  }, [isUnderstood]);

  if (process.env.REACT_APP_API !== undefined) {
    // If we use a real API, don't show this notice.
    return <></>;
  }

  if (isUnderstood) {
    return <></>;
  }

  return (
    <div className="local-storage-notice">
      <div>
        This site uses both <b>cookies</b> and <b>localStorage</b> to store your
        user data (it should be safe unless you decide to clear your cache). Any
        data you provide is saved on your current browser and device <i>only</i>
        . The server doesn't store any data whatsoever, so you're adviced to
        keep regular backups using the Export function.
      </div>
      <button onClick={() => setIsUnderstood(true)}>I understand</button>
    </div>
  );
}

export default LocalStorageNotice;
