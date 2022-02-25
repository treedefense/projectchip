import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Routes } from './routes';
import { client } from './utils/client';
import { ApolloProvider } from '@apollo/client';
import './index.css';


render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
