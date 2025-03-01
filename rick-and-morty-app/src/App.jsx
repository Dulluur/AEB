import { useState } from "react";
import "./App.css";
import { gql, useQuery } from "@apollo/client";

const GET_CHARACTERS = gql`
  query {
    characters(page: 1) {
      results {
        id
        name
        image
        gender
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  console.log("Data structure:", JSON.stringify(data, null, 2));

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  const characters = data?.characters?.results || [];


  return (
    <div>
      <h1>Список персонажей</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {characters.length > 0 ? (
          characters.map((character) => (
            <div key={character.id} style={{ textAlign: "center" }}>
              <img src={character.image} alt={character.name} width="100" />
              <p>{character.name}</p>
              <p>{character.gender}</p>
            </div>
          ))
        ) : (
          <p>Нет данных</p>
        )}
      </div>
    </div>
  );
}

export default App;