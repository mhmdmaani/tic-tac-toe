import styled from 'styled-components';
import { FaRegFaceGrinStars } from 'react-icons/fa6';
import { FaRegFaceFrown } from 'react-icons/fa6';
import { FaRegFaceMeh } from 'react-icons/fa6';
import { useTheme, useSelector } from '../../shared';
import CircularProgress from '../../components/CircularProgress';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchStatistics } from '../../shared/store/statisticsSlice';
import { FadeInDown } from '../../components/animations';

const MainContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  gap: 20px;
`;

const ProgressContainer = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  flex-direction: column;
  gap: 20px;
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const StatContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Indicator = styled.div`
  border-radius: 50%;
  background-color: ${({ color }) => color};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ProgressText = styled.span`
  color: ${({ theme }) => theme.colors.text.main};
`;

export default function StatsSection() {
  const stats = useSelector((state) => state.statistics.data);
  const loading = useSelector((state) => state.statistics.loading);
  const dispatch = useDispatch();
  const theme = useTheme();

  const getPercentage = () => {
    if (loading) return 0;
    return (
      (
        (stats?.stats?.wins /
          (stats?.stats?.wins + stats?.stats?.losses + stats?.stats?.draws)) *
        100
      ).toFixed(0) + '%'
    );
  };

  useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch]);

  return (
    <MainContainer>
      <ProgressContainer>
        <CircularProgress
          size={200}
          strokeWidth={10}
          percentage={
            (stats?.stats?.wins /
              (stats?.stats?.wins +
                stats?.stats?.losses +
                stats?.stats?.draws)) *
            100
          }
          color={
            getPercentage() > 50
              ? theme.colors.green.main
              : theme.colors.red.main
          }
        >
          <ProgressText>{getPercentage()}</ProgressText>
        </CircularProgress>
        <span>{getPercentage() > 50 ? 'Good Job!' : 'Keep Trying!'}</span>
      </ProgressContainer>

      <Container>
        <FadeInDown>
          <StatContainer>
            <div>
              <IconContainer>
                <FaRegFaceGrinStars color={theme.colors.green.main} />
              </IconContainer>
              <Indicator>
                {loading ? 'Loading...' : stats?.stats?.wins} Wins
              </Indicator>
            </div>
          </StatContainer>
        </FadeInDown>
        <FadeInDown>
          <StatContainer>
            <div>
              <IconContainer>
                <FaRegFaceFrown color={theme.colors.red.main} />
              </IconContainer>
              <Indicator>
                {loading ? 'Loading...' : stats?.stats?.losses} Losses
              </Indicator>
            </div>
          </StatContainer>
        </FadeInDown>

        <FadeInDown>
          <StatContainer>
            <div>
              <IconContainer>
                <FaRegFaceMeh color={theme.colors.yellow.main} />
              </IconContainer>
              <Indicator>
                {loading ? 'Loading...' : stats?.stats?.draws} Draws
              </Indicator>
            </div>
          </StatContainer>
        </FadeInDown>
      </Container>
    </MainContainer>
  );
}
