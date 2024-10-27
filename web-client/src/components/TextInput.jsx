import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  border: 1px solid
    ${(props) =>
      props.hasError
        ? props.theme.colors.red.main
        : props.theme.colors.grey.border};
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${(props) =>
      props.hasError
        ? props.theme.colors.red.main
        : props.theme.colors.primary.main};
  }
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

export default function TextInput({ label, error, ...props }) {
  return (
    <InputWrapper>
      <Label htmlFor={props.id}>{label}</Label>
      <StyledInput hasError={!!error} {...props} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
}
