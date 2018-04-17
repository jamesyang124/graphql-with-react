import express from 'express';
import cors from 'cors';
import {graphqlExpress, graphiqlExpress} from 'graphql-server-express';
import bodyParser from 'body-parser';

import {schema} from './src/schema';

const PORT = 4000;
const CLIENT_APP_ORIGIN = "http://localhost:3000";

const server = express();

var corsOptions = {
  origin: CLIENT_APP_ORIGIN,
  optionsSuccessStatus: 200
  // some legacy browsers (IE11, various SmartTVs) choke on 204
}

server.use('/graphql', cors(corsOptions), bodyParser.json(), graphqlExpress({schema}));

server.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

server.listen(PORT, () => console.log(`GraphQL Server is now running on http://localhost:${PORT}`));
