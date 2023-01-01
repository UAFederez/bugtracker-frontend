import { useEffect, useMemo, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";

export default function NewTicket() {
    const [projects, isLoadingProj, projError] = useFetch("/api/projects");
    const [versions, isLoadingVer, verError] = useFetch("/api/versions");
    const [currProjId, setCurrProjId] = useState(null);

    useEffect(() => {
        if (projects) setCurrProjId(projects[0]._id);
    }, [projects]);

    const filteredVersions = useMemo(() => {
        if (versions)
            return versions.filter(
                (version) => version.projectId === currProjId
            );
        else return [];
    }, [versions, currProjId]);

    const handleProjectSelect = (event) => {
        setCurrProjId(event.target.value);
    };

    const handleTicketSubmit = async (event) => {
        event.preventDefault();
    };

    if (isLoadingProj || isLoadingVer) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <form onSubmit={handleTicketSubmit}>
                <div>
                    <select
                        onChange={handleProjectSelect}
                        defaultValue={projects[0]._id}
                    >
                        {projects.map((project, idx) => (
                            <option key={project._id} value={project._id}>
                                {project.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <select>
                        {filteredVersions.map((version) => (
                            <option key={version._id} value={version._id}>
                                {version.major}.{version.minor}.{version.patch}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="border"
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        rows="4"
                        cols="50"
                        id="description"
                        name="description"
                        className="border"
                    ></textarea>
                </div>
                <div></div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            {currProjId}
        </div>
    );
}
