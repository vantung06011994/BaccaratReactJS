import * as React from "react";

import Paper from "@material-ui/core/Paper";

function TodoItem(props: any) {
    const { todo, deleteTodo } = props;
    return (
        <Paper key={todo.id}>
            {todo.description} <button onClick={() => deleteTodo(todo.id)}>delete {todo.id}</button>
            <br></br>
            {/* {todo.isLoading && <b>Loading....</b>}
            {todo.errorMsg && <b style={{ color: "red" }}>{todo.errorMsg}</b>} */}
        </Paper>
    );
}
export default TodoItem;
