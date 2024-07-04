import { createSelector } from "reselect";
import { isEmpty } from "lodash";

export const userSelector = (state) => state.user;
export const listDealerSelector = (state) => state.user?.dealerProfiles;
export const accountTypeSelector = (state) => state.user.type;
export const isEmptyUserSelector = createSelector([userSelector], (user) => {
    return isEmpty(user);
});
export const streamSelector = (state) => state.user.stream;
