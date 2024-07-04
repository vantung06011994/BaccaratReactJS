import * as React from "react";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import TodoItem from "./TodoItem";

const styles = (theme: Theme) =>
    createStyles({
        wrap: {
            display: "flex",
            justifyContent: "center",
        },
        content: {
            width: 500,
        },
        addButton: {
            marginTop: theme.spacing.unit,
        },
        divider: {
            marginTop: theme.spacing.unit * 2,
            marginBottom: theme.spacing.unit * 2,
        },
        todoItem: {
            padding: 20,
            marginTop: 20,
            marginBottom: 20,
        },
    });

class TodoComponent extends React.Component {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            description: "",
        };
    }

    componentDidMount() {
        // this.props.loadTodos();
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            description: e.target.value,
        });
    };

    addTodo = () => {
        this.props.addTodoAction({
            id: "",
            description: this.state.description,
        });
    };
    deleteTodo = (todoId: string) => {
        this.props.deleteTodoAction(todoId);
    };

    render() {
        const { classes, todos } = this.props;

        return (
            <div className={classes.wrap}>
                <div className={classes.content}>
                    <div>
                        <TextField
                            multiline
                            placeholder="Enter todo message"
                            rows="5"
                            variant="outlined"
                            onChange={this.onChange}
                            value={this.state.description}
                            fullWidth
                        />
                        <Button
                            className={classes.addButton}
                            color="primary"
                            variant="contained"
                            fullWidth
                            onClick={this.addTodo}
                        >
                            Add Todo
                        </Button>
                    </div>

                    <Divider className={classes.divider} />

                    <div>
                        {Object.values(todos).map((todo) => (
                            <TodoItem todo={todo} key={todo.id} deleteTodo={this.deleteTodo}></TodoItem>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(TodoComponent);
