import React, { useState, useEffect } from "react";
import axios from "axios";
import API, { errorHandler } from "../API";
import { Link } from "react-router-dom";

function ShowProject(props) {
  const name = props.match.params.name;
  const [project, setProject] = useState(null);

  useEffect(() => {
    axios
      .get(`${API}/project/${name}/`)
      .then(resp => {
        setProject(resp.data);
      })
      .catch(errorHandler("load project"));
  }, [name]);

  if (project === null) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <h1>
        <span className="blue">{name}</span> tasks
      </h1>
      {project.tasks.length === 0 ? (
        <div>This project has no tasks yet.</div>
      ) : (
        ""
      )}
      <ul className="task-list">
        {project.tasks.map(task => (
          <li key={task.name}>
            <Link to={`/project/${name}/task/${task.name}/`}>{task.name}</Link>{" "}
            - {task.timeSpent}
          </li>
        ))}
      </ul>
      <div>
        <Link to={`/project/${name}/create/`}>Create task</Link>
      </div>
      <div>
        <Link to={`/project/${name}/edit/`}>Edit project</Link>
      </div>
      <div>
        <Link to="/projects/">Change project</Link>
      </div>
    </>
  );
}

export default ShowProject;
