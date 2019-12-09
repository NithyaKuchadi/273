import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql'
});

//render App component on the root element
ReactDOM.render(<ApolloProvider client={client}>
    <App />
    </ApolloProvider>, document.getElementById('root'));
registerServiceWorker();
