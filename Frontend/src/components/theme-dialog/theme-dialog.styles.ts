import { Box, Dialog } from "@mui/material";
import styled from "styled-components";

export const StyledThemeDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 100%;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.values.lg}px) {
    .MuiDialog-paper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
`;

export const StyledThemeDialogHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .MuiTypography-root {
    font-size: 1.5rem;
  }
`;

export const StyledThemeDialogBody = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledThemeDialogFooter = styled(Box)`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;
