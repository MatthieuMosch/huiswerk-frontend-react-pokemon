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
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        async function fetchOnePokemon() {
            console.log('fetchOnePokemon');
            setLoading(true);
            try {
                const response = await axios.get(`${uri}/pokemon/ditto`);
                setPokemon(response.data);
                console.log(response.data);
            } catch (err) {
                console.error(err);
                setErrorMsg(err.message);
            } finally {
                setLoading(false);
            }
        }

        // void fetchOnePokemon();
    }, []);

    useEffect(() => {
        const fetch20Pokemon = async () => {
            console.log('fetch20Pokemon');
            setLoading(true);
            try {
                const response = await axios.get(`${uri}/pokemon?limit=20&offset=${offset}`);
                console.log(response.data);
                setPokemons(response.data.results);
            } catch (err) {
                console.error(err);
                setErrorMsg(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetch20Pokemon();
    }, [offset])

    return (
        <>
            <h1>Gotta catch em all!</h1>
            <p>offset : {offset}</p>
            <Button value={offset - 20} onClick={setOffset}>Vorige</Button>
            <Button value={offset + 20} onClick={setOffset}>Volgende</Button>
            <Card pokemon={pokemon}/>
            {
                pokemons.length > 0 &&
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
