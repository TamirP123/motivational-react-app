import { gql } from "@apollo/client";

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
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($description: String!) {
    addPost(description: $description) {
      _id
      description
      createdAt
      postAuthor {
        _id
        username
        profileImage
      }
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
      comments {
        _id
        commentText
        commentAuthor
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

export const UPDATE_PROFILE_IMAGE = gql`
  mutation updateProfileImage($profileImage: String!) {
    updateProfileImage(profileImage: $profileImage) {
      _id
      username
      profileImage
    }
  }
`;

export const REMOVE_POST = gql`
  mutation removePost($postId: ID!) {
    removePost(postId: $postId) {
      _id
    }
  }
`;

export const SEND_FRIEND_REQUEST = gql`
  mutation sendFriendRequest($receiverId: ID!) {
    sendFriendRequest(receiverId: $receiverId) {
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

export const RESPOND_FRIEND_REQUEST = gql`
  mutation respondFriendRequest($requestId: ID!, $status: String!) {
    respondFriendRequest(requestId: $requestId, status: $status) {
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

export const REMOVE_FRIEND = gql`
  mutation removeFriend($friendId: ID!) {
    removeFriend(friendId: $friendId) {
      _id
      username
      friends {
        _id
        username
      }
    }
  }
`;

export const UPDATE_SOCIAL_LINKS = gql`
  mutation UpdateSocialLinks($input: SocialLinksInput!) {
    updateSocialLinks(input: $input) {
      _id
      username
      socialLinks {
        twitter
        linkedin
        github
      }
    }
  }
`;
