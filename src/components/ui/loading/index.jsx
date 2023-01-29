import "./style.css";
export default function () {
  return (
    <div className="loading-page">
      <div className="loading-page__loading-icon-wrapper">
        <img
          className="loading-page__loading-icon"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1024px-Pok%C3%A9_Ball_icon.svg.png"
          alt=""
        />
      </div>
      <div className="loading-page__loading-text">loading...</div>
    </div>
  );
}
