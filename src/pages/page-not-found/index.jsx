import "./style.css";
export default function () {
  return (
    <div className="page-not-found">
      <div className="gengar page-not-found__gengar">
        <span className="page-not-found__text">404</span>
        <img
          className="gengar__img"
          src="https://i.pinimg.com/originals/4f/d0/c0/4fd0c049c173c9beb5a0101a84deb6f9.gif"
          alt="gengar"
        />
      </div>
      <span className="page-not-found__text">Page not found</span>
    </div>
  );
}
