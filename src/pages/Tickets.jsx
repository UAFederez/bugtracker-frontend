import { useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ListFilter from "../components/ListFilter";
import formatDateNatural from "../utils/formatDateNatural";

// TODO: Fetch from db
const severities = ["Low", "Medium", "High"];
const statuses = ["Pending", "In Progress", "Closed", "Resolved"];

// TODO: potentially

export default function Tickets() {
    const [tickets, setTickets] = useState([]);
    const [projects, setProjects] = useState([]);
    const [filters, setFilters] = useState({
        status: [],
        severity: [],
        projectId: [],
    });
    const [queryString, setQueryString] = useState("");
    const [isLoadingTickets, setLoadingTickets] = useState(false);
    const [searchParams, setSearcParams] = useSearchParams();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/projects`, {
            credentials: "include",
        })
            .then((response) => response.json())
            .then((json) => setProjects(json));

        for (const entry of searchParams.entries()) {
            const [key, value] = entry;
            filters[key] = value ? value.split(",") : [];
            console.log(key, value);
        }
        performQuery();
    }, []);

    const performQuery = async () => {
        setLoadingTickets(true);
        const queryFilter = filters;
        queryFilter.queryString = queryString;
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/tickets/filter/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(queryFilter),
            }
        );
        const json = await response.json();
        setLoadingTickets(false);
        setTickets(json);
    };

    useEffect(() => {
        const newParams = {
            status: filters.status.join(","),
            projectId: filters.projectId.join(","),
            severity: filters.severity.join(","),
        };
        setSearcParams(newParams);
    }, [filters]);

    const handleFilterChange = (event, key) => {
        /**
         * If the checked value is the "any" option (any "key" from [project, status, severity])
         * then the filter for that key should just be cleared to make sure all tickets are
         * included based on this property
         */
        if (event.target.value === "any") {
            setFilters((prev) => ({
                ...prev,
                [key]: [],
            }));
            return;
        }

        /**
         * Otherwise, then the user must have checked (or unchecked) any one of the actual
         * options. For the latter, that value is simply removed from the set to filter from,
         * otherwise, it is then included in the new list of values.
         */
        if (!event.target.checked) {
            setFilters((prev) => ({
                ...prev,
                [key]: prev[key].filter(
                    (current) => current !== event.target.value
                ),
            }));
            return;
        }
        setFilters((prev) => ({
            ...prev,
            [key]: [...prev[key], event.target.value],
        }));
    };

    return (
        <>
            <h1 className="text-3xl font-bold mb-4">Tickets</h1>
            <div className="grid grid-cols-12 mt-4 gap-8">
                <div className="col-span-3">
                    <div className="sticky top-16 flex flex-col gap-4">
                        <div>
                            <h3 className="font-bold mb-2">By severity</h3>
                            <ListFilter
                                list={severities}
                                filters={filters}
                                keyName={"severity"}
                                idField={null}
                                displayField={null}
                                handleFilterChange={handleFilterChange}
                            />
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">By status</h3>
                            <ListFilter
                                list={statuses}
                                filters={filters}
                                keyName={"status"}
                                idField={null}
                                displayField={null}
                                handleFilterChange={handleFilterChange}
                            />
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">By project</h3>
                            <ListFilter
                                list={projects}
                                filters={filters}
                                keyName={"projectId"}
                                idField={"_id"}
                                displayField={"name"}
                                handleFilterChange={handleFilterChange}
                            />
                        </div>
                        <div>
                            <button
                                onClick={performQuery}
                                className="border text-zinc-800 hover:bg-zinc-800 hover:text-zinc-50 w-full"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-span-9 flex flex-col gap-4">
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            performQuery();
                        }}
                    >
                        <div className="flex border border-zinc-200 text-zinc-800 items-stretch mb-4">
                            <div className="flex items-center justify-center w-12 aspect-square">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={queryString}
                                onChange={(event) =>
                                    setQueryString(event.target.value)
                                }
                                placeholder="Search for tickets"
                                className="w-full p-2"
                            />
                            <button
                                type="submit"
                                className="bg-white border-l text-zinc-800 hover:outline hover:bg-zinc-800 hover:text-zinc-50 px-4"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                    {isLoadingTickets ? (
                        <div>Loading...</div>
                    ) : (
                        tickets.map((ticket) => (
                            <Link
                                key={ticket._id}
                                to={`/tickets/${ticket._id}`}
                                className=""
                            >
                                <div className="py-4 border-b">
                                    <div className="flex flex-col gap-4 justify-between">
                                        <div className="flex gap-1">
                                            <p className="bg-zinc-200 text-zinc-800 px-2 py-1 rounded-full text-sm">
                                                {ticket.status}
                                            </p>
                                            <p className="bg-zinc-200 text-zinc-800 px-2 py-1 rounded-full text-sm">
                                                {ticket.severity}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="italic text-zinc-700 text-sm">
                                                {ticket.projectId.name}
                                            </h4>
                                            <h5 className="font-bold text-lg">
                                                {ticket.title}
                                            </h5>
                                        </div>
                                    </div>
                                    <pre className="font-sans line-clamp-1">
                                        {ticket.description}
                                    </pre>
                                    <div className="text-sm mt-2 flex flex-col gap-2">
                                        <div className="flex items-center gap-1 text-zinc-700">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-4 h-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                                />
                                            </svg>

                                            <p>
                                                Submitted by{" "}
                                                <span className="border-b border-zinc-200 hover:border-zinc-400">
                                                    {
                                                        ticket.reporterId
                                                            .firstName
                                                    }{" "}
                                                    {ticket.reporterId.lastName}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1 text-zinc-700">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-4 h-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            <p>
                                                Posted{" "}
                                                {formatDateNatural(
                                                    new Date(
                                                        ticket.dateSubmitted
                                                    )
                                                )}{" "}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
