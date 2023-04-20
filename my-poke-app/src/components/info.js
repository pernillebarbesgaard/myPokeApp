import { useEffect, useState } from "react";

function Info(props) {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${props.id}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setPokemon(json);
      });
  }, [props.id]);

  return (
    <div className="card col-4 d-flex justify-content-center">
      <img src = {`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.id}.png`}className="card-img-top" alt="..." />
      <div className="card-body">
        <h1 className="card-title">{pokemon.name}</h1>
        <h1 className="card-title">Types:</h1>
        <ul>
          {pokemon.types &&
            pokemon.types.map((type, index) => (
              <li key={index}>{type.type.name}</li>
            ))}
        </ul>
        <h1 className="card-title">Stats:</h1>
        <table>
          <thead>
            <tr>
              <th>Stat</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {pokemon.stats &&
              pokemon.stats.map((stat) => (
                <tr key={stat.stat.name}>
                  <td>{stat.stat.name}</td>
                  <td>{stat.base_stat}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <h1 className="card-title">Abilities:</h1>
        <ul>
          {pokemon.abilities &&
            pokemon.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
        </ul>
        <p className="card-text">weight: {pokemon.weight}</p>
        <p className="card-text">height {pokemon.height}</p>
      </div>
    </div>
  );
}

export default Info;
