import { useEffect, useState } from "react";

export default function useCurrentUser() {
    const [user, setUser] = useState([]);
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/currentUser`, {
            credentials: "include",
        })
            .then((response) => response.json())
            .then((json) => {
                setUser(json);
            });
    }, []);

    return user;
}
