import React from 'react';
import {graphql} from 'react-apollo';
import gql from "graphql-tag";

import AddChannel from './AddChannel';

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
  /*
	return <ul>
		{channels.map(ch => <li key={ch.id} className="Item-list li-style-1">{ch.name}</li>)}
	</ul>;
  */

  return (
    <div className="channelsList">
      <AddChannel />
      { channels.map( ch =>
        (<div key={ch.id} className={'channel ' + (ch.id < 0 ? 'optimistic' : '')}>{ch.name}</div>)
      )}
    </div>
  );
};

export const channelsListQuery = gql `
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }
`;

export default graphql(channelsListQuery, {
  options: { pollInterval: 5000 }
})(ChannelsList);
