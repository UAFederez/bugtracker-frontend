export default function ListFilter({
    list,

    // The current state of all the filters
    filters,

    // The property of the ticket for filtering used to index into
    // filters ("status", "severity", "project")
    keyName,

    // Can be null if the options are the values themselves, e.g., the text
    // shown is "Resolved" but the value is also "Resolved"
    idField,

    // Can be null if the options to show
    // the project name is shown on the list rather than the idField even though
    // filter by the idField
    displayField,

    handleFilterChange,
}) {
    return (
        <>
            <div className="flex gap-1 items-center mb-1">
                <input
                    type="radio"
                    value={"any"}
                    onChange={(event) => handleFilterChange(event, keyName)}
                    checked={filters[keyName].length === 0}
                    className="w-4 h-4 shrink-0 mb-2"
                />
                <label className="text-sm">Any {keyName}</label>
            </div>
            <div className="flex flex-col gap-2">
                {list.map((item) => (
                    <div
                        key={idField ? item[idField] : item}
                        className="flex gap-2"
                    >
                        <input
                            type="checkbox"
                            value={idField ? item[idField] : item}
                            checked={filters[keyName].includes(
                                idField ? item[idField] : item
                            )}
                            onChange={(event) =>
                                handleFilterChange(event, keyName)
                            }
                            className="w-4 h-4 shrink-0"
                        />
                        <p className="text-sm">
                            {displayField ? item[displayField] : item}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
}
