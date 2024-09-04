import { gql }  from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      posts {
        _id
        category {
          _id
          name
        }
        description
        image
        postAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  query Categories {
  categories {
    _id
    name
  }
}
`;

export const QUERY_POSTS = gql`
  query getPosts{
    posts {
        _id
        category {
          _id
          name
        }
        description
        image
        postAuthor
        createdAt
      }
  }
`;

export const QUERY_SINGLE_POST = gql`
  query getSinglePost($postId: ID!) {
    post(postId: $postId) {
      _id
        description
        image
        category {
          _id
          name
        }
        postAuthor
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
      posts {
        _id
        category {
          _id
          name
        }
        description
        image
        postAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
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
