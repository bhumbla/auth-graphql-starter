const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;
const _ = require('lodash');
const UserType = require('./user_type');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    currentUser: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args, req) {
        return req.user;
      },
    },
  },
});

module.exports = RootQueryType;
