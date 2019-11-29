import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import API, { errorHandler } from "../API";

export function formatProjectName(name) {
  return name.replace(/[^\w-]/gi, "-");
}

// Component transitions
const NONE = 0;
const LOADING = 1;
const REDIRECTING = 2;
const UNMOUNTING = 3;

function CreateProject() {
  const [projectName, setProjectName] = useState("");
  const [transition, setTransition] = useState(NONE);

  useEffect(() => {
    return () => setTransition(UNMOUNTING);
  }, []);

  function createProject(event) {
    event.preventDefault();
    setTransition(LOADING);

    const name = formatProjectName(projectName);

    axios
      .post(`${API}/projects/`, { name })
      .then(resp => {
        if (transition !== UNMOUNTING) {
          setTransition(REDIRECTING);
        }
      })
      .catch(err => {
        errorHandler("create project")(err);
        if (transition !== UNMOUNTING) {
          // Unset the LOADING transition
          setTransition(NONE);
        }
      });
  }

  if (transition === REDIRECTING) {
    return <Redirect to="/projects/" />;
  }

  return (
    <form onSubmit={createProject}>
      <h1>Create project</h1>
      <div>
        <label htmlFor="project-name">Project name:</label>
      </div>
      <div>
        <input
          type="text"
          id="project-name"
          value={projectName}
          onChange={evt => setProjectName(formatProjectName(evt.target.value))}
        />
      </div>
      <div>
        <input
          type="submit"
          value={transition === LOADING ? "..." : "Create"}
          disabled={transition === LOADING || projectName.length === 0}
        />
      </div>
      <div>
        <Link to="/projects/" className="blue">
          Return to projects
        </Link>
      </div>
    </form>
  );
}

export default CreateProject;
