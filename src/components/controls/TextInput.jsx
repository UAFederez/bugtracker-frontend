export default function TextInput({ children, className, ...rest }) {
    return (
        <input
            className={`${className} bg-indigo-50 rounded-md py-2 px-4`}
            {...rest}
        />
    );
}
