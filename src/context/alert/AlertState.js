import React, { useReducer } from "react";

import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";
import { SHOW_ALERT, REMOVE_ALERT } from "../types";

const AlertState = (props) => {
  const initialState = undefined;

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // Show Alert
  const showAlert = (text, type) => {
    dispatch({
      type: SHOW_ALERT,
      payload: { text, type },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000);
  };

  return (
    <AlertContext.Provider
      value={{
        alert: state,
        showAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
