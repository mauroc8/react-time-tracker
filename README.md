# React Time Tracker

A minimal time-tracking web app. Made to learn [react hooks](https://reactjs.org/docs/hooks-intro.html).
It features:

- Create, delete and edit _tasks_ (associated with a project).
- Record time spent working on a task.
- Filter tasks by project.

## Run

1. `npm install`
2. `npm start`

The site uses a mocked API which basically saves everything to localStorage.

To make a real API for this app, please read the [API specification](API-specification.md). Then run with an enviroment variable:

- Linux: `REACT_APP_API="https://my-real-api.com" npm start`
- Windows (powershell): `$env:REACT_APP_API="https://my-real-api.com"` and `npm start`
