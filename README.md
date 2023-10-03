## Walking Logger

A simple, locally hosted solution for tracking and viewing your walking stats. It uses express on the backend to interface with an sqlite3 database and handle RESTFUL api requests - and uses React on the frontend to view, add, and interact with the data.

## Requirements

- Docker Compose

## Quick Start

1. Clone the repo
   ```sh
   git clone https://github.com/csgomez/walking-logger.git
   ```
2. Go to the root of the project

   ```sh
   cd walking-logger
   ```

3. Run the app using docker compose
   ```sh
   docker compose up
   ```
4. Finally, use a browser to visit the app: http://localhost:3001

## Suggested Use

This app was written with the intention of having it run on a machine on your local home network _and_ without any malevolent actors intent on messing with your data. I would not suggest deploying this on the internet or somewhere within the reach of your nemesis.

## Walking Data

The walking stats are stored in an sqlite file within a docker volume. That means your data will remain safe in the case that the docker container, or the machine running the container, is stopped and restarted.

Eventually, the frontend will contain an option for exporting your data to a file in the case that you want to manually store snapshots of the data.
