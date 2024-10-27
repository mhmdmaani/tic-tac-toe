import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import AuthRoutes from './controllers/auth.controller.js';
import GameRoutes from './controllers/game.controller.js';
import StatsRoutes from './controllers/stats.controller.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', AuthRoutes);

app.use('/game', GameRoutes);

app.use('/stats', StatsRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
