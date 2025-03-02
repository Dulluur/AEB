import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";

const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      image
      episode {
        id
        name
        episode
        air_date
      }
    }
  }
`;

function Character() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_CHARACTER, { variables: { id } });

  if (loading) return <p className="text-center text-lg font-semibold">Загрузка...</p>;
  if (error) return <p className="text-red-500 text-center">Ошибка: {error.message}</p>;

  const character = data.character;
  const episodes = character.episode || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="bg-gray-300 px-4 py-2 rounded-lg mb-6 hover:bg-gray-400 transition">
        ← Назад
      </button>
      <div className="text-center">
        <h1 className="text-3xl font-bold">{character.name}</h1>
        <img src={character.image} alt={character.name} className="rounded-lg mx-auto w-48 mt-4" />
        <p className="text-lg"><strong>Статус:</strong> {character.status}</p>
        <p className="text-lg"><strong>Раса:</strong> {character.species}</p>
        <p className="text-lg"><strong>Пол:</strong> {character.gender}</p>
      </div>

      <h3 className="text-2xl font-semibold mt-6">Эпизоды:</h3>
      <ul className="mt-4">
        {episodes.map((ep) => (
          <li key={ep.id} className="p-2 border-b">📅 {ep.episode} - {ep.name} ({ep.air_date}) </li>
        ))}
      </ul>
    </div>
  );
}

export default Character;
