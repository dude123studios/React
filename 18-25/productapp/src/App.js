//import { Provider } from "react-redux";
import { Selector } from "./Selector";
//import dataStore from "./store";
import React from "react";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
    uri: "http://localhost:3600/graphql",
});

export default function App() {
    return (
        <ApolloProvider client={client}>
            <Selector />
        </ApolloProvider>
    );
}
