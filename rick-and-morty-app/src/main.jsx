import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import client from './apollo/client.js';

import ReactDOM from "react-dom/client";
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);

