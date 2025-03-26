import "./InfoBox.css";

function InfoBox({type, children}) {
    return (
        <p className={`dialog-${type}`}>
            {children}
        </p>
    );
}

export default InfoBox;