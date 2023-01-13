import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import createStore from "./store/store";
import {
    taskDeleted,
    titleChanged,
    completedTask,
    loadTasks,
    createTask,
    getTasks,
    getTaskLoadingStatus
} from "./store/task";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getError } from "./store/errors";

const store = createStore();

const App = () => {
    const state = useSelector(getTasks());
    const isLoading = useSelector(getTaskLoadingStatus());
    const error = useSelector(getError());
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadTasks());
    }, []);
    const changeTitle = (taskId) => {
        dispatch(titleChanged(taskId));
    };
    const deleteTask = (taskId) => {
        dispatch(taskDeleted(taskId));
    };
    const addTask = () => {
        const number = state.length + 1;
        dispatch(
            createTask({
                userId: number,
                title: `New title for task #${number}`,
                completed: false
            })
        );
    };

    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    if (error) {
        return <p>{error}</p>;
    }
    return (
        <>
            <h1>App</h1>
            <ul>
                {state.map((item) => (
                    <li key={item.id}>
                        <p>{item.title}</p>
                        <p>{`Completed: ${item.completed}`}</p>
                        <button
                            onClick={() => dispatch(completedTask(item.id))}
                        >
                            Complete
                        </button>
                        <button onClick={() => changeTitle(item.id)}>
                            Change title
                        </button>
                        <button onClick={() => deleteTask(item.id)}>
                            Delete task
                        </button>
                        <hr />
                    </li>
                ))}
            </ul>
            <button onClick={addTask}>Add task</button>
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
    // </React.StrictMode>
);
