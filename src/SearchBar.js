import React, { useEffect, useRef } from "react";

const _fromEvent = setter => evt => setter(evt.target.value);

function SearchBar({ searchQuery, setSearchQuery }) {
  const inputRef = useRef(null);

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

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={_fromEvent(setSearchQuery)}
        ref={inputRef}
      />
    </div>
  );
}

export default SearchBar;
