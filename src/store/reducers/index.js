import { gameReducer, initGameState } from "./GameReducer";
import { initialTodoState, todosReducer } from "./TodosReducer";
import { initialUserState, userReducer } from "./UserReducer";

import { combineReducers } from "redux";
import { pendingTasksReducer } from "react-redux-spinner";

export const initialState = {
    pendingTasks: undefined,
    user: initialUserState,
    todos: initialTodoState,
    game: initGameState,
};

export default combineReducers({
    pendingTasks: pendingTasksReducer,
    user: userReducer,
    todos: todosReducer,
    game: gameReducer,
});
