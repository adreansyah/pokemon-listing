import { ApolloClient, InMemoryCache } from "@apollo/client";

const clientOtherRender = new ApolloClient({
    uri: "https://graphql-pokeapi.vercel.app/api/graphql",
    cache: new InMemoryCache(),
});

const client = {
    clientOtherRender
}
export default client