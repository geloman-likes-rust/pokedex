import usePokemon from "../../hooks/usePokemon";

export default function ({ pokemon }) {
  const [data, error] = usePokemon(pokemon);
  if (error) {
    <>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </>;
  }
  return (
    <>
      <h1>This is Pokemon</h1>
      <pre>{data && JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
