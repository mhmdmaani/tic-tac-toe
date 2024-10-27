import axios from 'axios';

export class ExternalService {
  static async makeMove(data) {
    try {
      const result = await axios.post(
        `${process.env.PYTHON_API_URL}/make_move`,
        data
      );
      console.log('result in make move', result);
      return result.data;
    } catch (error) {
      throw new Error('Error making move');
    }
  }

  static async checkGameStatus(data) {
    console.log('data in check game status', data);
    try {
      const result = await axios.post(
        `${process.env.PYTHON_API_URL}/check_game_state`,
        {
          board: data.board,
          current_player: 'x',
        }
      );
      return result.data;
    } catch (error) {
      throw new Error('Error checking game status');
    }
  }
}
