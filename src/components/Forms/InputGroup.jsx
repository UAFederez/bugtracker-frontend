export default function InputGroup({ children, className, ...rest }) {
    return (
        <div className={`${className} flex flex-col gap-1`} {...rest}>
            {children}
        </div>
    );
}
