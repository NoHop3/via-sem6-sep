import { Grid, Typography } from "@mui/material";
import styled from "styled-components";

const loadingStyles = `
  background: #eee;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  border-radius: 5px;
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;
  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }
`;

export const MovieGridWrapper = styled(Grid)`
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
  @media (max-width: 768px) {
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
  margin: 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

export const MovieTitleLoading = styled.div`
  height: 3rem;
  grid-area: title;
  ${loadingStyles}
`;

export const MovieImage = styled.img`
  grid-area: image;
  width: 200px;
  height: 250px;
  object-fit: cover;
  border-radius: 1rem;
`;

export const MovieImageLoading = styled.div`
  grid-area: image;
  width: 200px;
  height: 250px;
  ${loadingStyles}
`;

export const MovieInfo = styled(Typography)`
  grid-area: info;
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
`;

export const MovieInfoLoading = styled.div`
  grid-area: info;
  ${loadingStyles}
`;

export const MovieButtonLoading = styled.div`
  grid-area: button;
  ${loadingStyles}
`;
