import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { Card as PersonCard } from "../../components";
import { StyledCircularProgress, StyledPagination } from "../../styles";
import { StyledPeoplePageWrapper, StyledPeopleGrid } from "./people.styles";
import { type PeopleProps } from "./people.props";
import { PersonMovie } from "../../shared/models/person";

export const _People = (props: PeopleProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, people, page, total, getPeople, setPage } = props;
  const queryStrings = queryString.parse(useLocation().search);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    navigate(`/people?page=${value}`);
  };

  const generateDescription = (movies: PersonMovie[]) => {
    let description = "";
    if (movies === undefined) return description + " N/A";
    movies.forEach((movie) => {
      description += `${movie.title ?? "N/A"}, ${movie.year ?? "N/A"}, ${
        movie.role ?? "N/A"
      }\n`;
    });
    return description;
  };

  useEffect(() => {
    navigate(`/people?page=${page}`);
    queryString.parse(location.search);
    setPage(Number(queryStrings.page) || page);
    getPeople(Number(queryStrings.page) || page, 18);
  }, [location.search, setPage, queryStrings.page, getPeople, navigate, page]);

  return (
    <StyledPeoplePageWrapper>
      {!isLoading ? (
        <>
          <StyledPagination
            count={Math.ceil(total / 18)}
            page={page}
            defaultPage={1}
            onChange={handlePageChange}
            size="large"
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

          <StyledPagination
            count={Math.ceil(total / 18)}
            page={page}
            defaultPage={1}
            onChange={handlePageChange}
            size="large"
          />
        </>
      ) : (
        <StyledCircularProgress disableShrink size={"6rem"} />
      )}
    </StyledPeoplePageWrapper>
  );
};
