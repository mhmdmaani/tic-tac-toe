import styled from 'styled-components';
import { MdDarkMode } from 'react-icons/md';
import { MdLightMode } from 'react-icons/md';
import { toggleTheme } from '../../shared';
import { useDispatch, useSelector } from 'react-redux';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.bg.main};
  color: ${({ theme }) => theme.colors.text};
`;

const GreetingText = styled.div`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text.main};
`;
const ToggleThemeButton = styled.button`
  border: none;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.main};
`;

export default function HomeHeader() {
  const user = useSelector((state) => state.auth.user);
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };
  return (
    <Container>
      <GreetingText>Welcome, {user?.name}</GreetingText>
      <ToggleThemeButton onClick={handleToggle}>
        {currentTheme === 'light' ? (
          <MdDarkMode size={30} />
        ) : (
          <MdLightMode size={30} />
        )}
      </ToggleThemeButton>
    </Container>
  );
}
