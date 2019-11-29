import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API, { errorHandler } from "../API";

function ListProjects() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    axios
      .get(`${API}/projects/`)
      .then(resp => {
        setProjects(resp.data);
      })
      .catch(errorHandler("update project list"));
  }, []);

  return (
    <>
      <h1>My projects</h1>
      {projects && projects.length === 0 ? (
        <div className="no-projects">You have no projects.</div>
      ) : (
        ""
      )}
      <ul className="projects-list">
        {projects ? (
          projects.map(project => (
            <li key={project.name}>
              <Link to={`/project/${project.name}`}>{project.name}</Link>
            </li>
          ))
        ) : (
          <li className="loading">Loading...</li>
        )}
      </ul>
      <Link to="/projects/create" className="blue">
        Create project.
      </Link>
    </>
  );
}

export default ListProjects;
