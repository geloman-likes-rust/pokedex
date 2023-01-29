import { useEffect, useState } from "react";
import { fetchPokemon, flatPokemon } from "../utils/pagination";

const ENDPOINT = "https://pokeapi.co/api/v2/pokemon";

export default function (pokemon) {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    (async function () {
      const [data, error] = await fetchPokemon(pokemon);
      setPokemonData([flatPokemon(data), error]);
    })();
  }, [pokemon]);

  return pokemonData;
}
