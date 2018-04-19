import './assets/App.css';

import React, {Component} from 'react';
import {ApolloProvider} from 'react-apollo';

import ApolloClient from 'apollo-boost';
// if we do not use default client(use apollo-http-link by default),
// brackets are required to import no extra default setup ApolloClient.
import { InMemoryCache } from 'apollo-cache-inmemory';

import ChannelsListWithData from './components/ChannelsListWithData';


// apollo-link-http will fetch data through HTTP fetch,
// so we use apoll-link for mocking data
// import { link } from "./graphql/link";


const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
	render() {
		return (<ApolloProvider client={client}>
			<div className="App">
				{/*
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h2>Welcome to Apollo</h2>
          </div>
        */}
        <div className="navbar">React + GraphQL Tutorial</div>
        <ChannelsListWithData />
			</div>
		</ApolloProvider>);
	}
}

export default App;
