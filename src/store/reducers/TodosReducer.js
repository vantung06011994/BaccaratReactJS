import { TodosActionTypes } from "../actions/TodosActions";
import { omit } from "lodash";
import produce from "immer";

export const initialTodoState = {};

export function todosReducer(state = initialTodoState, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case TodosActionTypes.ADD_TODO:
                action.payload.todo.id = Math.random().toString(36).substring(7);
                draft = { ...draft, [action.payload.todo.id]: action.payload.todo };
                break;

            case TodosActionTypes.DELETE_TODO:
                draft = omit(draft, [action.payload.todoId]);
                break;
            default:
                break;
        }
        return draft;
    });
}
