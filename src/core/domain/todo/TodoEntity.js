class TodoEntity {
    constructor(params) {
        this.id = params.id;
        this.description = params.description;
        this.isLoading = false;
        this.errorMsg = "";
    }
}
export default TodoEntity;
