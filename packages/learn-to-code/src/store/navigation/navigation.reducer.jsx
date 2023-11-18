/**
 * @fileoverview Top navigation bar reducer
 */
import * as ActionTypes from "./actionTypes";
import { Map } from "immutable";
/**
 * @typedef {Object} Action
 * @property {string} type - The type of the action
 * @property {any} payload - Additional data associated with the action
 */
/**
 * @typedef {Object} State
 * @property {string} currentRoute - The current route the application is on
 * @property {string} to - The new route the application wants to navigate
 * @property {string} previousRoute - The last route the applciation was on
 */

const initialState = Map({
  currentRoute: "/",
  to: "",
  previousRoute: "",
});
/**
 * Reducer function to handle state changes based on actions.
 * @param {State} state - The current state
 * @param {string} state.currentRoute - The current active route
 * @param {string} state.to - The new route to navigate
 * @param {Action} action - The action to be performed
 * @returns {Object} - The new state after performing the action
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.NAVLINKCHANGE:
      return state.merge({
        currentRoute: action.payload,
        to: "",
        previousRoute: state.get("currentRoute"),
      });

    default:
      return state;
  }
};

export default reducer;
