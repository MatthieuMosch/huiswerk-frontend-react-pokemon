import {useEffect, useState} from "react";
import axios from "axios";
import './App.css'

import Card from "./components/card/Card.jsx";
import InfoBox from "./components/infobox/InfoBox.jsx";
import Nav from "./components/nav/Nav.jsx";

function App() {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [pokemons, setPokemons] = useState([]);
    const [uri20, setUri20] = useState("https://pokeapi.co/api/v2/pokemon");
    const [uriPrev, setUriPrev] = useState(null);
    const [uriNext, setUriNext] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const fetch20Pokemon = async () => {
            setErrorMsg("");
            setLoading(true);
            try {
                const response = await axios.get(uri20, {signal: controller.signal});
                setUriPrev(response.data.previous);
                setUriNext(response.data.next);
                setPokemons(response.data.results);
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
        fetch20Pokemon();
        return () => {controller.abort();}
    }, [uri20])

    return (
        <>
            <header>
                <h1>Gotta catch em all!</h1>
                {loading && <InfoBox type="info">Loading...</InfoBox>}
                {errorMsg && <InfoBox type="error">{errorMsg}</InfoBox>}
                <Nav uriPrev={uriPrev} uriNext={uriNext} onClick={setUri20}/>
            </header>
            <main>
                {pokemons.length > 0 && (
                    <ul className="deck">
                        {pokemons.map((pokemon) => (
                            <Card key={pokemon.name} uri={pokemon.url}/>
                        ))}
                    </ul>
                )}
            </main>
        </>
    )
}

export default App
