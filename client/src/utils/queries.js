import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      profileImage
      posts {
        _id
        description
        createdAt
      }
      friendRequests {
        _id
        sender {
          _id
          username
        }
        receiver {
          _id
          username
        }
        status
      }
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_POSTS = gql`
  query getPosts {
    posts {
      _id
      description
      postAuthor {
        _id
        username
        profileImage
      }
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_SINGLE_POST = gql`
  query getSinglePost($postId: ID!) {
    post(postId: $postId) {
      _id
      description
      postAuthor {
        _id
        username
        profileImage
      }
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      profileImage
      posts {
        _id
        description
        createdAt
      }
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_FRIEND_REQUESTS = gql`
  query myFriendRequests {
    myFriendRequests {
      _id
      sender {
        _id
        username
      }
      receiver {
        _id
        username
      }
      status
    }
  }
`;
