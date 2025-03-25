import {useEffect, useState} from "react";
import axios from "axios";
import "./Card.css";

import InfoBox from "../infobox/InfoBox.jsx";

function Card({uri}) {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [details, setDetails] = useState({});

    useEffect(() => {
        const controller = new AbortController();
        async function fetchOnePokemon() {
            setLoading(true);
            try {
                const response = await axios.get(uri, {signal: controller.signal});
                setDetails(response.data);
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log("Request: ", err.message);
                } else {
                    console.error(err);
                    setErrorMsg(err.message);
                }
            } finally {
                setLoading(false);
            }
        }
        void fetchOnePokemon();
        return () => {controller.abort();}
    }, []);

    return (
        <article>
            {loading && <InfoBox type="info">Loading...</InfoBox>}
            {errorMsg && <InfoBox type="error">{errorMsg}</InfoBox>}
            <h2>{details.name}</h2>
            {details.sprites && <img src={details.sprites.front_default}/>}
            {details.moves && <p>moves: {details.moves.length}</p>}
            <p>weight : {details.weight}</p>
            <p>abilities:</p>
            {details.abilities &&
                <ul>
                    {details.abilities.map((ability) => (
                        <li key={ability.ability.name}>{ability.ability.name}</li>
                    ))}
                </ul>}
        </article>
    );
}

export default Card;