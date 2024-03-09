import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://panicky-pocketbook-fly.cyclic.app/graphql"  ,
  //uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export default client;
