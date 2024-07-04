import { addTodoAction, deleteTodoAction } from "store/actions/TodosActions";

import TodoComponent from "./TodoComponent";
import { connect } from "react-redux";

function mapStateToDispatch(state) {
    return {
        todos: state.todos,
    };
}

const mapDispatchToProps = {
    addTodoAction,
    deleteTodoAction,
};
// @ts-ignore
export default connect(mapStateToDispatch, mapDispatchToProps)(TodoComponent);
