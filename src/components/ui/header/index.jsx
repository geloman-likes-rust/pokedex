import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import "./style.css";
import { MagnifyingGlass } from "phosphor-react";
import usePageScroll from "../../../hooks/usePageScroll";

const ENDPOINT = "https://pokeapi.co/api/v2/evolution-chain";
async function fetchEvolution(pokemonId) {
  try {
    const response = await fetch(`${ENDPOINT}/${pokemonId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export default function () {
  const inputRef = useRef();
  const navigate = useNavigate();
  const [pokemonId, setPokemonId] = useState(null);
  const isScrollingDown = usePageScroll();

  useEffect(() => {
    (async function () {
      if (!pokemonId) return;
      const [data, error] = pokemonId;
      navigate(`/pokedex/${data}`);
    })();
  }, [pokemonId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inputRef.current.value) return;
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${inputRef.current.value}`
      );
      const data = await response.json();
      setPokemonId([data.id, null]);
    } catch (error) {
      setPokemonId([null, error]);
    }
    inputRef.current.value = "";
  };
  return (
    <nav className={`navbar ${isScrollingDown && "hide"}`}>
      <Link to="/pokedex" className="navbar__title">
        Pokedex
      </Link>
      <form className="searchbar navbar__searchbar" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className="searchbar__input"
          type="text"
          placeholder="search pokemon"
        />
        <button
          className="searchbar__button"
          onClick={handleSubmit}
          type="submit"
        >
          <MagnifyingGlass className="button__searchglass" size={32} />
        </button>
      </form>
    </nav>
  );
}
