import { useDispatch } from "react-redux";
import "./App.css";
import AppRouter from "./AppRouter";
import { AppDispatch } from "./store/store";
import { useEffect } from "react";
import { getLoginUser } from "./store/slice/AuthSlice";

function App() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getLoginUser());
    }, [dispatch]);

    return (
        <div>
            <AppRouter />
        </div>
    );
}

export default App;
