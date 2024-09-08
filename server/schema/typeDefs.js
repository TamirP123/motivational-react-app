const typeDefs = `
type User {
  _id: ID
  username: String!
  email: String!
  password: String!
  profileImage: String
  posts: [Post]
  friendRequests: [FriendRequest]
  friends: [User]
  socialLinks: SocialLinks
}

type FriendRequest {
  _id: ID!
  sender: User!
  receiver: User!
  status: String!
}

type Post {
  _id: ID
  description: String!
  postAuthor: User
  createdAt: String
  comments: [Comment]
}

type Comment {
  _id: ID
  commentText: String
  commentAuthor: String
  createdAt: String
}

type Query {
  users: [User]
  user(username: String!): User
  posts(username: String): [Post]
  post(postId: ID!): Post
  me: User
  myFriendRequests: [FriendRequest]

}

type Auth {
  token: ID
  user: User
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  addPost(description: String!): Post
  addComment(postId: ID!, commentText: String!): Post
  removePost(postId: ID!): Post
  removeComment(postId: ID!, commentId: ID!): Post
  updateProfileImage(profileImage: String!): User
  sendFriendRequest(receiverId: ID!): FriendRequest
  respondFriendRequest(requestId: ID!, status: String!): FriendRequest
  removeFriend(friendId: ID!): User
  updateSocialLinks(input: SocialLinksInput!): User
}

type SocialLinks {
  twitter: String
  linkedin: String
  github: String
}

input SocialLinksInput {
  twitter: String
  linkedin: String
  github: String
}
`;

module.exports = typeDefs;
