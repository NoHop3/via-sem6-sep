import { Box, Grid, Typography } from "@mui/material";
import styled from "styled-components";

export const MovieDetailsPageWrapper = styled(Box)`
  width: calc(100% - 3rem);
  height: calc(100% - 3rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)};
`;

export const MovieDetailsGrid = styled(Grid)`
  width: calc(100% - 2rem);
  height: calc(100% - 2rem);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    "title title title title"
    "image info info info"
    "image info info info"
    "image info info info"
    "image info info info";
  grid-gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 0 0 0.5rem 0.1rem ${({ theme }) => theme.palette.primary.main};

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      "title title title"
      "image info info"
      "image info info"
      "image info info";
  }

  @media (max-width: 464px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      "title title"
      "image image"
      "image image"
      "info info"
      "info info";
  }
`;

export const MovieDetailsTitle = styled(Typography)`
  grid-area: title;
  font-size: 2rem;
  font-weight: 600;
  border-radius: 0.5rem;
  text-align: center;
  box-shadow: 0 0 0.25rem 0.05rem ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.dark};
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const MovieDetailsImage = styled.img`
  grid-area: image;
  width: 100%;
  height: 40rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.25rem 0.05rem ${({ theme }) => theme.palette.primary.main};
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

export const MovieDetailsInfo = styled.div`
  grid-area: info;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.25rem 0.05rem ${({ theme }) => theme.palette.primary.main};
  padding: 1rem;
  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const MovieDetailsInfoItem = styled(Typography)`
  font-size: 2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.primary.dark};
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;
