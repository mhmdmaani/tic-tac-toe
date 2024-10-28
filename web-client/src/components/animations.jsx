import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FadeInUp = styled.div`
  animation: ${fadeInUp} 0.6s ease-out;
`;

const fadeInDown = keyframes`
    from {
        opacity: 0;
        transform: translateY(-50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
    `;

const FadeInDown = styled.div`
  animation: ${fadeInDown} 0.6s ease-out;
`;

const zoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const ZoomIn = styled.div`
  animation: ${zoomIn} 0.6s ease-out;
`;

export { FadeInUp, FadeInDown, ZoomIn };
