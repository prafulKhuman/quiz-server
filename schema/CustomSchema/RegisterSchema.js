const graphql = require('graphql');
const _ = require('lodash');
const UserModal = require('../../models/RegisterModal');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLNonNull ,
    GraphQLList,
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: ( ) => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
       
    })
});

// const UserQuery = {
//     type: new GraphQLList(UserType),
//     resolve(parent, args){
//         return UserModal.find({});
//     }
// }

const UserQuery = {
    type: new GraphQLList(UserType),
    args: {
        id: { type: GraphQLString } 
    },
    resolve(parent, args){
        const query = args.id ? { _id: args.id } : {}; 
        return UserModal.find(query);
    }
}


// Authentication type definition
const AuthType = new GraphQLObjectType({
    name: 'AuthType',
    fields: () => ({
        userId: { type: GraphQLString },
        message : {type: GraphQLString} , 
        token : {type: GraphQLString}
    }),
});

// Authentication query for login
const AuthQuery = {
    type: AuthType,
    args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent, args , { res }) {
        const user = await UserModal.findOne({ username: args.username });

        if (!user) {
            throw new Error('Invalid credentials');
        }

        // const isPasswordValid = await bcrypt.compare(args.password, user.password);
        const isPasswordValid = args.password === user.password ? true : false ;

        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ userId: user.id, username: user.username },  process.env.SECRET_KEY, {
            expiresIn: '30d',
        });

        // if (res) {
        //     res.cookie('auth-token', token, { httpOnly: true });
        // }

        return { userId: user.id  , message : "Login Successfull " , token : token};
        
    },
};



const AddUser = {
    type: UserType,
    args: {
        username: { type: new GraphQLNonNull(GraphQLString) }, 
        password: { type: new GraphQLNonNull(GraphQLString) }, 
    },
    async resolve(parent, args) {
        const existingUser = await UserModal.findOne({ username: args.username });

        if (existingUser) {
            throw new Error('Username already exists. Please choose a different username.');
        }else{
            let user = new UserModal({
                username: args.username,
                password: args.password,
            });
    
            return user.save();
        }

        
        
    },
};

const DeleteUser = {
    type: UserType,
    args: {
        id: { type: GraphQLID },
    },
    resolve(parent, args){
        return UserModal.findByIdAndDelete(args.id);
    }
}
const UpdateUser = {
    type: UserType,
    args: {
        id: { type: GraphQLString },
        password: { type: GraphQLString },
        oldPassword: { type: GraphQLString }
    },
    async resolve(parent, args){
        const user = await UserModal.findById(args.id);

        if (!user) {
            throw new Error("User not found");
        }

        // Check if the old password matches
        if (user.password !== args.oldPassword) {
            throw new Error("Old password does not match");
        }


        args.updatedAt = new Date();
        return UserModal.findByIdAndUpdate(
            args.id,
            { password: args.password , updatedAt: args.updatedAt} ,
            { new: true } 
        );
    }
}

module.exports = { UserQuery, AddUser, DeleteUser, UpdateUser , AuthQuery };