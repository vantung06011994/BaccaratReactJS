class TodoUseCase {
    repository: ITodoRepository;

    constructor(sessionRepositories: ITodoRepository) {
        this.repository = sessionRepositories;
    }

    getTodos(): Promise<ITodoItem[]> {
        return this.repository.fetchTodo();
    }
    addTodo(payload: ITodoItem): Promise<unknown> {
        return this.repository.postTodoItem(payload);
    }
}

export default TodoUseCase;
