import { useEffect, useState } from "react";

export default function ({ chain }) {
  const [[data, error], setEvolutionFamily] = useState([]);
  const [evolutionChain, setEvolutionChain] = useState([]);
  useEffect(() => {
    console.log("Evolution Chain Did Mount!");
    if (!chain) return;
    console.log("Evolution Chain Did Update");
    setEvolutionFamily(chain);
  }, [chain]);

  useEffect(() => {
    (async function () {
      if (!data) return;
      const ENDPOINT = "https://pokeapi.co/api/v2/pokemon";
      setEvolutionChain(() =>
        data.map(async (family) => {
          return (async function () {
            try {
              const response = await fetch(`${ENDPOINT}/${family}`);
              const data = await response.json();
              console.log(data);
              return data;
            } catch (error) {
              console.log(error);
              return [];
            }
          })();
        })
      );
    })();
  }, [data]);

  if (error) return <h1>Error...</h1>;
  return (
    <>
      <div>
        {evolutionChain &&
          evolutionChain.map((evo) => (
            <pre>{JSON.stringify(evo, null, 2)}</pre>
          ))}
      </div>
    </>
  );
}
