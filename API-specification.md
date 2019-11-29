# API specification

> All failed requests should return `{ message: string }` indicating what went wrong.

## GET: `/projects/`

**Output:** `[{ name: string }]`

Retrieves the list of created projects. Returns an empty list if there're no projects.

## POST: `/projects/`

**Input:** `{ name: string }`

Creates a new project with name `name`. `name` should match `/^[\w\-]+$/`.

## GET: `/project/<name>/`

**Output:** `{ name: string, tasks: [{ name: string, timeSpent: int(milliseconds) }] }`

Retrieves the project info and tasks.

## POST: `/project/<projectName>/`

**Input:** `{ name: string, timeSpent: int }`

Creates a task named `name` in project `<projectName>`. `name` should match `/^[\w\-]+$/`.
