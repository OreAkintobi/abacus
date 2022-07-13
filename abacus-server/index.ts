import { ApolloServer, gql } from 'apollo-server';
import data from './data.json';

const typeDefs = gql`
  type Items {
    id: String
    createdAt: String
    numberOfPositions: Int
    companyName: String
    title: String
    area: String
    description: String
    flagCode: String
    relocate: String
    salaryFrom: Int
    salaryTo: Int
    currency: String
    jobType: String
    skills: String
  }

  type Query {
    items: [Items]
  }
`;

const resolvers = {
  Query: {
    items: () => data.items,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// @ts-ignore
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
