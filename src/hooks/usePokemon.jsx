import { useEffect, useState } from "react";

const ENDPOINT = "https://pokeapi.co/api/v2/pokemon";

export default function (pokemon) {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(`${ENDPOINT}/${pokemon}`);
        const data = await response.json();
        setPokemonData([data, null]);
      } catch (error) {
        setPokemonData([null, error]);
      }
    })();
  }, [pokemon]);

  return pokemonData;
}
