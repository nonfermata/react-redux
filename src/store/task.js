import { createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import { setErrors } from "./errors";
const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        recieved(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },
        update(state, action) {
            const entities = state.entities;
            state.entities = entities.map((el) => {
                if (el.id === action.payload.id) {
                    return { ...el, ...action.payload };
                }
                return el;
            });
        },
        created(state, action) {
            state.entities.push(action.payload);
        },
        remove(state, action) {
            const entities = state.entities;
            state.entities = entities.filter(
                (el) => el.id !== action.payload.id
            );
        },
        taskRequested(state) {
            state.isLoading = false;
        },
        taskRequestFailed(state) {
            state.isLoading = false;
        }
    }
});
const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, recieved, created, taskRequestFailed, taskRequested } =
    actions;

export const loadTasks = () => async (dispatch) => {
    dispatch(taskRequested());
    try {
        const data = await todosService.fetch();
        dispatch(recieved(data));
    } catch (e) {
        dispatch(taskRequestFailed());
        dispatch(setErrors(e.message));
    }
};

export const createTask = (newTask) => async (dispatch) => {
    dispatch(taskRequested());
    try {
        const data = await todosService.create(newTask);
        dispatch(created(data));
    } catch (e) {
        dispatch(taskRequestFailed());
        dispatch(setErrors(e.message));
    }
};

export const completedTask = (id) => (dispatch) => {
    dispatch(update({ id, completed: true }));
};

export const titleChanged = (id) =>
    update({ id, title: `New title for ${id}` });

export const taskDeleted = (id) => remove({ id });

export const getTasks = () => (state) => state.tasks.entities;
export const getTaskLoadingStatus = () => (state) => state.tasks.isLoading;

export default taskReducer;
