const graphql = require('graphql');
const _ = require('lodash');
const CategoryModal = require('../../models/CategoryModal');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
} = graphql;

const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },        
    })
});

const CategoryQuery = {
    type: new GraphQLList(CategoryType),
    resolve(parent, args){
        return CategoryModal.find({});
    }
}


const  AddCategory = {
    type: CategoryType,
    args: {
        name: { type: GraphQLString },
    },
    resolve(parent, args){
        let category = new CategoryModal({
            name: args.name,
        });
        return category.save();
    }
}

const DeleteCategory = {
    type: CategoryType,
    args: {
        id: { type: GraphQLID },
    },
    resolve(parent, args){
        return CategoryModal.findByIdAndDelete(args.id);
    }
}
const UpdateCategory = {
    type: CategoryType,
    args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
    },
    resolve(parent, args){
       
        args.updatedAt = new Date();
        
        return CategoryModal.findByIdAndUpdate(
            args.id,
            { name: args.name, updatedAt: args.updatedAt },
            { new: true } 
        );
    }
}

module.exports = { CategoryQuery, AddCategory, DeleteCategory, UpdateCategory };