import styled from 'styled-components';

const PrimaryButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.contrast};
  font-family: ${({ theme }) => theme.fontFamily.medium};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSize.medium}px;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue.main};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.grey.border};
    color: ${({ theme }) => theme.colors.grey.main};
    cursor: not-allowed;
  }
`;

export { PrimaryButton };
