import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Site/Home.js";
import Header from "./Site/Header.js";
import Footer from "./Site/Footer.js";
import NotFound from "./Site/NotFound.js";
import ListProjects from "./Projects/ListProjects.js";
import CreateProject from "./Projects/CreateProject.js";
import ShowProject from "./Projects/ShowProject.js";
import EditProject from "./Projects/EditProject.js";
import CreateTask from "./Tasks/CreateTask";
import EditTask from "./Tasks/EditTask";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="content">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/projects/" component={ListProjects} />
          <Route exact path="/projects/create/" component={CreateProject} />
          <Route exact path="/project/:name/" component={ShowProject} />
          <Route exact path="/project/:name/edit/" component={EditProject} />
          <Route exact path="/project/:name/create/" component={CreateTask} />
          <Route exact path="/project/:name/task/:task/" component={EditTask} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
