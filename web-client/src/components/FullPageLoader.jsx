import styled, { keyframes } from 'styled-components';
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.backgroundColor};
  z-index: 9999;
`;

const SpinnerWrapper = styled.div`
  display: inline-block;
`;

const Spinner = styled.div`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border: ${(props) => props.thickness}px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: ${(props) => props.color};
  animation: ${spin} ${(props) => props.speed}s linear infinite;
`;

const LoadingText = styled.p`
  margin-top: 1rem;
  font-size: 1.2rem;
  color: ${(props) => props.color};
`;

export default function FullPageLoader({
  color = '#ffffff',
  size = 50,
  thickness = 5,
  speed = 0.75,
  backgroundColor = 'rgba(0, 0, 0, 0.5)',
}) {
  return (
    <LoaderOverlay
      backgroundColor={backgroundColor}
      role='alert'
      aria-busy='true'
    >
      <SpinnerWrapper>
        <Spinner
          color={color}
          size={size}
          thickness={thickness}
          speed={speed}
        />
        <LoadingText color={color}>Loading...</LoadingText>
      </SpinnerWrapper>
    </LoaderOverlay>
  );
}
