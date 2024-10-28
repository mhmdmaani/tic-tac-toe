import React from 'react';
import { useEffect } from 'react';
import { GameSession } from '../api/GameSession';
export const useGame = (id) => {
  const [status, setStatus] = React.useState('');
  const [board, setBoard] = React.useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [isDone, setIsDone] = React.useState(false);

  useEffect(() => {
    const fetchGame = async () => {
      const result = await GameSession.getGameSession({ sessionId: id });
      if (result) {
        if (result.status !== 'ongoing') {
          setStatus(result.status);
          setIsDone(true);
          return;
        }
        if (result.currentPlayer === 'o') {
          // pc will make a move
          const afterPcMove = await GameSession.pcMove({
            board: JSON.parse(result.board),
            sessionId: id,
          });
          setBoard(afterPcMove.board);
          setStatus(afterPcMove.status);
        } else {
          setBoard(JSON.parse(result.board));
        }
      }
    };
    fetchGame();
  }, [id]);

  const handleCellClick = async (rowIndex, colIndex) => {
    // If the cell is already filled, do nothing
    if (board[rowIndex][colIndex] !== 0) {
      return;
    }

    // Update the board with the current player's move
    const updatedBoard = board.map((row, rIndex) =>
      row.map((cell, cIndex) =>
        rIndex === rowIndex && cIndex === colIndex ? -1 : cell
      )
    );
    setBoard(updatedBoard);

    const afterPlayer = await GameSession.playerMove({
      board: updatedBoard,
      sessionId: id,
    });
    setStatus(afterPlayer.status);
    if (afterPlayer.status === 'ongoing') {
      const afterPcMove = await GameSession.pcMove({
        board: updatedBoard,
        sessionId: id,
      });

      const checkStatus = await GameSession.checkBoard({
        board: afterPcMove.board,
      });
      setBoard(afterPcMove.board);
      if (checkStatus.status !== 'ongoing') {
        setStatus(checkStatus.status);
        setIsDone(true);
        return;
      }
    } else {
      setIsDone(true);
    }
  };
  return {
    status,
    board,
    isDone,
    handleCellClick,
  };
};
