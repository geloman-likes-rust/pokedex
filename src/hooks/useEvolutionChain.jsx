import { useState, useEffect } from "react";
import usePokemon from "./usePokemon";

const ENDPOINT = "https://pokeapi.co/api/v2/evolution-chain";

function evolutionList(evolutionChain) {
  let species = [];
  species.push(evolutionChain.species.name);
  let evolution = evolutionChain.evolves_to;
  while (evolution.length !== 0) {
    species.push(evolution[0].species.name);
    evolution = evolution[0].evolves_to;
  }
  return species;
}

async function getPokemon(pokemon, callback) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const data = await response.json();
  return callback(data.id);
}

export default function (pokemonId) {
  const [evolutionChain, setEvolutionChain] = useState([]);
  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(`${ENDPOINT}/${pokemonId}`);
        const data = await response.json();
        setEvolutionChain([evolutionList(data.chain), null]);
      } catch (error) {
        setEvolutionChain([null, error]);
      }
    })();
  }, [pokemonId]);
  return evolutionChain;
}
