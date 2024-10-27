import express from 'express';
import { authenticateJWT } from '../middleware/auth.middleware.js';
import { GameService } from '../services/Game.service.js';

const router = express.Router();

router.post('/pc_move', authenticateJWT, async (req, res) => {
  console.log(req.auth);

  try {
    const { board, sessionId } = req.body;
    const data = await GameService.pcMove(board, req.auth.id, sessionId);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/player_move', authenticateJWT, async (req, res) => {
  try {
    const { board, sessionId } = req.body;
    const data = await GameService.playerMove(board, sessionId, req.auth.id);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/create_game_session', authenticateJWT, async (req, res) => {
  try {
    const { startWithPlayer } = req.body;
    const data = await GameService.createGameSession(
      req.auth.id,
      startWithPlayer
    );
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', authenticateJWT, async (req, res) => {
  try {
    // get query params
    const { sessionId } = req.query;
    const data = await GameService.getGameSession(sessionId);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
export default router;
