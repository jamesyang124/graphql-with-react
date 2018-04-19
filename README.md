# Graphql With React

A playground for trying React + Apollo + GraphQL, project is following below link:

https://dev-blog.apollodata.com/full-stack-react-graphql-tutorial-582ac8d24e3b

## Resolver

https://www.apollographql.com/docs/graphql-tools/resolvers.html#Resolver-function-signature#Resolver-obj-argument

check rootValue, or first arg `obj`

## Mock Data-Fetching

`apollo-test-utils` may not support `apollo-client` 2.0. There has a workaround as below code snippet:

1. Design your schema:

```js
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql';

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
});

const peopleData = [
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'Sara Smith' },
  { id: 3, name: 'Budd Deey' },
];

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    people: {
      type: new GraphQLList(PersonType),
      resolve: () => peopleData,
    },
  },
});

export const schema = new GraphQLSchema({ query: QueryType });
```

2. Create local data-fetching link:

```js
import { graphql, print } from "graphql";
import { ApolloLink, Observable } from "apollo-link";
import { schema } from "./schema";

export const link = new ApolloLink(operation => {
  return new Observable(observer => {
    const { query, operationName, variables } = operation;
    delay(300)
      .then(() =>
        graphql(schema, print(query), null, null, variables, operationName)
      )
      .then(result => {
        observer.next(result);
        observer.complete();
      })
      .catch(observer.error.bind(observer));
  });
});

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
```

3. Bind client component with that data-fetching link:

```js
class App extends Component {
  render() {
    const { data: { loading, people } } = this.props;
    return ( /* ... */ )
}

export default graphql(
  gql`
    query ErrorTemplate {
      people {
        id
        name
      }
    }
  `
)(App);
```

4. set `ApolloClient` link, and data-bind component:

```js
import { link } from "./graphql/link";
import App from "./App";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
```

## Resource

1. https://github.com/apollographql/react-apollo-error-template/blob/master/src/index.js
