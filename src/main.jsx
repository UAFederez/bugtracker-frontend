import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tickets from "./pages/Tickets";
import NewTicket from "./pages/NewTicket";
import TicketDetails from "./pages/TicketDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <PrivateRoute>
                <Root />
            </PrivateRoute>
        ),
        errorElement: <div>Error</div>,
        children: [
            {
                path: "",
                element: <Dashboard />,
            },
            {
                path: "/tickets",
                element: <Tickets />,
            },
            {
                path: "/tickets/new/",
                element: <NewTicket />,
            },
            {
                path: "/tickets/:ticketId",
                element: <TicketDetails />,
            },
            {
                path: "/projects",
                element: <Projects />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
