export default function CTAButton({ children, className, ...rest }) {
    return (
        <button
            className={`${className} bg-indigo-500 text-indigo-50 hover:bg-indigo-700  py-2 px-4 font-bold rounded-md`}
            {...rest}
        >
            {children}
        </button>
    );
}
