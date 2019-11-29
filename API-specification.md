# API specification

## GET: `/projects/`

**Output:** `[{ name: string }]`

Retrieves the list of created projects. Returns an empty list if there're no projects.

## POST: `/projects/`

**Input:** `{ name: string }`

Creates a new project with name `name`. `name` should match `/^[\w\-]+$/`.

Returns 403 if the project already exists.

## GET: `/project/<name>/`

**Output:** `{ name: string, tasks: [{ name: string, timeSpent: int(milliseconds) }] }`

Retrieves the project info and tasks.
