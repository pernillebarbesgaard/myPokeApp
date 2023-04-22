import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/card";
import "../css/frontpage.css";
import Pagination from "../components/Pagination";
import FilterBox from "../components/FilterBox";
import filterPokemon from "../helpers/filterPokemon.js";

function getIDFromPokemon(pokemon) {
  return parseInt(pokemon.url
    .replace(pokemon.url.includes("pokemon-species") ? 'https://pokeapi.co/api/v2/pokemon-species/' : 'https://pokeapi.co/api/v2/pokemon/', "")
    .replace("/", ""));
}

function sortListByUrl(list)
{
  return list.sort((a, b) => {
    return getIDFromPokemon(a) - getIDFromPokemon(b);
  });
}

function FrontPage() {
  const [generationsCached, setGenerationsCached] = useState([]);
  const [filterProperties, setFilterProperties] = useState([{ stats: [], height: 0, weight: 0, genRange: [], primaryType: "", secondaryType: "" }]);
  const [generation, setGeneration] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [currentPokemonList, setCurrentPokemonList] = useState([]);
  const [offset, setOffset] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [responsiveLimit, setResponsiveLimit] = useState(window.innerWidth < 1000 ? 3 : 5);
  const [limit, setLimit] = useState(5*responsiveLimit); 

  async function getGeneration(generationNum) {
    let pokemonArray = [];
    const promise =  await fetch(`https://pokeapi.co/api/v2/generation/${generationNum}`)
    .then(response => response.json())
    
    const promises = promise.pokemon_species.map(pokemon => fetch(`https://pokeapi.co/api/v2/pokemon/${getIDFromPokemon(pokemon)}/`).then(response => response.json()));
    pokemonArray = await Promise.all(promises);

    setPokemonList(prevList => [...prevList, ...pokemonArray]); // spread the array of pokemon into the state array
  }

  async function onFilterChange(newFilter)
  {
    setFilterProperties(newFilter);
  }



  useEffect(() => {
    function handleResize() {
      if(window.innerWidth < 600) {
        setResponsiveLimit(1);
      } else if (window.innerWidth < 1000) {
        setResponsiveLimit(3);
      } else {
        setResponsiveLimit(5);
    }  
  }  
    window.addEventListener('resize', handleResize);

    return () => {
    window.removeEventListener('resize', handleResize);
    };
    }, []);
  

  useEffect(() => {
    if(!generation || generation.length === 0) return;

    for (let i = 0; i < generation.length; i++) {
      if(!generationsCached.includes(generation[i]))
      {
        getGeneration(generation[i]);
        generationsCached.push(generation[i]);
        setLimit(5*responsiveLimit);
      };
    }


    console.log("generation: " + generation + " generationscached: " + generationsCached);
  }, [generation]);

  useEffect(() => {
    setOffset(min);
    console.log("min: " + min);
  }, [min]);

  useEffect(() => {
    function fetchPokemon() {
    setIsLoading(true);
    setCurrentPokemonList(filteredPokemonList ? filteredPokemonList.slice(offset, offset + limit) : []);
    setIsLoading(false);
    }
    fetchPokemon();
    console.log("offset: " + offset);
  }, [offset,max]);

  useEffect(() => {
    console.log("currentPokemonList" + currentPokemonList);
  }, [currentPokemonList]);

  useEffect(() => {
    console.log("pokemonList" + pokemonList);
  }, [pokemonList]);



  useEffect(() => {
    setGeneration(filterProperties.genRange);
    setFilteredPokemonList(filterPokemon(pokemonList, filterProperties));
    console.log("filterProperties: [" + filterProperties.genRange + "] " + filterProperties.height + " " + filterProperties.weight + " " + filterProperties.primaryType + " " + filterProperties.secondaryType);
  }, [filterProperties, pokemonList]);

  useEffect(() => {
    console.log("filteredPokemonList: " + filteredPokemonList)
    if(filteredPokemonList === undefined) return;
    setMax(filteredPokemonList.length);
    setMin(1);
    setOffset(1);
  }, [filteredPokemonList]);

  return (
    <div className="App">
      <div className="filtercontainer"><FilterBox callback={onFilterChange}/></div>
      <div className="container">
      {
        
      Array.from(currentPokemonList)
        .reduce((rows, pokemon, index) => {
          if (index % responsiveLimit === 0) rows.push([]);
          rows[rows.length - 1].push(pokemon);
          return rows;
        }, [])
        .map((row, index) => (
          <div className="row" key={index}>
            {row.map((pokemon) => {
              return (
                <div className="col-2" key={pokemon.id}>
                  <Card
                    id={pokemon.id}
                    pokemonData={pokemon}
                  />
                </div>
              );
            })}
          </div>
        ))}
      {isLoading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : null}
      </div>
      <Pagination
        limit={limit}
        offset={offset}
        max={max}
        min={min}
        setOffset={setOffset}
        setLimit={setLimit}
        responsiveLimit={responsiveLimit}
      />
    </div>
  );
}


export default (FrontPage);