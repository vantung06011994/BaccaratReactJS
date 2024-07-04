export const UserActionType = {
    SET_USER_DATA: "user/SET_DATA",
    USER_REMOVE_DATA: "user/REMOVE_DATA",
    USER_LOGGED_OUT: "user/LOGGED_OUT",
    USER_LOGIN_REQUEST: "user/LOGIN_REQUEST",
    USER_LOGIN_SUCCESS: "user/LOGIN_SUCCESS",
    USER_LOGIN_FAIL: "user/LOGIN_FAIL",
};
export function loginRequestAction(userLogin) {
    return {
        type: UserActionType.USER_LOGIN_REQUEST,
        payload: { userLogin: userLogin },
    };
}
export function loginSuccessAction(user, type) {
    return {
        type: UserActionType.USER_LOGIN_SUCCESS,
        payload: {
            user: user,
            type: type,
        },
    };
}
export function loginFailAction() {
    return {
        type: UserActionType.USER_LOGIN_FAIL,
        payload: null,
    };
}
export function setUserAction(user) {
    return {
        type: UserActionType.SET_USER_DATA,
        payload: {
            user: user,
        },
    };
}
export function removeUserData() {
    return {
        type: UserActionType.USER_REMOVE_DATA,
        payload: {},
    };
}
export function userLogout() {
    return {
        type: UserActionType.USER_LOGGED_OUT,
        payload: {},
    };
}
