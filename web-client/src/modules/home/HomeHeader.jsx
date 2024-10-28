import styled from 'styled-components';
import { MdDarkMode } from 'react-icons/md';
import { MdLightMode } from 'react-icons/md';
import { toggleTheme, logout } from '../../shared';
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
  cursor: pointer;
`;

const LogoutButton = styled.button`
  border: none;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.main};
  cursor: pointer;
`;
const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export default function HomeHeader() {
  const user = useSelector((state) => state.auth.user);
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Container>
      <GreetingText>Welcome, {user?.name}</GreetingText>
      <ButtonsContainer>
        <ToggleThemeButton onClick={handleToggle}>
          {currentTheme === 'light' ? (
            <MdDarkMode size={30} />
          ) : (
            <MdLightMode size={30} />
          )}
        </ToggleThemeButton>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </ButtonsContainer>
    </Container>
  );
}
