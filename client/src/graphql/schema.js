import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql';

/*
type Channel {
  id: ID!
  name: String
}

type Query {
  channels: [Channel]
}
*/

const ChannelType = new GraphQLObjectType({
  name: 'Channel',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
});

const channelData = [
  {id: "1", name: "Websocket"},
  {id: "2", name: "Server Side Rendering"},
  {id: "3", name: "TCP/IP"}
];

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    channels: {
      type: new GraphQLList(ChannelType),
      resolve: () => channelData,
    },
  },
});

export const schema = new GraphQLSchema({ query: QueryType });
