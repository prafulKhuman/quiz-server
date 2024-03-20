const graphql = require('graphql');
const _ = require('lodash');
const RulesModal = require('../../models/RulesModal');
const mongoose = require('mongoose');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
} = graphql;

const RulesType = new GraphQLObjectType({
    name: 'Rules',
    fields: ( ) => ({
        id: { type: GraphQLID },
        quizid: {type: GraphQLString},
        quiz: { type: GraphQLString },
        rules : { type: GraphQLString }     
    })
});

// const RulesQuery = {
//     type: new GraphQLList(RulesType),
//     resolve(parent, args){
//         return RulesModal.find({});
//     }
// }

const RulesQuery = {
    type: new GraphQLList(RulesType),
    args: {
        quizid: { type: GraphQLString }
    },
    resolve(parent, args){
        const query = args.quizid ? { quizid: args.quizid } : {}; 
        return RulesModal.find(query);
    }
}

const  AddRules = {
    type: RulesType,
    args: {
      
        quiz: { type: GraphQLString },
        rules : { type: GraphQLString } ,
        quizid: { type: GraphQLString },
    },
    resolve(parent, args) {
        let Rules = new RulesModal({
            quizid: args.quizid,
            quiz: args.quiz,
            rules: args.rules
          
        });
        return Rules.save();
    }
}

const DeleteRules = {
    type: RulesType,
    args: {
        id: { type: GraphQLID },
    },
    resolve(parent, args){
        return RulesModal.findByIdAndDelete(args.id);
    }
}
const UpdateRules = {
    type: RulesType,
    args: {
        id: { type: GraphQLID },
        quizid: {type: GraphQLString},
        quiz: { type: GraphQLString },
        rules : { type: GraphQLString } 
        
    },
    resolve(parent, args){
       
        args.updatedAt = new Date();
        
        return RulesModal.findByIdAndUpdate(
            args.id,
            {quiz: args.quiz, rules: args.rules  , updatedAt: args.updatedAt} ,
            { new: true } 
        );
    }
}

module.exports = { RulesQuery, AddRules, DeleteRules, UpdateRules };