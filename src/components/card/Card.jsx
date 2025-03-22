import "./Card.css";

function Card({pokemon}) {
    return (
        <article>
            <h2>{pokemon.name}</h2>
            {pokemon.sprites &&
                <img src={pokemon.sprites.front_default}/>
            }
            {pokemon.moves &&
                <p>moves: {pokemon.moves.length}</p>
            }
            <p>weight : {pokemon.weight}</p>
            <p>abilities:</p>
            {pokemon.abilities &&
                <ul>
                    {pokemon.abilities.map((ability) => (
                        <li key={ability.ability.name}>{ability.ability.name}</li>
                    ))}
                </ul>}
        </article>
    );
}

export default Card;