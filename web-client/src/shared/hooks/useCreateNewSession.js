import { useNavigate } from 'react-router-dom';
import { GameSession } from '../api/GameSession';
import { useState } from 'react';

export const useCreateNewSession = () => {
  const [openForm, setOpenForm] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState('x');
  const navigate = useNavigate();

  const onStartGame = async () => {
    const data = await GameSession.createGameSession({
      startWithPlayer: selectedPlayer === 'x',
    });
    navigate(`/play/${data.id}`);
  };
  return {
    openForm,
    setOpenForm,
    selectedPlayer,
    setSelectedPlayer,
    onStartGame,
  };
};
