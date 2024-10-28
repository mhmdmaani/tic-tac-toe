import { axiosInstance } from './config';

export class GameSession {
  static async createGameSession({ startWithPlayer }) {
    const { data } = await axiosInstance.post('/game/create_game_session', {
      startWithPlayer,
    });
    return data;
  }

  static async pcMove({ board, sessionId }) {
    const { data } = await axiosInstance.post('/game/pc_move', {
      board,
      sessionId,
    });
    return data;
  }

  static async playerMove({ board, sessionId }) {
    const { data } = await axiosInstance.post('/game/player_move', {
      board,
      sessionId,
    });
    return data;
  }

  static async getGameSession({ sessionId }) {
    const { data } = await axiosInstance.get('/game', {
      params: {
        sessionId,
      },
    });
    return data;
  }

  static async checkBoard({ board }) {
    const { data } = await axiosInstance.get('/game/check_board', {
      params: {
        board,
      },
    });
    return data;
  }
}
