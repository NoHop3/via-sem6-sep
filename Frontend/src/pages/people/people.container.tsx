import React, { useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { Card as PersonCard } from "../../components";
import { StyledCircularProgress, StyledPagination } from "../../styles";
import { StyledPeoplePageWrapper, StyledPeopleGrid } from "./people.styles";
import { type PeopleProps } from "./people.props";
import { PersonMovie } from "../../shared/models/person";

const Pagination = ({ count, page, onChange }) => (
  <StyledPagination
    count={count}
    page={page}
    defaultPage={1}
    onChange={onChange}
    size="large"
  />
);

export const _People = (props: PeopleProps) => {
  const { isLoading, people, total, getPeople } = props;
  const { search } = useLocation();
  const { page = "1" } = queryString.parse(search);
  const navigate = useNavigate();

  const PAGE_SIZE = 18;

  const generateDescription = useCallback((movies: PersonMovie[]) => {
    let description = "";
    if (!movies) return description + " N/A";
    movies.forEach((movie) => {
      description += `${(movie.name as string) ?? "N/A"}, ${
        movie.year ?? "N/A"
      }, ${(movie.type as string) ?? "N/A"}\n`;
    });
    return description;
  }, []);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    navigate(`/people?page=${value}`);
  };

  useEffect(() => {
    navigate(`/people?page=${page?.toString() ?? "1"}`);
    getPeople(Number(page), PAGE_SIZE);
  }, [navigate, getPeople, page]);

  return (
    <StyledPeoplePageWrapper>
      {!isLoading ? (
        <>
          <Pagination
            count={Math.ceil(total / PAGE_SIZE)}
            page={Number(page)}
            onChange={handlePageChange}
          />

          <StyledPeopleGrid container>
            {people.map((person, i) => (
              <PersonCard
                key={i}
                id={person.id}
                title={person.name}
                description={generateDescription(person.movies)}
                date={String(person.birth ?? "Unknown")}
                imgSource="https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png"
              />
            ))}
          </StyledPeopleGrid>

          <Pagination
            count={Math.ceil(total / PAGE_SIZE)}
            page={Number(page)}
            onChange={handlePageChange}
          />
        </>
      ) : (
        <StyledCircularProgress disableShrink size={"6rem"} />
      )}
    </StyledPeoplePageWrapper>
  );
};
