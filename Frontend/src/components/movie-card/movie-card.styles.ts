import { Grid, Typography } from "@mui/material";
import styled from "styled-components";

export const MovieGrid = styled(Grid)`
  width: calc(100% - 2rem);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    "title title"
    "image info"
    "image info"
    "image info"
    "image button";
  grid-gap: 1rem;
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
  @media (max-width: 614px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-areas:
      "title"
      "image"
      "info"
      "button";
  }
`;

export const MovieTitle = styled(Typography)`
  grid-area: title;
  color: ${({ theme }) => theme.palette.text.primary};
  margin: 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

export const MovieImage = styled.img`
  grid-area: image;
  width: 200px;
  height: 250px;
  object-fit: cover;
  border-radius: 1rem;
`;

export const MovieInfo = styled(Typography)`
  grid-area: info;
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
`;
