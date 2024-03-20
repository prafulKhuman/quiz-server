const graphql = require('graphql');
const {
    GraphQLObjectType,
} = graphql;
const { CategoryQuery} = require('./CustomSchema/CategorySchema');
const {QuizQuery} = require("./CustomSchema/QuizSchema");
const {RulesQuery} = require("./CustomSchema/RulesSchema");
const { QuestionQuery } = require("./CustomSchema/QuestionSchema");
const {UserQuery} = require("./CustomSchema/RegisterSchema");
const {ResultQuery } = require("./CustomSchema/ResultSchema");
const { AdminQuery } = require("./CustomSchema/AdminSchema");



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        Category: CategoryQuery ,
        Quiz : QuizQuery,
        Rules : RulesQuery ,
        Question : QuestionQuery ,
        User : UserQuery ,
        Result : ResultQuery ,
        Admin : AdminQuery
        // LatestResult : ResultQueryLastItem
    }
});

module.exports = {RootQuery} ;