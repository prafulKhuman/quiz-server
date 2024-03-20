const graphql = require('graphql');
const _ = require('lodash');
const AdminModal = require('../../models/AdminModal');
const jwt = require('jsonwebtoken');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLNonNull ,
    GraphQLList,
} = graphql;

const AdminType = new GraphQLObjectType({
    name: 'AdminType',
    fields: ( ) => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
       
    })
});


const AdminQuery = {
    type: new GraphQLList(AdminType),
    args: {
        id: { type: GraphQLString } 
    },
    resolve(parent, args){
        const query = args.id ? { _id: args.id } : {}; 
        return AdminModal.find(query);
    }
}

const AdminAuthType  = new GraphQLObjectType({
    name: 'AdminAuthType',
    fields: () => ({
        userId: { type: GraphQLString },
        message : {type: GraphQLString} , 
        token : {type: GraphQLString}
    }),
});

const AdminAuthQuery = {
    type: AdminAuthType,
    args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent, args , { res }) {
        const user = await AdminModal.findOne({ username: args.username });

        if (!user) {
            throw new Error('Invalid credentials');
        }

        // const isPasswordValid = await bcrypt.compare(args.password, user.password);
        const isPasswordValid = args.password === user.password ? true : false ;

        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ userId: user.id, username: user.username },  process.env.SECRET_KEY, {
            expiresIn: '1h',
        });

        return { userId: user.id  , message : "Login Successfull " , token : token};
        
    },
};



const AddAdmin = {
    type: AdminType,
    args: {
        username: { type: new GraphQLNonNull(GraphQLString) }, 
        password: { type: new GraphQLNonNull(GraphQLString) }, 
    },
    async resolve(parent, args) {
        const existingUser = await AdminModal.findOne({ username: args.username });

        if (existingUser) {
            throw new Error('Username already exists. Please choose a different username.');
        }else{
            let user = new AdminModal({
                username: args.username,
                password: args.password,
            });
    
            return user.save();
        }

        
        
    },
};

const UpdateAdmin = {
   type: AdminType,
    args: {
        id: { type: GraphQLString },
        password: { type: GraphQLString },
        oldPassword: { type: GraphQLString }
    },
    async resolve(parent, args){
        const user = await AdminModal.findById(args.id);

        if (!user) {
            throw new Error("Admin not found");
        }

        // Check if the old password matches
        if (user.password !== args.oldPassword) {
            throw new Error("Old password does not match");
        }


        args.updatedAt = new Date();
        return AdminModal.findByIdAndUpdate(
            args.id,
            { password: args.password , updatedAt: args.updatedAt} ,
            { new: true } 
        );
    }
}


module.exports = {  AdminQuery , AdminAuthQuery , AddAdmin , UpdateAdmin};