# Multi-Service Tic-Tac-Toe Project

This repository contains multiple services for a tic-tac-toe project including:

- `api`: A Node.js Express server using Prisma and a local database.
- `tic-tac-toe-engine`: A FastAPI-based game engine for tic-tac-toe logic.
- `mobile`: A React Native (Expo) mobile application.
- `web-client`: A React (Vite) web application.

## Prerequisites

Before running the project locally, ensure you have the following installed:

- Node.js (>= 16.x)
- Python (>= 3.8)
- Docker (optional for local DB)
- npm
- Expo CLI
- FastAPI

## Environment Setup

1. Clone the repository:

```
 git clone https://github.com/mhmdmaani/tic-tac-toe
 cd tic-tac-toe
```

2. Create an `.env` file in the `api` folder, based on `.env.example`:

```
 cp api/.env.example api/.env
```

Update the `.env` file with your local configurations.

## Running Locally

### 1. API (Node.js Express with Prisma)

1. Install dependencies:

```
 cd api
 npm install
```

2. Migrate the Prisma schema to the local database:

```
 npx prisma migrate dev
```

3. Start the API:
   ```
   npm start
   ```

The API should be running at `http://localhost:8080`.

### 2. Tic-Tac-Toe Engine (FastAPI)

1. Install dependencies:

```
 cd tic-tac-toe-engine
 pip install -r requirements.txt
```

2. Start the FastAPI server:

```
 uvicorn main:app --reload
```

The FastAPI engine should be running at `http://localhost:8000`.

### 3. Mobile (React Native Expo)

1. Install dependencies:

```
 cd mobile
 npm install
```

2. Start the Expo development server:

```
 npm start
```

3. Follow the instructions in the terminal to open the app in the Expo Go app on your mobile device or simulator.

### 4. Web Client (React Vite)

1. Install dependencies:

```
 cd web-client
 npm install
```

2. Start the development server:

```
 npm run dev
```

The web client should be running at `http://localhost:5173`.

``
![shot](/assets/12.png)

![shot](/assets/13.png)

![shot](/assets/shot1.png)

![shot](/assets/shot2.png)

![shot](/assets/shot3.png)

![shot](/assets/shot4.png)

![shot](/assets/shot5.png)

![shot](/assets/shot6.png)

![shot](/assets/shot7.png)

![shot](/assets/shot8.png)

![shot](/assets/shot9.png)

![shot](/assets/shot10.png)

![shot](/assets/shot11.png)
