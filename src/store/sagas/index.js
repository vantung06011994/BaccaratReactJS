import { all } from "redux-saga/effects";
import { gameWatchers } from "./GameSaga";
import { userWatchers } from "./UserSaga";

//import { todoWatchers } from "core/todo/frameworks/todoSaga";

export function* rootSaga() {
    //yield all([...todoWatchers]);
    yield all([...userWatchers, ...gameWatchers]);
}
