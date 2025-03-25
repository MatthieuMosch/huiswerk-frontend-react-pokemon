import {useEffect, useState} from "react";
import axios from "axios";
import './App.css'

import Button from "./components/button/Button.jsx";
import Card from "./components/card/Card.jsx";
import InfoBox from "./components/infobox/InfoBox.jsx";

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
            {loading && <InfoBox type="info">Loading...</InfoBox>}
            {errorMsg && <InfoBox type="error">{errorMsg}</InfoBox>}
            <h1>Gotta catch em all!</h1>
            <nav>
                <Button disabled={!uriPrev} uri={uriPrev} onClick={setUri20}>Vorige</Button>
                <Button disabled={!uriNext} uri={uriNext} onClick={setUri20}>Volgende</Button>
            </nav>
            <main>
                {pokemons.length > 0 && (
                    <ul>
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
