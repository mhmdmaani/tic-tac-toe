import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledPasswordInput = styled.input`
  background-color: ${({ theme }) => theme.colors.bg.main};
  color: ${({ theme }) => theme.colors.text.main};
  font-family: ${({ theme }) => theme.fontFamily.regular};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSize.regular}px;
  padding: 10px 40px 10px 10px;
  border: 1px solid ${({ theme }) => theme.colors.grey.border};
  border-radius: 4px;
  transition: border-color 0.3s;
  flex: 1;
  &:focus {
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.red.main : theme.colors.primary.main};
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.grey.placeholder};
  }
`;

const EyeIcon = styled.div`
  position: absolute;
  right: 10px;
  cursor: pointer;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors.text.main};
`;

const ErrorMessage = styled.span`
  color: ${(props) => props.theme.colors.red.main};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const PasswordInput = ({
  placeholder,
  value,
  onChange,
  label,
  error,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputWrapper>
      <Label htmlFor={props.id}>{label}</Label>
      <PasswordInputWrapper>
        <StyledPasswordInput
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
          hasError={!!error}
        />
        <EyeIcon onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </EyeIcon>
      </PasswordInputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
};

export default PasswordInput;
