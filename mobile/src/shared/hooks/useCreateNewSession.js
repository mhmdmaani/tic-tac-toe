import { GameSession } from '../api/GameSession';
import { useState } from 'react';

export const useCreateNewSession = ({
  onSuccess = () => {},
  onError = () => {},
}) => {
  const [openForm, setOpenForm] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState('x');

  const onStartGame = async () => {
    const data = await GameSession.createGameSession({
      startWithPlayer: selectedPlayer === 'x',
    });
    if (data.error) {
      onError(data.error);
      return;
    }
    onSuccess(data);
  };
  return {
    openForm,
    setOpenForm,
    selectedPlayer,
    setSelectedPlayer,
    onStartGame,
  };
};
