import { AddAnsynTaskAction, EndAnsynTaskAction } from "../actions/PendingTaskAction";
import { UserActionType, loginFailAction, loginSuccessAction } from "../actions/UserAction";
import { put, takeLatest } from "redux-saga/effects";

import { DEBUG_ON } from "globalconfig";
import presenter from "../../core/adapters/presenters/index";

/*-----------*/
function* loginRequestSaga(action) {
    try {
        yield put(AddAnsynTaskAction());
        // yield delay(3000);
        const user = action.payload.userLogin;
        const res = yield presenter.jwt.loginWithEmailAndPassword(user.email, user.password, user.type);
        yield put(loginSuccessAction(res));
    } catch (error) {
        if (DEBUG_ON) console.log("function*loginRequestSaga -> error", error);
        yield put(loginFailAction());
    } finally {
        yield put(EndAnsynTaskAction());
    }
}
function* loginRequestSagaWatcher() {
    yield takeLatest(UserActionType.USER_LOGIN_REQUEST, loginRequestSaga);
}
/*end-----------*/

export const userWatchers = [loginRequestSagaWatcher()];
