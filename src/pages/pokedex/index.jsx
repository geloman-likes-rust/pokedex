import { useRef } from "react";
import { useState, useEffect } from "react";
import Card from "../../components/ui/card";
import usePokemons from "../../hooks/usePokemons";
import Observe from "../../utils/observer";
import "./style.css";
export default function () {
  const [offset, setOffset] = useState(0);
  const [data, error] = usePokemons(offset);
  const [pokemons, setPokemons] = useState([]);
  const loadMoreRef = useRef();
  useEffect(() => {
    Observe(loadMoreRef.current, setOffset);
  }, []);
  useEffect(() => {
    if (!data) return;
    setPokemons((pokemons) => [...pokemons, ...data]);
  }, [data]);
  if (error) {
    return (
      <>
        <h1>Error loading...</h1>
      </>
    );
  }
  return (
    <>
      <div className="pokemon-grid">
        {pokemons &&
          pokemons.map((pokemon, index) => (
            <div
              key={`${pokemon.name}-${index}`}
              className="pokemon-grid__item"
            >
              <Card name={pokemon.name} />
            </div>
          ))}
      </div>
      <img
        className="load-more"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1024px-Pok%C3%A9_Ball_icon.svg.png"
        ref={loadMoreRef}
        alt=""
      />
    </>
  );
}
