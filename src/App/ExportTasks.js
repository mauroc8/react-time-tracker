import React from "react";

function ExportTasks({ tasks }) {
  function exportTasks() {
    const a = document.createElement("a");
    a.setAttribute(
      "href",
      "data:text/plain;charset=utf-u," +
        encodeURIComponent(JSON.stringify(tasks))
    );
    a.setAttribute("download", "Tasks backup.json");
    a.click();
  }

  return (
    <button className="export-tasks" onClick={exportTasks}>
      Export
    </button>
  );
}

export default ExportTasks;
