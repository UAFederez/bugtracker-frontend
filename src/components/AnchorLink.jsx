export default function AnchorLink({ children, href, className, ...rest }) {
    return (
        <a
            href={href}
            className={`hover:text-sky-700 underline text-sky-500`}
            {...rest}
        >
            {children}
        </a>
    );
}
