import { useEffect, useState } from "react";

const ENDPOINT = "https://pokeapi.co/api/v2/pokemon";
const LIMIT = 20;
export default function (offset) {
  const [pokemonList, setPokemonList] = useState([]);
  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(
          `${ENDPOINT}/?limit=${LIMIT}&offset=${offset * 20}`
        );
        const data = await response.json();
        const pokemon_list = [...data.results];
        setPokemonList([pokemon_list, null]);
      } catch (error) {
        setPokemonList(null, error);
      }
    })();
  }, [offset]);

  return pokemonList;
}
