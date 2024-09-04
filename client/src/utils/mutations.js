import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_POST = gql`
mutation addPost($description: String!, $image: String!, $category: ID!) {
  addPost(description: $description, image: $image, category: $category) {
    _id
    description
    image
    category {
      _id
      name
    }
    createdAt
    postAuthor
    comments {
      _id
      commentText
    }
  }
}
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      _id
      description
      image
      postAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($postId: ID!, $commentId: ID!) {
    removeComment(postId: $postId, commentId: $commentId) {
      _id
      comments {
        _id
        commentText
        commentAuthor
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!, $thoughtAuthor: String!) {
    addThought(thoughtText: $thoughtText, thoughtAuthor: $thoughtAuthor) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_THOUGHTCOMMENT = gql`
  mutation addThoughtComment($thoughtId: ID!, $commentText: String!) {
    addThoughtComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

// export const REMOVE_COMMENT = gql`
//   mutation removeComment($postId: ID!, $commentId: ID!) {
//     removeComment(commentText: $commentText) {
//       _id
//       comments {
//         _id
//         commentText
//         commentAuthor
//       }
//     }
//   }
// `;