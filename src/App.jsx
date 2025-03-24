import {useEffect, useState} from "react";
import axios from "axios";
import './App.css'

import Button from "./components/button/Button.jsx";
import Card from "./components/card/Card.jsx";
import makeUri20 from "./helpers/makeUri20.jsx";
import InfoBox from "./components/infobox/InfoBox.jsx";

function App() {
    const uri = "https://pokeapi.co/api/v2/";
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [pokemon, setPokemon] = useState({});
    const [pokemons, setPokemons] = useState([]);
    const [uri20, setUri20] = useState("https://pokeapi.co/api/v2/pokemon");
    const [uriPrev, setUriPrev] = useState(null);
    const [uriNext, setUriNext] = useState(null);

    useEffect(() => {
        async function fetchOnePokemon(name) {
            setLoading(true);
            try {
                const response = await axios.get(`${uri}/pokemon/${name}`);
                console.log(response.data);
                setPokemon(response.data);
            } catch (err) {
                console.error(err);
                setErrorMsg(err.message);
            } finally {
                setLoading(false);
            }
        }
        void fetchOnePokemon("zubat");
    }, []);

    useEffect(() => {
        const fetch20Pokemon = async () => {
            setLoading(true);
            try {
                const response = await axios.get(uri20);
                setUriPrev(response.data.previous);
                setUriNext(response.data.next);
                setPokemons(response.data.results);
            } catch (err) {
                console.error(err);
                setErrorMsg(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetch20Pokemon();
    }, [uri20])

    return (
        <>
            <h1>Gotta catch em all!</h1>
            {loading &&
                <InfoBox type="info">Loading...</InfoBox>
            }
            {errorMsg &&
                <InfoBox type="error">{errorMsg}</InfoBox>
            }
            <Card pokemon={pokemon}/>
            <Button disabled={!uriPrev} uri={uriPrev} onClick={setUri20}>Vorige</Button>
            <Button disabled={!uriNext} uri={uriNext} onClick={setUri20}>Volgende</Button>
            {pokemons.length > 0 &&
                <ul>
                    {pokemons.map((pokemon) => (
                        <li key={pokemon.name}>{pokemon.name}</li>
                    ))}
                </ul>
            }
        </>
    )
}

export default App
