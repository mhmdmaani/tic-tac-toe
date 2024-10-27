import styled from 'styled-components';
import { PrimaryButton } from '../../components/buttons';
import Modal from '../../components/Modal';
import { RiCloseLargeLine } from 'react-icons/ri';
import { FaRegCircle } from 'react-icons/fa';
import { useCreateNewSession } from '../../shared';

const Container = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const Label = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
`;
const ChooseContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;
const SelectItem = styled.div`
  padding: 20px;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid
    ${({ theme, selected }) =>
      selected ? theme.colors.primary.main : theme.colors.grey.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 120px;
`;

const ItemText = styled.span`
  font-size: 14px;
`;
export default function StartNewButton() {
  const {
    openForm,
    setOpenForm,
    selectedPlayer,
    setSelectedPlayer,
    onStartGame,
  } = useCreateNewSession();
  return (
    <Container>
      <PrimaryButton onClick={() => setOpenForm(true)}>
        Start New Game
      </PrimaryButton>
      <Modal isOpen={openForm} onClose={() => setOpenForm(false)}>
        <Label>Who will Start The Game?</Label>
        <ChooseContainer>
          <SelectItem
            onClick={() => setSelectedPlayer('x')}
            selected={selectedPlayer === 'x'}
          >
            <RiCloseLargeLine size={50} />
            <ItemText>You </ItemText>
          </SelectItem>

          <SelectItem
            onClick={() => setSelectedPlayer('o')}
            selected={selectedPlayer === 'o'}
          >
            <FaRegCircle size={50} />
            <ItemText>Computer</ItemText>
          </SelectItem>
        </ChooseContainer>
        <PrimaryButton
          style={{
            width: '100%',
          }}
          onClick={onStartGame}
        >
          Start Game
        </PrimaryButton>
      </Modal>
    </Container>
  );
}
