import React from "react";
import axios from "axios";
import API_URL from "../API_URL";

function Import({ updateTasks, setErrorMessage }) {
  function importTasks() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.click();

    input.addEventListener("change", readFile);

    function readFile() {
      if (input.files.length) {
        const reader = new FileReader();
        const file = input.files[0];
        reader.readAsText(file);
        reader.addEventListener("load", processFile);
      }
    }

    function processFile(event) {
      const file = event.target.result;

      if (!file || !file.length) return;

      let newTasks;
      try {
        newTasks = JSON.parse(file);
      } catch (error) {
        setErrorMessage("The file is invalid or corrupted.");
        return;
      }

      axios
        .post(`${API_URL}/import-tasks/`, newTasks)
        .then(result => {
          updateTasks();
        })
        .catch(err => {
          if (err.response) {
            setErrorMessage("There was an error importing tasks.");
          } else {
            setErrorMessage("There was an error connecting to the server.");
          }
        });
    }
  }

  return (
    <button className="import-tasks" onClick={importTasks}>
      Import
    </button>
  );
}

export default Import;
