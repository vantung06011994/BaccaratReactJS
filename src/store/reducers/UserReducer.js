import { UserActionType } from "../actions/UserAction";
import produce from "immer";

export const initialUserState = {};

export function userReducer(state = initialUserState, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case UserActionType.USER_LOGIN_SUCCESS:
            case UserActionType.SET_USER_DATA:
                draft = action.payload.user;
                draft.type = action.payload.type;
                draft.role = "PLAYER";
                break;
            case UserActionType.USER_REMOVE_DATA:
            case UserActionType.USER_LOGGED_OUT:
                draft = {};
                break;
            default:
                break;
        }
        return draft;
    });
}
