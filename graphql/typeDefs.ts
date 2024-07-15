import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    students: [Student]
    student(_id: String): Student
  }

  type Student {
    _id: ID
    firstName: String
    lastName: String
    age: Int
    email: String
  }

   type StudentResponse {
    student: Student
    status: Int
  }

  input UserInput {
    firstName: String
    lastName: String
    age: Int
    email: String
    password: String
  }

  type Mutation {
    create(body: UserInput): StudentResponse
    update(_id: String, body: UserInput): StudentResponse
    delete(_id: String): StudentResponse
  }
`;

export { typeDefs };
