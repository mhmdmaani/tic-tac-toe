import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderWrapper = styled.div`
  display: inline-block;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;

const SpinnerCircle = styled.div`
  box-sizing: border-box;
  display: block;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border: ${(props) => props.thickness}px solid ${(props) => props.color};
  border-radius: 50%;
  border-top-color: transparent;
  animation: ${spin} ${(props) => props.speed}s linear infinite;
`;

export default function Loader({
  size = 40,
  color = '#0070f3',
  thickness = 4,
  speed = 0.75,
}) {
  return (
    <LoaderWrapper size={size}>
      <SpinnerCircle
        size={size}
        color={color}
        thickness={thickness}
        speed={speed}
      />
    </LoaderWrapper>
  );
}
