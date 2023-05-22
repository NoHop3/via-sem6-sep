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
  padding: ${({ theme }) => theme.spacing(2)};
  font-size: ${({ theme }) => theme.typography.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
`;

export const StyledThemeDialogBody = styled(Box)`
  height: 100%;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
`;

export const StyledThemeDialogFooter = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: {({ theme }) => theme.spacing(2)};
  border-top: 1px solid ${({ theme }) => theme.palette.divider};
`;
