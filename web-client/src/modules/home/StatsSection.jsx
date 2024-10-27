import styled from 'styled-components';
import { FaRegFaceGrinStars } from 'react-icons/fa6';
import { FaRegFaceFrown } from 'react-icons/fa6';
import { FaRegFaceMeh } from 'react-icons/fa6';
import { useTheme, useStats } from '@tic-tac/shared';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

export default function StatsSection() {
  const { stats, loading } = useStats();
  const theme = useTheme();
  return (
    <Container>
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

      <StatContainer>
        <div>
          <IconContainer>
            <FaRegFaceFrown color={theme.colors.red.main} />
          </IconContainer>
          <Indicator>{loading ? 'Loading...' : stats?.stats?.losses}</Indicator>
        </div>
      </StatContainer>

      <StatContainer>
        <div>
          <IconContainer>
            <FaRegFaceMeh color={theme.colors.yellow.main} />
          </IconContainer>
          <Indicator>{loading ? 'Loading...' : stats?.stats?.draws}</Indicator>
        </div>
      </StatContainer>
    </Container>
  );
}
