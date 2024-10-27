import styled from 'styled-components';

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.bg.card};
  color: ${({ theme }) => theme.colors.text.main};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  @media (max-width: 768px) {
    padding: 10px;
    width: 100%;
  }
`;

const CenteredPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-image: ${({ theme, image }) =>
    image && image !== '' ? `url(${image})` : theme.colors.bg.main};
  background-size: cover;
  background-position: center;
`;

const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;

  // Breakpoints for responsiveness similar to MUI
  @media (min-width: 600px) {
    max-width: 600px;
  }
  @media (min-width: 960px) {
    max-width: 960px;
  }
  @media (min-width: 1280px) {
    max-width: 1280px;
  }
  @media (min-width: 1920px) {
    max-width: 1920px;
  }
`;
export { Card, CenteredPageContainer, Container };
