import Api from "./axios/MainApi";

export interface IRemote {
    fetchTodo(): Promise<ITodoItem[]>;
    postTodoItem(payload: ITodoItem): Promise<unknown>;
    mainApi: IMainApi;
}

class Remote implements IRemote {
    mainApi: IMainApi;
    constructor() {
        this.mainApi = Api;
    }
    async fetchTodo(): Promise<ITodoItem[]> {
        return Promise.resolve([
            {
                id: "1",
                description: "kim la tien",
                isLoading: false,
                errorMsg: "",
            },
            {
                id: "2",
                description: "kim la tien2",
                isLoading: false,
                errorMsg: "",
            },
        ]);
    }
    async postTodoItem(payload: ITodoItem): Promise<unknown> {
        return Promise.resolve({
            data: {
                todo: payload,
            },
        });
    }
}

export default Remote;
