import { Box, Typography, Grid } from "@mui/material";
import styled from "styled-components";

export const StyledHomeWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export const StyledHomeTitle = styled(Typography)`
  margin: 1rem;
  font-size: 2rem;
  font-weight: 400;
  text-align: center;
`;

export const StyledHomeGrid = styled(Grid)`
  display: grid;
  grid-template-columns: repeat(1, minmax(500px, 1fr));
  grid-gap: 1rem;
  width: 100%;
  margin: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;
