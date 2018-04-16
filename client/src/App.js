import logo from './logo.svg';
import './App.css';

import React, {Component} from 'react';
import {graphql, ApolloProvider} from 'react-apollo';

import { ApolloClient } from 'apollo-boost';
// we do not use default client(use apollo-http-link by default),
// so brackets are required.
import { InMemoryCache } from 'apollo-cache-inmemory';

// apollo-link-http will fetch data through HTTP fetch,
// so we use apoll-link for mocking data
import { link } from "./graphql/link";
import gql from "graphql-tag";


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

const ChannelsList = ({
	data: {
		loading,
		error,
		channels
	}
}) => {
	if (loading) {
		return <p>Loading ...</p>;
	}
	if (error) {
		return <p>{error.message}</p>;
	}
	return <ul>
		{channels.map(ch => <li key={ch.id} className="Item-list">{ch.name}</li>)}
	</ul>;
};

const channelsListQuery = gql `
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }
`;

const ChannelsListWithData = graphql(channelsListQuery)(ChannelsList);

class App extends Component {
	render() {
		return (<ApolloProvider client={client}>
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo"/>
					<h2>Welcome to Apollo</h2>
				</div>
        <ChannelsListWithData />
			</div>
		</ApolloProvider>);
	}
}

export default App;
