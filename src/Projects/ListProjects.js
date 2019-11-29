import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProjects } from "./Projects.ducks";
import { Link } from "react-router-dom";

function ListProjects() {
  const projects = useSelector(state => state.projects.all);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateProjects());
  }, [dispatch]);

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
