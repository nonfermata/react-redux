import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import store from "./store/store";
import * as actions from "./store/actions";

const App = () => {
    const [state, setState] = useState(store.getState());
    useEffect(() => {
        store.subscribe(() => {
            setState(store.getState());
        });
    }, []);

    const completeTask = (id) => {
        store.dispatch(actions.taskCompleted(id));
    };

    const changeTitle = (id) => {
        store.dispatch(actions.titleChanged(id));
    };

    const deleteTask = (id) => {
        store.dispatch(actions.deleteTask(id));
    };

    return (
        <>
            <h1>App</h1>
            <ul>
                {state.map((item) => (
                    <li key={item.id}>
                        <p>{item.title}</p>
                        <p>{`Completed: ${item.completed}`}</p>
                        <button onClick={() => completeTask(item.id)}>
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
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
);
