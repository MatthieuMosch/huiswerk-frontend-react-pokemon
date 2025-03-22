import {useEffect, useState} from "react";
import axios from "axios";
import './App.css'

import Button from "./components/button/Button.jsx";
import Card from "./components/card/Card.jsx";

function App() {
    const uri = "https://pokeapi.co/api/v2/";
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [offset, setOffset] = useState(0);
    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        async function fetchPokemon() {
            console.log('fetchPokemon');
            setLoading(true);
            try {
                const response = await axios.get(`${uri}/pokemon/zubat`);
                setPokemon(response.data);
                console.log(response.data);
            } catch (err) {
                console.error(err);
                setErrorMsg(err.message);
            } finally {
                setLoading(false);
            }
        }
        void fetchPokemon();
    }, []);

    return (
        <>
            <h1>Gotta catch em all!</h1>
            <p>offset : {offset}</p>
            <Button value={offset-20} onClick={setOffset}>Vorige</Button>
            <Button value={offset+20} onClick={setOffset}>Volgende</Button>
            <Card pokemon={pokemon}/>
        </>
    )
}

export default App
