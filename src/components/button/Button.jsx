import makeUri20 from "../../helpers/makeUri20.jsx";

function Button({disabled, uri, onClick, children}) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={() => onClick(makeUri20(uri))}
        >
            {children}
        </button>
    );
}

export default Button;