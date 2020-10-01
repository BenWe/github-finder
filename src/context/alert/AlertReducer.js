import { REMOVE_ALERT, SHOW_ALERT } from "../types";

export default (state, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return action.payload;
    case REMOVE_ALERT:
      return undefined;
    default:
      return state;
  }
};
