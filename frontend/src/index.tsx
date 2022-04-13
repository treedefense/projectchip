import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Routes } from './routes';
import { client } from './utils/client';
import { Auth0ProviderWithHistory } from './utils/auth';
import { ApolloProvider } from '@apollo/client';
import './index.css';

render(
    <React.StrictMode>
        <BrowserRouter>
            <Auth0ProviderWithHistory>
                <ApolloProvider client={client}>
                    <Routes />
                </ApolloProvider>
            </Auth0ProviderWithHistory>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
