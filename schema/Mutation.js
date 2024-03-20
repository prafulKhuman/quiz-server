const graphql = require('graphql');
const {
    GraphQLObjectType,
} = graphql;


const {  AddCategory, DeleteCategory, UpdateCategory } = require('./CustomSchema/CategorySchema');
const { AddQuiz, DeleteQuiz, UpdateQuiz} = require("./CustomSchema/QuizSchema");
const { AddRules, DeleteRules, UpdateRules } = require("./CustomSchema/RulesSchema");
const {  AddQuestion, DeleteQuestion, UpdateQuestion  } = require("./CustomSchema/QuestionSchema");
const {AddUser, DeleteUser, UpdateUser , AuthQuery} = require("./CustomSchema/RegisterSchema") ;
const { AddResult} = require("./CustomSchema/ResultSchema");
const { AdminAuthQuery , AddAdmin , UpdateAdmin} = require("./CustomSchema/AdminSchema");
 

const Mutations = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCategory: AddCategory,
        deleteCategory: DeleteCategory,
        updateCategory: UpdateCategory ,
        addQuiz : AddQuiz , 
        deleteQuiz: DeleteQuiz ,
        updateQuiz : UpdateQuiz ,
        addRules : AddRules , 
        deleteRules: DeleteRules ,
        updateRules : UpdateRules,
        addQuestion : AddQuestion , 
        deleteQuestion: DeleteQuestion ,
        updateQuestion : UpdateQuestion ,
        addUser : AddUser ,
        deleteUser: DeleteUser ,
        updateUser : UpdateUser ,
        login: AuthQuery ,
        addResult : AddResult , 
        adminLogin : AdminAuthQuery ,
        addAdmin  : AddAdmin ,
        updateAdmin : UpdateAdmin
    }
});

module.exports = {Mutations};