import { TASK_DELETED, TASK_UPDATED } from "./actionTypes";

export function taskReducer(state, action) {
    let newArray;
    switch (action.type) {
        case TASK_UPDATED:
            newArray = state.map((el) => {
                if (el.id === action.payload.id) {
                    return { ...el, ...action.payload };
                }
                return el;
            });
            return newArray;
        case TASK_DELETED:
            newArray = state.filter((el) => el.id !== action.payload.id);
            return newArray.map((el) => ({ ...el }));
        default:
            return state;
    }
}
