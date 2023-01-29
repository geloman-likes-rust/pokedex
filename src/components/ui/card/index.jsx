import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import usePokemon from "../../../hooks/usePokemon";
import color from "../../../data/pokemon-type-color.json";
import "./style.css";
export default function ({ name }) {
  const cardRef = useRef();
  const [data, error] = usePokemon(name);
  const navigate = useNavigate();
  if (error) {
    return (
      <>
        <h1>Error</h1>
      </>
    );
  }
  return (
    <div
      ref={cardRef}
      onClick={() => {
        navigate(`/pokedex/${data?.name}`);
      }}
      className="card"
    >
      <div className="img-wrapper card__img-wrapper">
        <img
          draggable="false"
          className="img-wrapper__img"
          src={data?.sprite}
          alt=""
          onLoad={() => cardRef.current.classList.toggle("loaded")}
        />
      </div>
      <div className="info card__info">
        <div className="pokemon-id info__pokemon-id">#{data?.id.secondary}</div>
        <span className="pokemon-name info__pokemon-name">{data?.name}</span>
        <div className="pokemon-types info__pokemon-types">
          {data?.types.map((type) => (
            <span
              key={`${data.name}-${type}`}
              className="pokemon-types__pokemon-type"
              style={{ background: color[type] }}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
