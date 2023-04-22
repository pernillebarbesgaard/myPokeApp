import genRangeFromGeneration from './genRangeFromGeneration.js';
function filterPokemon(pokemonList, filters) {

    function equals(str1, str2) {
        if (typeof str2 !== 'string') return false;
        if (typeof str1 !== 'string') return false;
        if (str1.length !== str2.length) {
          return false;
        }
        for (let i = 0; i < str1.length; i++) {
          if (str1[i] !== str2[i]) {
            return false;
          }
        }
        return true;
      }
      

    // Create a new array to hold the filtered Pokemon
      console.log("filter called:" + pokemonList.length + " filters: " + filters.genRange + " " + filters.height + " " + filters.weight + " " + filters.primaryType + " " + filters.secondaryType)


    if (!pokemonList) return;

    let filteredPokemon = pokemonList.filter((pokemon) => {
    if (filters.genRange && !filters.genRange.includes(genRangeFromGeneration(pokemon.id))) {
        return false;
    }
    if (filters.primaryType && !equals(filters.primaryType, pokemon.types[0].type.name)) {
        return false;
    }
    if (filters.secondaryType && pokemon.types.length === 2  && equals(filters.secondaryType,pokemon.types[1].type.name)) {
        //return false;
    }
    return true;
    });
    
    console.log("filter function return list size:" + filteredPokemon.length)


    if(filters.stats && filters.stats.length > 0)
    {
        const totalStats = filters.stats.reduce((accumulator, current) => accumulator + current.value, 0);
        filteredPokemon = filteredPokemon.sort((a, b) => {
            const aTotal = a.stats.map(stat => {if(stat.name === filters.stats.includes(stat.name)) return stat}).reduce((accumulator, current) => accumulator + current.base_stat, 0);
            const bTotal = b.stats.map(stat => {if(stat.name === filters.stats.includes(stat.name)) return stat}).reduce((accumulator, current) => accumulator + current.base_stat, 0);
            return bTotal - aTotal;
        })
    }
    if(filters.height != 0)
    {
        filteredPokemon = filteredPokemon.sort((a, b) => {
            return b.height - a.height;
        })
    }
    else if(filters.weight != 0)
    {
        filteredPokemon = filteredPokemon.sort((a, b) => {
            return b.weight - a.weight;
        })
    }
    else {
        filteredPokemon = filteredPokemon.sort((a, b) => {
        return a.id - b.id;
    })}
    
    
  
    console.log("filter function return list size:" + filteredPokemon.length)

    return filteredPokemon;
  } export default filterPokemon;