# CIT LoL Tournament

A tournament management website for UNO-R College of Information Technology League of Legends esports events.

## Overview

This project provides a simple web application for managing teams, match schedules, standings, and admin actions for a college LoL tournament.

## Features

- Team registration and team detail pages
- Match schedule and results tracking
- Tournament standings and bracket display
- Admin login and protected team updates
- Local JSON storage with default sample data

## Tech stack

- Node.js + Express
- CORS
- Static front-end served from `public/`
- JSON data stored in `data/tournament.json`

## Install

```powershell
npm install
```

## Run

```powershell
npm start
```

Then open: `http://localhost:3000`

## Project structure

- `server.js` — Express server and API routes
- `package.json` — project metadata and scripts
- `public/` — client-side pages and assets
- `data/` — JSON storage for tournament data, admins, and logs

## Notes

- Default admin credentials are `admin` / `admin`
- The server initializes `data/tournament.json` with sample teams and matches if the file does not exist
- Use the admin panel to add or update teams and records

