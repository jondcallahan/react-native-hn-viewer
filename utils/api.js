import ApolloClient from 'apollo-boost';

export const api = new ApolloClient({
  uri: 'https://graphqlhub.com/graphql',
});
