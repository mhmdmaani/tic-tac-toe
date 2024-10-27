import styled from 'styled-components';
import { Card, CenteredPageContainer } from '../../components/containers';
import { AiOutlineClose } from 'react-icons/ai';
import { FaRegCircle } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useGame } from '@tic-tac/shared';
import { FaRegFaceGrinStars } from 'react-icons/fa6';
import { FaRegFaceFrown } from 'react-icons/fa6';
import { FaRegFaceMeh } from 'react-icons/fa6';
import { Title } from '../../components/Typography';
import { PrimaryButton } from '../../components/buttons';
import Modal from '../../components/Modal';

const Container = styled.div``;

const GameBoard = styled(Card)`
  max-width: 800px;
  max-height: 800px;
  width: 50vw;
  height: 50vw;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
`;

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  border: 1px solid ${({ theme }) => theme.colors.grey.border};
  cursor: pointer;
  user-select: none;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ModalText = styled(Title)`
  text-align: center;
`;
function Game() {
  const { id } = useParams();
  const { status, board, isDone, handleCellClick } = useGame(id);
  const navigate = useNavigate();

  return (
    <>
      <CenteredPageContainer>
        <Container>
          <GameBoard>
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <Cell
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cell === 0 ? (
                    ''
                  ) : cell === -1 ? (
                    <AiOutlineClose />
                  ) : (
                    <FaRegCircle />
                  )}
                </Cell>
              ))
            )}
          </GameBoard>
        </Container>
        <Modal isOpen={isDone}>
          <IconContainer>
            {status === 'x wins' ? (
              <FaRegFaceGrinStars />
            ) : status === 'o wins' ? (
              <FaRegFaceFrown />
            ) : (
              <FaRegFaceMeh />
            )}
          </IconContainer>
          <ModalText>
            {status === 'x wins'
              ? 'Congratulations! You won!'
              : status === 'o wins'
              ? 'You lost!'
              : "It's a draw!"}
          </ModalText>
          <PrimaryButton
            style={{
              width: '100%',
              marginTop: '30px',
            }}
            onClick={() => navigate('/home')}
          >
            Go to Home
          </PrimaryButton>
        </Modal>
      </CenteredPageContainer>
    </>
  );
}

export default Game;
