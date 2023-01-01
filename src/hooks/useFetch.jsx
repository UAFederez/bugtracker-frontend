import { useEffect, useState } from "react";

export default function useFetch(route) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}${route}`)
            .then((response) => response.json())
            .then((json) => {
                setLoading(false);
                console.log(json);
                setData(json);
            })
            .catch((error) => {
                setError(error);
            });
    }, []);

    return [data, loading, error];
}
