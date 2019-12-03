# API specification

This file is intended as a reference for someone who wants to create a backend for this app.

To run the app with a backend, use:

- Linux: `REACT_APP_API="https://my-real-api.com" npm start`
- Windows (powershell): `$env:REACT_APP_API="https://my-real-api.com"` and `npm start`

The app will disable the mocked backend.

## Types

```js
TASK = { name: string, project: string, seconds: int, color: COLOR, last_modified: TIMESTAMP }
COLOR = any hex color using the format '#XXXXXX' (where X is an hex digit)
TIMESTAMP = unix timestamp
```

## Endpoints

### GET: `/tasks/`

**Output:** `[TASK]`. Gets all tasks.

### POST: `/tasks/`

**Input:** `TASK`. Creates a task.

Throws 403 if task already exists.

### PATCH: `/tasks/`

**Input:** `{ old_task: { name: string, project: string }, new_task: TASK }`. Replaces old task w/new one.

Throws 403 if the task doesn't exist.

### POST: `/delete-task/`

**Input:** `{ name: string, project: string }`. Deletes the task.

Throws 403 if the task doesn't exist.

> Note: We don't use a DELETE request because it ignores its body.

## Observations

- There can be two tasks with the same name, but in different projects. Two tasks are "the same" iff `taskA.name === taskB.name && taskA.project === taskB.project`.

- The back-end **shouldn't** change the `last_modified` field. The front-end takes care of that.

- The behaviour of the backend is mocked --using localStorage for persistence-- in [/src/mockAdapter.js](src/mockAdapter.js).
