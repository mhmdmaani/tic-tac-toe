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
   \`\`\`bash
   git clone https://github.com/your-repo.git
   cd your-repo
   \`\`\`

2. Create an \`.env\` file in the \`api\` folder, based on \`.env.example\`:
   \`\`\`bash
   cp api/.env.example api/.env
   \`\`\`

   Update the \`.env\` file with your local configurations.

## Running Locally

### 1. API (Node.js Express with Prisma)

1. Install dependencies:
   \`\`\`bash
   cd api
   npm install
   \`\`\`

2. Migrate the Prisma schema to the local database:
   \`\`\`bash
   npx prisma migrate dev
   \`\`\`

3. Start the API:
   \`\`\`bash
   npm start
   \`\`\`

The API should be running at \`http://localhost:8080\`.

### 2. Tic-Tac-Toe Engine (FastAPI)

1. Install dependencies:
   \`\`\`bash
   cd tic-tac-toe-engine
   pip install -r requirements.txt
   \`\`\`

2. Start the FastAPI server:
   \`\`\`bash
   uvicorn main:app --reload
   \`\`\`

The FastAPI engine should be running at \`http://localhost:8000\`.

### 3. Mobile (React Native Expo)

1. Install dependencies:
   \`\`\`bash
   cd mobile
   npm install
   \`\`\`

2. Start the Expo development server:
   \`\`\`bash
   npm start
   \`\`\`

3. Follow the instructions in the terminal to open the app in the Expo Go app on your mobile device or simulator.

### 4. Web Client (React Vite)

1. Install dependencies:
   \`\`\`bash
   cd web-client
   npm install
   \`\`\`

2. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

The web client should be running at \`http://localhost:5173\`.
