import React, { useCallback, useEffect, useState } from "react";
import "../css/filterbox.css";
import Button from "./Button.js";
import { type } from "@testing-library/user-event/dist/type";


function FilterBox({ callback }) {
  const types = [
    "bug",
    "dark",
    "dragon",
    "electric",
    "fairy",
    "fighting",
    "fire",
    "flying",
    "ghost",
    "grass",
    "ground",
    "ice",
    "normal",
    "poison",
    "psychic",
    "rock",
    "steel",
    "water",
  ];
  const [typeToggle, setTypeToggle] = useState("primary");
  const [filter, setFilter] = useState({
    stats: [],
    height: false,
    weight: false,
    genRange: [],
    primaryType: "",
    secondaryType: "",
    toggle: false,
  });

  useEffect(() => {
    callback(filter);
  }, [filter]);

  const handleTypeToggleClick = useCallback((toggle) => {
    setTypeToggle((prevTypeToggle) => {
      return toggle;
    });
  }, [typeToggle]);

  const handlePTypeClick = useCallback(
    (type) => {
      setFilter((prevFilter) => {
        return {
          ...prevFilter,
          primaryType: prevFilter.primaryType === type ? "" : type,
        };
      });
    },
    [filter]
  );

  const handleSTypeClick = useCallback(
    (type) => {
      setFilter((prevFilter) => {
        return {
          ...prevFilter,
          secondaryType: prevFilter.secondaryType === type ? "" : type,
        };
      });
    },
    [filter]
  );

  const handleStatClick = useCallback(
    (statName) => {
      setFilter((prevFilter) => {
        return {
          ...prevFilter, height: false, weight: false,
          stats: prevFilter.stats.includes(statName)
            ? prevFilter.stats.filter((x) => x !== statName)
            : prevFilter.stats.concat(statName),
        };
      });
    },
    [filter]
  );

  const handleOtherClick = useCallback((label) => {
    setFilter((prevFilter) => {
      if (label === "height") {
        return { ...prevFilter, stats: [], height: !prevFilter.height, weight: !prevFilter.height ? false : prevFilter.weight };
      }
      if (label === "weight") {
        return { ...prevFilter, stats: [], weight: !prevFilter.weight, height: !prevFilter.weight ? false : prevFilter.height};
      }
    });
    },[filter]
  );

  const handleSortToggle = useCallback((toggle) => {
    setFilter((prevFilter) => {
      
        return { ...prevFilter, toggle: !prevFilter.toggle };
      
    });
    },[filter]
  );

  const handleGenClick = useCallback(
    (gen) => {
if (gen === "all") {
  setFilter((prevState) => {
    return {
      ...prevState,
      genRange: prevState.genRange.length > 0 ? [] : [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  });
  return;
}

      setFilter((prevState) => {
        if (prevState.genRange.includes(gen)) {
          return {
            ...prevState,
            genRange: prevState.genRange.filter((x) => x !== gen),
          };
        } else {
          return {
            ...prevState,
            genRange: [gen, ...prevState.genRange],
          };
        }
      });
    },
    [filter]
  );

  return (
    <div className="filterbox">
      <h3>Filters:</h3>
      <div>
        <div className="type-container">
          <Button
          key={1}
          label={"primary"}
          callback={handleTypeToggleClick}
          id={1}
          highlighted={typeToggle === "primary"}
          />
          <Button
          key={1}
          label={"secondary"}
          callback={handleTypeToggleClick}
          id={1}
          highlighted={typeToggle === "secondary"}
          />
          {typeToggle === "primary" && 
          <div className="primaryTypeContainer">
          {Array.from(types)
            .reduce((rows, type, index) => {
              if (index % 6 === 0) rows.push([]);
              rows[rows.length - 1].push(type);
              return rows;
            }, [])
            .map((row, index) => (
              <div className="row" key={index}>
                {row.map((type, i) => {
                  return (
                    <Button
                      key={(index + 1) * (i + 1)}
                      label={type}
                      callback={handlePTypeClick}
                      id={(index + 1) * (i + 1)}
                      highlighted={filter.primaryType === type}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          }
          {typeToggle === "secondary" &&
          <div className="secondaryTypeContainer">
          {Array.from(types)
            .reduce((rows, type, index) => {
              if (index % 6 === 0) rows.push([]);
              rows[rows.length - 1].push(type);
              return rows;
            }, [])
            .map((row, index) => (
              <div className="row" key={index}>
                {row.map((type, i) => {
                  return (
                    <Button
                      key={(index + 1) * (i + 1)}
                      label={type}
                      callback={handleSTypeClick}
                      id={(index + 1) * (i + 1)}
                      highlighted={filter.secondaryType === type}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        }
        </div>
        
        <div className="gen-container">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, "all"].map((gen) => (
            <Button
              key={gen}
              label={gen}
              callback={handleGenClick}
              highlighted={filter.genRange.includes(gen)}
            />
          ))}
        </div>

        <div className="stat-container">
          {[
            "hp",
            "attack",
            "defense",
            "special-attack",
            "special-defense",
            "speed",
          ].map((statName, index) => (
            <Button
              key={index}
              label={statName}
              callback={handleStatClick}
              highlighted={filter.stats.includes(statName)}
            />
          ))}
        </div>

        <div className="other-container">
          <Button
            key={1}
            label={"height"}
            callback={handleOtherClick}
            highlighted={filter.height}
          />
          <Button
            key={2}
            label={"weight"}
            callback={handleOtherClick}
            highlighted={filter.weight}
          />
        </div>

        <div className="direction-container">
          <Button
            key={1}
            label={filter.toggle ? "V" : "^"}
            callback={handleSortToggle}
            highlighted={filter.toggle}
          />
        </div>
      </div>
    </div>
  );
}

export default FilterBox;
