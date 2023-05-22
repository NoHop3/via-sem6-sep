import styled from "styled-components";
import { ButtonProps } from "./button.props";
import { Button } from "@mui/material";

export const StyledButton = styled(Button)<{ buttonProps?: ButtonProps }>`
  background-color: ${({ theme }) => theme.palette.primary.main};
  border: none;
  color: ${({ theme }) => theme.palette.primary.contrastText}};
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.palette.primary.light};
    color: ${({ theme }) => theme.palette.text.disabled})}
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
