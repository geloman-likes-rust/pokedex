import { lazy, Suspense } from "react";
const Home = lazy(() => import("./pages/home/index"));
const Pokedex = lazy(() => import("./pages/pokedex/index"));
const Pokemon = lazy(() => import("./pages/pokemon/index"));
const PageNotFound = lazy(() => import("./pages/page-not-found"));
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/ui/header/index";
import Loading from "./components/ui/loading";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="App__main">
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<Loading />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/pokedex"
              element={
                <Suspense fallback={<Loading />}>
                  <Pokedex />
                </Suspense>
              }
            />
            <Route
              path="/pokedex/:pokemon"
              element={
                <Suspense fallback={<Loading />}>
                  <Pokemon />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<Loading />}>
                  <PageNotFound />
                </Suspense>
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
