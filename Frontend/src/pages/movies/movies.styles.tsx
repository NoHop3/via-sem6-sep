import { Grid, Box, Pagination } from "@mui/material";
import styled from "styled-components";

export const StyledMoviePageWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

export const StyledMovieGrid = styled(Grid)`
  display grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-gap: 1rem;
  padding: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  }

  @media (max-width: 464px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

export const StyledMovieCardWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${({ theme }) => theme.palette.primary.main};
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 3rem;
  box-shadow: 0 0 0.5rem 0.25rem ${({ theme }) => theme.palette.primary.dark};
  transition: all 0.25s ease-in-out;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 0.5rem 0.25rem ${({ theme }) => theme.palette.primary.light};
  }
`;

export const StyledPagination = styled(Pagination)`
  color: ${({ theme }) => theme.palette.primary.contrastText};
`;
