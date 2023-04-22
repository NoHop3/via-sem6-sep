import styled from "styled-components";
import { ButtonProps } from "./button.props";
import { Button } from "@mui/material";

export const StyledButton = styled(Button)<{ buttonProps?: ButtonProps }>`
  background-color: #f44336;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #f44336;
  }
  &:disabled {
    background-color: #f44336;
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
