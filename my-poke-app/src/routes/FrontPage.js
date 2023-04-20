import { useEffect, useState } from "react";
import Card from "../components/card";

function getIDFromPokemon(pokemon) {
  return pokemon.url
    .replace("https://pokeapi.co/api/v2/pokemon/", "")
    .replace("/", "");
}

function FrontPage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 9; //pagination

  useEffect(() => {
    setIsLoading(true);
    //pagination
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setIsLoading(false);
        setPokemonList([...json["results"]]);
      });
  }, [offset]);

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          {pokemonList.map((pokemon) => {
            const id = getIDFromPokemon(pokemon);
            return (
              <Card
                id={id}
                key={pokemon.id}
                title={pokemon.name}
                text="text"
                buttonText="like"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              />
            );
          })}
        </div>
        {isLoading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : null}
        <div>
          <button
            disabled={offset === 0}
            onClick={() => { 
              setOffset(offset - limit);
            }}
          >
            Previous
          </button>
          <button
            onClick={() => {
              setOffset (offset + limit);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default FrontPage;
