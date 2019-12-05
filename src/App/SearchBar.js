import React, { useEffect, useRef } from "react";

const _fromEvent = setter => evt => setter(evt.target.value);

function SearchBar({ searchQuery, setSearchQuery }) {
  const inputRef = useRef(null);

  // Use Escape key to clear and focus
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setSearchQuery("");
        if (inputRef) {
          inputRef.current.focus();
        }
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [setSearchQuery]);

  // Focus input when searchQuery changes
  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus();
    }
  }, [searchQuery]);

  return (
    <div className="search-bar">
      <img
        src={`${process.env.PUBLIC_URL}/baseline_search_black_18dp.png`}
        alt=""
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
      />
      <input
        type="text"
        value={searchQuery}
        onChange={_fromEvent(setSearchQuery)}
        ref={inputRef}
      />
      <img
        src={`${process.env.PUBLIC_URL}/baseline_close_black_18dp.png`}
        alt=""
        style={{ right: "2px" }}
        onClick={() => {
          setSearchQuery("");
        }}
      />
    </div>
  );
}

export default SearchBar;
