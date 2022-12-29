import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser";

export default function Projects() {
    const user = useCurrentUser();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/projects`, {
            credentials: "include",
        })
            .then((response) => response.json())
            .then((json) => setProjects(json));
    }, []);

    return (
        <>
            <h1 className="text-3xl font-bold">Projects</h1>
            <div className="w-full grid grid-cols-2 gap-4 mt-4">
                {projects.map((project) => (
                    <div
                        key={project._id}
                        className="border p-8 flex flex-col gap-2"
                    >
                        <Link className="link">
                            <h2 className="font-bold text-xl">
                                {project.name}
                            </h2>
                        </Link>
                        <p>{project.description}</p>
                    </div>
                ))}
            </div>
        </>
    );
}
