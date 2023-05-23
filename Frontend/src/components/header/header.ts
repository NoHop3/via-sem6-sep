import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import { type ApplicationState } from "../../shared/store/app-state";
import { type AppDispatch } from "../../shared/store/app-thunk";
import { _Header } from "./header.container";
import { setSearchPhrase } from "../../shared/store/search-store";
import { services } from "../../services";

const mapStateToProps = (state: ApplicationState) => ({});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return bindActionCreators(
    {
      onSearchPhraseChange: setSearchPhrase,
      onSearch: services.search,
    },
    dispatch,
  );
};

export const Header = connect(mapStateToProps, mapDispatchToProps)(_Header);
