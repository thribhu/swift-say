import * as ActionTypes from './actionTypes';

/**
 * Action creator for changing the navigation link.
 * @param {string} newRoute - The new route to set.
 * @returns {Object} - The action object.
 */
export const changeNavlink = (newRoute) => ({
  type: ActionTypes.NAVLINKCHANGE,
  payload: newRoute,
});
