import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import { _People } from "./people.container";
import { services } from "../../services";
import { ApplicationState } from "../../shared/store/app-state";
import { AppDispatch } from "../../shared/store/app-thunk";
import { setPage } from "../../shared/store/people-store";

const mapStateToProps = (state: ApplicationState) => ({
  people: state.people.people,
  isLoading: state.people.isLoading,
  page: state.people.page,
  total: state.people.total,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return bindActionCreators(
    {
      getPeople: services.getPeople,
      setPage,
    },
    dispatch,
  );
};

export const People = connect(mapStateToProps, mapDispatchToProps)(_People);
