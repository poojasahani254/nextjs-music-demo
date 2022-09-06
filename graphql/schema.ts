import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    id: String
    email: String!
    first: String
    last: String
    mobile: String
    role: String
    dob: String
    gender: String
    genderDetail: String
    username: String
    currentSignInAt: String
    lastSignInAt: String
  }  
  
  type Query {
    users: [User]!
  }
  
  
`;