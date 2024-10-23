const { ApolloServer } = require("apollo-server");

require("dotenv").config();

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const PORT = 5000;

server.listen({ port: PORT }).then(({ url }: any) => {
    console.log(`Server ready at ${url} and port ${PORT}`);
});
