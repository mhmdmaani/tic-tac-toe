import HomeHeader from './HomeHeader';
import StartNewButton from './StartNewButton';
import StatsSection from './StatsSection';
import { Container } from '../../components/containers';
function HomePage() {
  return (
    <Container
      style={{
        paddingTop: '40px',
        paddingBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <HomeHeader />
      <StatsSection />
      <StartNewButton />
    </Container>
  );
}

export default HomePage;
