const graphql = require('graphql');
const QuestionModal = require('../../models/QuestionModal');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLInputObjectType,
    GraphQLBoolean
} = graphql;

const OptionInputType = new GraphQLInputObjectType({
    name: 'OptionInputType',
    fields: () => ({
        id: { type: GraphQLString },
        value: { type: GraphQLString },
        status: { type: GraphQLBoolean },
    }),
});

const OptionOutputType = new GraphQLObjectType({
    name: 'OptionOutputType',
    fields: () => ({
        id: { type: GraphQLString },
        value: { type: GraphQLString },
        status: { type: GraphQLBoolean },
    }),
});

const QuestionsInputType = new GraphQLInputObjectType({
    name: 'QuestionsInputType',
    fields: () => ({
        question: { type: GraphQLString },
        options: { type: GraphQLList(OptionInputType) },
    }),
});

const QuestionsOutputType = new GraphQLObjectType({
    name: 'QuestionsOutputType',
    fields: () => ({
        question: { type: GraphQLString },
        options: { type: GraphQLList(OptionOutputType) },
    }),
});

const QuestionType = new GraphQLObjectType({
    name: 'Question',
    fields: () => ({
        id: { type: GraphQLID },
        quizName: { type: GraphQLString },
        quizId: { type: GraphQLString },
        questions: { type: GraphQLList(QuestionsOutputType) },
    }),
});

const AddQuestion = {
    type: QuestionType,
    args: {
        quizName: { type: GraphQLString },
        quizId: { type: GraphQLString },
        questions: {
            type: GraphQLList(QuestionsInputType),
        },
    },
    async resolve(parent, args) {
        
            const question = new QuestionModal({
                quizName: args.quizName,
                quizId: args.quizId,
                questions: args.questions,
            })
            return question.save();
      


    },
};

// const QuestionQuery = {
//     type: new GraphQLList(QuestionType),
//     resolve(parent, args) {
//         return QuestionModal.find({});
//     },
// };

const QuestionQuery = {
    type: new GraphQLList(QuestionType),
    args: {
        id: { type: GraphQLString } 
    },
    resolve(parent, args){
        const query =  args.id ? { quizId: args.id }  : {}; 
        return QuestionModal.find(query);
    }
}


const DeleteQuestion = {
    type: QuestionType,
    args: {
        id: { type: GraphQLID },
    },
    resolve(parent, args) {
        return QuestionModal.findByIdAndDelete(args.id);
    },
};

const UpdateQuestion = {
    type: QuestionType,
    args: {
        id: { type: GraphQLID },
        quizName: { type: GraphQLString },
        quizId: { type: GraphQLString },
        questions: {
            type: GraphQLList(QuestionsInputType),
        },
    },
    resolve(parent, args) {
        args.updatedAt = new Date();

        return QuestionModal.findByIdAndUpdate(
            args.id,
            { quizName: args.quizName, quizId: args.quizId, questions: args.questions, updatedAt: args.updatedAt },
            { new: true }
        );
    },
};

module.exports = { QuestionQuery, AddQuestion, DeleteQuestion, UpdateQuestion };
