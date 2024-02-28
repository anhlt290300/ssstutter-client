"use client";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/apollo/apollo.js";

const ApolloProviderLayout = ({ children }) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default ApolloProviderLayout;
