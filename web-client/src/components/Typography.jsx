import styled from 'styled-components';

const Title = styled.h1`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.xlarge}px;
  color: ${({ theme }) => theme.colors.text.main};
  margin-bottom: 0;
  text-align: ${({ align }) => align || 'left'};
`;

const SubTitle = styled.h2`
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  font-size: ${({ theme }) => theme.fontSize.large}px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: ${({ align }) => align || 'left'};
`;

const Description = styled.p`
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSize.regular}px;
  color: ${({ theme }) => theme.colors.text.grey};
  line-height: 1.5;
  text-align: ${({ align }) => align || 'left'};
`;

export { Title, SubTitle, Description };
