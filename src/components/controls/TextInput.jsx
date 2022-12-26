export default function TextInput({ children, Ref, className, ...rest }) {
    return (
        <input
            className={`${className} bg-indigo-50 rounded-md py-2 px-4`}
            ref={Ref}
            {...rest}
        />
    );
}
