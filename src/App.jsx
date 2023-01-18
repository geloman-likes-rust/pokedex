import Home from "./pages/home/index";
import Pokedex from "./pages/pokedex/index";
import Pokemon from "./pages/pokemon/index";
import PageNotFound from "./pages/page-not-found";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokedex/:pokemon" element={<Pokemon />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
