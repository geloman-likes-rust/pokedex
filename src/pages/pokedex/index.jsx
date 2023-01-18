import { useState } from "react";
import usePokemons from "../../hooks/usePokemons";
export default function () {
  const [offset, setOffset] = useState(0);
  const [data, error] = usePokemons(offset);
  if (error) {
    return (
      <>
        <h1>Error loading...</h1>
      </>
    );
  }
  return (
    <>
      <div>
        <h1>this is pokedex</h1>
        <img
          src="https://i.pinimg.com/originals/4f/d0/c0/4fd0c049c173c9beb5a0101a84deb6f9.gif"
          alt="gengar"
        />
      </div>
    </>
  );
}
