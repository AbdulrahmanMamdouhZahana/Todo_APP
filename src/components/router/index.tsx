import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import RootLayout from "../RootLayout";
import Register from "../../pages/Register";
import Login from "../../pages/login";
import Home from "../../pages/";
import Profile from "../../pages/Profile";
import ErrorHandler from "../ErrorHandler";
import AllTodos from "../AllTodos";

const getUserToken = () => {
    try {
        const str = localStorage.getItem("userDate");
        return str ? JSON.parse(str)?.jwt : null;
    } catch {
        return null;
    }
};

const isAuthenticated = Boolean(getUserToken());

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />} >
            <Route index element={isAuthenticated ? <Home /> : <Navigate to="login" />} />
            <Route path="login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
            <Route path="register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="todos" element={<AllTodos />} />
        </Route>
    </>
));

export default router;