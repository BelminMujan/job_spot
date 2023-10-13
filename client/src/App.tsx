import React from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./screens/auth/login";
import Register from "./screens/auth/register";
import PasswordReset from "./screens/auth/passwordReset";
import NotFound from "./screens/notFound";
import Settings from "./screens/dashboard/settings";
import Messages from "./screens/dashboard/messages";
import Admin from "./screens/dashboard/admin";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "react-hot-toast"
const router = createBrowserRouter([
    {
        path: "",
        element: <div>ladnign</div>
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "reset_password",
        element: <PasswordReset />
    },
    {
        path: "/admin",
        element: <Admin />,
        children: [
            {
                path: "settings",
                element: <Settings />
            },
            {
                path: "messages",
                element: <Messages />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])

const App: React.FC = () => {
    return <Provider store={store}>
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
        <RouterProvider router={router}></RouterProvider>
    </Provider>

}

export default App