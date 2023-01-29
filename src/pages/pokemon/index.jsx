import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePokemon from "../../hooks/usePokemon";
import usePagination from "../../hooks/usePagination";
import color from "../../data/pokemon-type-color.json";
import "./style.css";

export default function () {
  const { pokemon } = useParams();
  const [data, error] = usePokemon(pokemon);
  const [encounters, setEncounters] = useState([]);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState([]);
  const [prev, next] = pagination;

  useEffect(() => {
    (async function () {
      if (!data) return;
      const [prevPokemon, nextPokemon] = await usePagination(data.id.primary);
      setPagination([prevPokemon, nextPokemon]);
      const response = await fetch(data.encounters);
      const encounter_data = await response.json();
      setEncounters(encounter_data.map((area) => area.location_area.name));
    })();
  }, [data]);
  return (
    <div className="pokemon-page">
      <div className="pokemon-page__pagination">
        <button
          onClick={() => {
            const [passed, failed] = prev;
            if (failed) return;
            navigate(`/pokedex/${passed.name}`);
          }}
          className="pagination__button-prev"
        >
          prev
        </button>
        <button
          onClick={() => {
            const [passed, failed] = next;
            if (failed) return;
            navigate(`/pokedex/${passed.name}`);
          }}
          className="pagination__button-next"
        >
          next
        </button>
      </div>
      <div className="pokemon-page__pokemon-name">
        {data?.name}{" "}
        <span className="pokemon-name__id">#{data?.id.secondary}</span>
      </div>
      <div className="pokemon-page__content">
        <div className="content__primary">
          <img
            draggable={false}
            className="primary__pokemon-img"
            src={
              data?.sprite
                ? data.sprite
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1024px-Pok%C3%A9_Ball_icon.svg.png"
            }
            alt=""
          />
          <div className="primary__pokemon-abilities">
            <p className="pokemon-abilities__title">abilities</p>
            {data?.abilities.map((ability, index) => {
              return (
                <div
                  className="pokemon-abilities__ability"
                  key={`${data?.name}-${ability}-${index}`}
                >
                  {ability}
                </div>
              );
            })}
          </div>
          <div className="primary__pokemon-types">
            <span className="pokemon-types__title">types</span>
            {data?.types.map((type) => {
              return (
                <span
                  className="pokemon-types__type"
                  style={{ background: color[type] }}
                  key={`${data?.name}-${type}`}
                >
                  {type}
                </span>
              );
            })}
          </div>
        </div>
        <div className="content__secondary">
          <ul className="secondary__pokemon-stats">
            {data?.stats.map((stat, index) => {
              return (
                <li
                  key={`${data?.name}-${index}`}
                  className="pokemon-stats__stat"
                >
                  {(function () {
                    for (let key in stat) {
                      return (
                        <>
                          <span className="stat__name">{key}</span>
                          <span className="stat__base">{stat[key]}</span>
                        </>
                      );
                    }
                  })()}
                </li>
              );
            })}
          </ul>
          <div className="secondary__pokemon-info">
            <div className="pokemon-info__encounter-location">
              <span className="encounter-location__title">encounter</span>
              <div className="encounter-location__grid">
                {encounters &&
                  encounters.map((area, index) => {
                    if (index >= 10) return;
                    return (
                      <span key={area} className="grid__item">
                        {area}
                      </span>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
