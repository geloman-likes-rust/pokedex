import { flatPokemon, fetchPokemon } from "../utils/pagination";

async function prevPokemon(pokemonId) {
  const MAX_ID = 1008;
  const [data, error] = await fetchPokemon(
    pokemonId === 1 ? MAX_ID : pokemonId - 1
  );
  if (error) return [null, error];
  return [flatPokemon(data), null];
}

async function nextPokemon(pokemonId) {
  const [data, error] = await fetchPokemon(
    pokemonId === 1008 ? 1 : ++pokemonId
  );
  if (error) return [null, error];
  return [flatPokemon(data), null];
}

export default async function usePagination(pokemonId) {
  const previous = await prevPokemon(pokemonId);
  const next = await nextPokemon(pokemonId);
  return [previous, next];
}
