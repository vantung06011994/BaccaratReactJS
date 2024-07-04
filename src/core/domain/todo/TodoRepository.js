class TodoRepository {
    constructor(infrastructure) {
        this.infra = infrastructure;
    }
    postTodoItem(payload: ITodoItem): Promise<unknown> {
        return this.infra.remote.postTodoItem(payload);
    }
    fetchTodo(): Promise<ITodoItem[]> {
        return this.infra.remote.fetchTodo();
    }
}

export default TodoRepository;
