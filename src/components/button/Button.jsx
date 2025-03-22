function Button({value, onClick, children}) {
    return (
        <button
            type="button"
            disabled={value<0}
            onClick={() => onClick(value)}>
            {children}
        </button>
    );
}

export default Button;