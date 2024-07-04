import { begin, end, endAll, pendingTask } from "react-redux-spinner";

export function AddAnsynTaskAction() {
    return { type: "ADD_ASYNC_TASK", [pendingTask]: begin };
}

export function EndAnsynTaskAction() {
    return { type: "END_ASYNC_TASK", [pendingTask]: end };
}

export function FinishAllTaskAction() {
    return { type: "FINISH_ALL_TASK", [pendingTask]: endAll };
}
