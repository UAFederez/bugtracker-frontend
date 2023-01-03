import { useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function NewTicket() {
    const [projects, isLoadingProj, projError] = useFetch("/api/projects");
    const [versions, isLoadingVer, verError] = useFetch("/api/versions");
    const navigate = useNavigate();

    const currProjectSelect = useRef(null);
    const currVersionSelect = useRef(null);
    const currTitleInput = useRef(null);
    const currSeverityInput = useRef(null);
    const currDescriptionInput = useRef(null);

    const filteredVersions = useMemo(() => {
        if (currProjectSelect.current)
            return versions.filter(
                (version) =>
                    version.projectId === currProjectSelect.current.value
            );
        else return [];
    }, [currProjectSelect.current?.value]);

    const handleProjectSelect = (event) => {
        setCurrProjId(event.target.value);
    };

    const handleTicketSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/tickets/new`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    versionId: currVersionSelect.current.value,
                    projectId: currProjectSelect.current.value,
                    title: currTitleInput.current.value,
                    description: currDescriptionInput.current.value,
                    severity: currSeverityInput.current.value,
                }),
            }
        );
        const json = await response.json();
        console.log(json);
        navigate("/tickets");
    };

    if (isLoadingProj || isLoadingVer) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1 className="font-bold text-3xl mb-8">Tickets</h1>
            <form onSubmit={handleTicketSubmit}>
                <div className="grid grid-cols-3 gap-8">
                    <div>
                        <h2 className="font-bold">Project Information</h2>
                        <p className="text-zinc-700">
                            Here is where you can select which project and
                            version has a bug you want to report.
                        </p>
                    </div>
                    <div className="flex flex-col gap-1 ">
                        <label htmlFor="version">Project</label>
                        <select
                            id="version"
                            name="version"
                            className="p-2"
                            ref={currProjectSelect}
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
                    <div className="flex flex-col gap-1">
                        <label htmlFor="version">Version</label>
                        <select
                            name="version"
                            id="version"
                            className="p-2"
                            ref={currVersionSelect}
                        >
                            {filteredVersions.map((version) => (
                                <option key={version._id} value={version._id}>
                                    {version.major}.{version.minor}.
                                    {version.patch}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="row-span-2">
                        <h2 className="font-bold">Ticket Details</h2>
                        <p className="text-zinc-700">
                            Make sure to concisely provide the necessary
                            information to reproduce the problem you've been
                            having. If you feel it is necessary, you may even
                            state details such as the configuration of your
                            system to help narrow down the issue.
                        </p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="border p-2"
                            ref={currTitleInput}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="severity">Severity</label>
                        <select
                            name="severity"
                            id="severity"
                            className="p-2"
                            ref={currSeverityInput}
                        >
                            <option value={"Low"}>Low</option>
                            <option value={"Medium"}>Medium</option>
                            <option value={"High"}>High</option>
                        </select>
                    </div>
                    <div className="col-span-2 flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="description">Description</label>
                            <textarea
                                rows="4"
                                cols="50"
                                id="description"
                                name="description"
                                className="border p-2"
                                ref={currDescriptionInput}
                            ></textarea>
                        </div>
                        <div className="col-span-2 flex justify-end">
                            <button type="submit" className="btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
