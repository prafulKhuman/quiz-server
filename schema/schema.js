const graphql = require('graphql');
const {RootQuery} = require("./Query");
const {Mutations} = require("./Mutation")

const {
    GraphQLSchema
} = graphql;


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
});





