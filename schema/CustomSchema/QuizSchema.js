const graphql = require('graphql');
const _ = require('lodash');
const QuizModal = require('../../models/QuizModal');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} = graphql;

const QuizType = new GraphQLObjectType({
    name: 'Quiz',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        category: { type: GraphQLString },
        description: { type: GraphQLString },
        totalQuestion: { type: GraphQLInt }        
    })
});

// const QuizQuery = {
//     type: new GraphQLList(QuizType),
//     resolve(parent, args){
//         return QuizModal.find({});
//     }
// }

const QuizQuery = {
    type: new GraphQLList(QuizType),
    args: {
        category: { type: GraphQLString } ,
        id: { type: GraphQLString } 
    },
    resolve(parent, args){
        const query = args.category ? { category: args.category } : args.id ? { _id: args.id }  : {}; 
        return QuizModal.find(query);
    }
}

// const QuizQueryID = {
//     type: new GraphQLList(QuizType),
//     args: {
//         id: { type: GraphQLString } 
//     },
//     resolve(parent, args){
//         const query = args.id ? { _id: args.id } : {}; 
//         return QuizModal.find(query);
//     }
// }


const  AddQuiz = {
    type: QuizType,
    args: {
        name: { type: GraphQLString },
        category: { type: GraphQLString },
        description: { type: GraphQLString },
        totalQuestion: { type: GraphQLInt }
    },
    resolve(parent, args) {
        let Quiz = new QuizModal({

            name: args.name,
            category: args.category,
            description: args.description,
            totalQuestion: args.totalQuestion
        });
        return Quiz.save();
    }
}

const DeleteQuiz = {
    type: QuizType,
    args: {
        id: { type: GraphQLID },
    },
    resolve(parent, args){
        return QuizModal.findByIdAndDelete(args.id);
    }
}
const UpdateQuiz = {
    type: QuizType,
    args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        category: { type: GraphQLString },
        description: { type: GraphQLString },
        totalQuestion: { type: GraphQLInt }  
    },
    resolve(parent, args){
       
        args.updatedAt = new Date();
        
        return QuizModal.findByIdAndUpdate(
            args.id,
            {name: args.name, category: args.category , description: args.description , totalQuestion: args.totalQuestion , updatedAt: args.updatedAt} ,
            { new: true } 
        );
    }
}

module.exports = { QuizQuery, AddQuiz, DeleteQuiz, UpdateQuiz };