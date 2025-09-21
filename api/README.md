# Attendance API Backend

A simple Express.js REST API for attendance management. Deployable to Render or any Node.js hosting platform.

## Endpoints
- `GET /attendance?classId=...&date=...` — Get attendance entries for a class and date
- `POST /attendance` — Create a new attendance entry
- `PUT /attendance/:id` — Edit an attendance entry
- `GET /attendance/report?classId=...` — Get attendance report for a class

## Usage
1. Run `npm install` in the `api` folder
2. Start the server with `npm start`
3. Deploy to Render by connecting this folder to a new web service

## Notes
- Data is stored in-memory for demo purposes. Use a database for production.
- Update the Angular frontend API URL to match your Render deployment.
