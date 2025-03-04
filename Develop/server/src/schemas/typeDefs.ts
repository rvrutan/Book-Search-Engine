const typeDefs = `
type Book {
  bookId: ID!
  authors: [String]
  description: String!
  image: String
  link: String
  title: String!
}

type User {
  id: ID!
  username: String!
  email: String!
  password: String!
  savedBooks: [Book]
  bookCount: Int
}

type Query {
  users: [users]
  getUser(username: String!): User
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  saveBook(bookData: BookInput!): User
  removeBook(bookId: ID!): User
}

input BookInput {
  bookId: ID!
  authors: [String]
  description: String!
  image: String
  link: String
  title: String!
}

type Auth {
  token: ID!
  user: User
}
`;

export default typeDefs;