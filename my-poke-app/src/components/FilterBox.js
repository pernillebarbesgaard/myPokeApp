import React, { useEffect, useState, useCallback } from 'react';

function FilterBox({ callback }) {
  const types = ["bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying", "ghost", "grass", "ground", "ice", "normal", "poison", "psychic", "rock", "steel", "water"]
  const [filter, setFilter] = useState({ stats: [], height: 0, weight: 0, genRange: [], primaryType: "", secondaryType: "" });

  const handleFilterChange = useCallback(
    (newFilter) => {
        callback(newFilter);
    },
    [callback]
  );

  useEffect(() => {
    handleFilterChange(filter);
  }, [filter, handleFilterChange]);

  const handleTypeClick = (type) => {
    const newType = filter.primaryType === type ? "" : type
    setFilter({ ...filter, primaryType: newType });
  };
  
  const handleGenClick = (gen) => {
    const newGenRange = filter.genRange.includes(gen)
      ? filter.genRange.filter((x) => x !== gen)
      : filter.genRange.concat(gen);
    setFilter({ ...filter, genRange: newGenRange });
  };

  return (
    <div>
      <h3>Filters:</h3>
      <div>
        <div>
          {types.map((type, i) => (
            <button key={i} onClick={() => handleTypeClick(type)}>
              {type}
            </button>
          ))}
        </div>
        <div>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((gen) => (
            <button key={gen} onClick={() => handleGenClick(gen)}>
              Gen {gen}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBox;
