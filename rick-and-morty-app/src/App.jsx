import { useState } from "react";
import "./App.css";
import { gql, useQuery } from "@apollo/client";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";

import Home from "./pages/Home";
import Character from "./pages/Characters";
import About from "./pages/About";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-xl font-semibold hover:text-gray-300 transition"
          >
            Главная
          </Link>

          <div className="flex gap-4">
            <Link to="/" className="hover:text-gray-300 transition">
              Персонажи
            </Link>
            <Link to="/About" className="hover:text-gray-300 transition">
              О проекте
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/:id" element={<Character />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>


      <footer className="bg-gray-800 text-white text-center p-4 mt-6">
        <p>© {new Date().getFullYear()} Rick and Morty API Viewer</p>
      </footer>
    </div>
  );
}

export default App;
