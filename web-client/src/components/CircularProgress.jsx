import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

// Define the theme
const theme = {
  primary: '#0070f3',
  background: '#ddd',
  text: '#333',
};

// Styled components
const ProgressContainer = styled.div`
  position: relative;
  display: inline-flex;
`;

const SvgContainer = styled.svg`
  transform: rotate(-90deg);
`;

const Circle = styled.circle`
  fill: none;
  stroke-width: ${(props) => props.strokeWidth}px;
  stroke-linecap: round;
`;

const BackgroundCircle = styled(Circle)`
  stroke: ${(props) => props.theme.background};
`;

const ProgressCircle = styled(Circle)`
  stroke: ${(props) => props.color};
  transition: stroke-dashoffset 0.5s ease-out;
`;

const Content = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: Arial, sans-serif;
  font-size: ${(props) => props.size / 4}px;
  color: ${(props) => props.theme.text};
`;

// CircularProgress component
const CircularProgress = ({
  children,
  size = 100,
  strokeWidth = 10,
  percentage = 0,
  color = '#0070f3',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <ThemeProvider theme={theme}>
      <ProgressContainer>
        <SvgContainer width={size} height={size}>
          <BackgroundCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <ProgressCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            color={color}
          />
        </SvgContainer>
        <Content size={size}>{children}</Content>
      </ProgressContainer>
    </ThemeProvider>
  );
};

// Example usage component
export default CircularProgress;
