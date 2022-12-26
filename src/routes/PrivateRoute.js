import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/auth/currentUser`,
                { method: "GET", credentials: "include" }
            );
            if (response.status !== 200) navigate("/login");
        })();
    }, []);

    return children;
}
