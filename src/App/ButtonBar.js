import React from "react";
import ImportTasks from "./ImportTasks";
import ExportTasks from "./ExportTasks";

function ButtonBar({ tasks, updateTasks, setErrorMessage }) {
  return (
    <div className="button-bar task">
      <ImportTasks
        updateTasks={updateTasks}
        setErrorMessage={setErrorMessage}
      />
      <ExportTasks tasks={tasks} />
    </div>
  );
}

export default ButtonBar;
