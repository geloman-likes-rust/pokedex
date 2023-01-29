export function flatPokemon(data) {
  return {
    id: {
      primary: data.id,
      secondary: String(data.id / 1000)
        .split(".")
        .join(""),
    },
    name: data.name,
    types: data.types.map((poke) => poke.type.name),
    sprite: data.sprites.other["official-artwork"].front_default,
    height: data.height,
    weight: data.weight,
    abilities: data.abilities.map((poke) => poke.ability.name),
    stats: data.stats.map((poke) => ({ [poke.stat.name]: poke.base_stat })),
    encounters: data.location_area_encounters,
  };
}

export async function fetchPokemon(param) {
  try {
    const ENDPOINT = "https://pokeapi.co/api/v2/pokemon";
    let response = await fetch(`${ENDPOINT}/${param}`);
    let data = await response.json();
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}

export default async function usePagination(pokemonId) {
  let previous = await prevPokemon(pokemonId);
  let next = await nextPokemon(pokemonId);
  return [previous, next];
}
