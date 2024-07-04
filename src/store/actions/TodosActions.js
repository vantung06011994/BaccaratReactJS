export const TodosActionTypes = {
    ADD_TODO: "ADD_TODO",
    DELETE_TODO: "DELETE_TODO",
};
export function deleteTodoAction(todoId) {
    return {
        type: TodosActionTypes.DELETE_TODO,
        payload: { todoId: todoId },
    };
}

export function addTodoAction(todo) {
    return {
        type: TodosActionTypes.ADD_TODO,
        payload: {
            todo,
        },
    };
}
