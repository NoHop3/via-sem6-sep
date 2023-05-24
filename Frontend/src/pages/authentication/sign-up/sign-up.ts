import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import { type ApplicationState } from "../../../shared/store/app-state";
import { type AppDispatch } from "../../../shared/store/app-thunk";
import { _SignUp } from "./sign-up.container";
import { services } from "../../../services";

const mapStateToProps = (state: ApplicationState) => ({});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return bindActionCreators(
    {
      signUp: services.signUp,
    },
    dispatch,
  );
};

export const SignUp = connect(mapStateToProps, mapDispatchToProps)(_SignUp);
