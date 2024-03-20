const graphql = require('graphql');
const _ = require('lodash');
const ResultModal = require('../../models/ResultModal');


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull ,
    GraphQLList,
    GraphQLInt
} = graphql;

const ResultType = new GraphQLObjectType({
    name: 'ResultType',
    fields: () => ({
        id: { type: GraphQLID },
        quizname: { type: GraphQLString },
        quizid: { type: GraphQLString },
        userid: { type: GraphQLString },
        correctscore: { type: GraphQLString },
        incorrectscore: { type: GraphQLString },
        missing: { type: GraphQLString },
        totalscore: { type: GraphQLString },
        status: { type: GraphQLString }

    })
});



const ResultQuery = {
    type: new GraphQLList(ResultType),
    args: {
        id: { type: GraphQLString },
        userId: { type: GraphQLString }
    },
    resolve(parent, args) {
        const query = args.id ? { userid: args.id } : args.userId ? { userid: args.userId } : {};
        const sortOptions = { createdAt: -1 };

        
        return args.userId != "" ? ResultModal.find(query).sort(sortOptions).limit(1) : ResultModal.find(query);
    }
};



// const ResultQueryLastItem = {
//     type: new GraphQLList(ResultType),
//     args: {
//         id: { type: GraphQLString },
//         userId: { type: GraphQLID }, 
//     },
//     resolve(parent, args) {
//         const query = args.id ? { userid: args.id } : {};
//         if (args.userId) {
//             query.userid = args.userId;
//         }
//         return ResultModal.find(query).sort({ createdAt: -1 }).limit(1);
//     }
// };





const AddResult = {
    type: ResultType,
    args: { 
        quizname: { type: new GraphQLNonNull(GraphQLString) },
        quizid: { type: new GraphQLNonNull(GraphQLString) },
        userid: { type: new GraphQLNonNull(GraphQLString) },
        correctscore: { type: new GraphQLNonNull(GraphQLString) },
        incorrectscore: { type: new GraphQLNonNull(GraphQLString) },
        missing: { type: new GraphQLNonNull(GraphQLString)  },
        totalscore: { type: new GraphQLNonNull(GraphQLString) },
        status: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(parent, args) {
        
        let user = new ResultModal({
            quizname: args.quizname,
            quizid: args.quizid,
            userid: args.userid,
            correctscore: args.correctscore,
            incorrectscore: args.incorrectscore,
            missing: args.missing ,
            totalscore: args.totalscore,
            status: args.status
        });
    
            return user.save();
        }

        
        
    };




module.exports = { ResultQuery, AddResult };