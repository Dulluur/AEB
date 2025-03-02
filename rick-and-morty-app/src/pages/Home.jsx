import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import GenderIcon from "../components/GenderIcon";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        pages
      }
      results {
        id
        name
        image
        gender
      }
    }
  }
`;

function Home() {
  const [page, setPage] = useState(1);
  const [genderFilter, setGenderFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page },
  });

  if (loading)
    return <p className="text-center text-lg font-semibold">Загрузка...</p>;
  if (error)
    return <p className="text-red-500 text-center">Ошибка: {error.message}</p>;

  let characters = data?.characters?.results || [];
  const totalPages = data?.characters?.info?.pages || 1;

  if (genderFilter) {
    characters = characters.filter((char) => char.gender === genderFilter);
  }

  if (searchQuery) {
    characters = characters.filter((char) =>
      char.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Список персонажей</h1>

      {/* Фильтры */}
      <div className="flex justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Поиск персонажа..."
          className="border rounded-lg p-2 w-60 shadow"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="border rounded-lg p-2 shadow"
          onChange={(e) => setGenderFilter(e.target.value)}
          value={genderFilter}
        >
          <option value="">Все</option>
          <option value="Male">Мужской</option>
          <option value="Female">Женский</option>
          <option value="unknown">Неизвестный</option>
        </select>
      </div>

      {/* Карточки персонажей */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {characters.map((character) => (
          <Link
            key={character.id}
            to={`/character/${character.id}`}
            className="bg-white shadow-lg rounded-lg p-4 text-center hover:scale-105 transition "
          >
            <img
              src={character.image}
              alt={character.name}
              className="rounded-full mx-auto w-24 h-24"
            />
            <p className="text-lg font-semibold mt-2">{character.name}</p>
            <div className="flex justify-center item-center">
              <GenderIcon gender={character.gender} />
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-700"
          }`}
        >
          Назад
        </button>
        <span className="text-lg font-semibold">
          Страница {page} из {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-lg ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-700"
          }`}
        >
          Вперёд
        </button>
      </div>
    </div>
  );
}

export default Home;
