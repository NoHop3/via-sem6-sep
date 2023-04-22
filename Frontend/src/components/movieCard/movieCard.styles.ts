import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import styled from "styled-components";

export const MovieCardWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  padding: 1rem;
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

export const MovieInfoWrapper = styled(Box)`
  width: calc(100% - 2rem);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const MovieInfo = styled(Typography)`
  margin: 0 0.5rem;
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
`;
