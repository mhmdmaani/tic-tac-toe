import express from 'express';
import { authenticateJWT } from '../middleware/auth.middleware.js';
import { GameService } from '../services/Game.service.js';
import { UserStats } from '../services/Stats.service.js';

const router = express.Router();

router.get('/', authenticateJWT, async (req, res) => {
  try {
    const data = await UserStats.getUserStats(req.auth.id);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
