import "./Nav.css";

import Button from "../button/Button.jsx";

function Nav({uriPrev, uriNext, onClick}) {
    return (
        <nav>
            <Button disabled={!uriPrev} uri={uriPrev} onClick={onClick}>Vorige</Button>
            <Button disabled={!uriNext} uri={uriNext} onClick={onClick}>Volgende</Button>
        </nav>
    );
}

export default Nav;