import React from "react";

function About() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">О проекте</h1>
      <p className="text-lg">
        Это приложение использует GraphQL API Rick and Morty для отображения
        персонажей.
      </p>
      <div>
        <ul className="text-base">
          <li>Vite – быстрая сборка проекта</li>
          <li>React Router – маршрутизация между страницами</li>
          <li>Apollo Client – работа с GraphQL API</li>
          <li>useState / useQuery – управление состоянием и запросами</li>
          <li>Tailwind CSS – стилизация</li>
        </ul>
      </div>
    </div>
  );
}

export default About;
