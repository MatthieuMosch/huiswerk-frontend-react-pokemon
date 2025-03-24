import "./InfoBox.css";

function InfoBox({type, children}) {
    return (
        <dialog open className={`dialog-${type}`}>
            {children}
        </dialog>
    );
}

export default InfoBox;