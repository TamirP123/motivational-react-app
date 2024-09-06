const { User, Post } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("posts");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("posts");
    },
    posts: async (parent, { username }) => {
      try {
        const params = username ? { username } : {};
        const posts = await Post.find(params)
          .sort({ createdAt: -1 })
          .populate({
            path: 'postAuthor',
            select: 'username profileImage'
          });
        console.log('Fetched posts:', posts);
        return posts;
      } catch (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Failed to fetch posts');
      }
    },
    post: async (parent, { postId }) => {
      return Post.findOne({ _id: postId }).populate({
        path: 'postAuthor',
        select: 'username profileImage'
      });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('posts');
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addPost: async (parent, { description }, context) => {
      if (context.user) {
        try {
          const post = await Post.create({
            description,
            postAuthor: context.user._id,
          });

          await User.findByIdAndUpdate(
            context.user._id,
            { $push: { posts: post._id } },
            { new: true }
          );

          const populatedPost = await Post.findById(post._id).populate({
            path: 'postAuthor',
            select: 'username profileImage'
          });

          console.log('Created post:', populatedPost);
          return populatedPost;
        } catch (error) {
          console.error('Error creating post:', error);
          throw new Error('Failed to create post');
        }
      }
      throw AuthenticationError;
    },
    addComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    removePost: async (parent, { postId }, context) => {
      if (context.user) {
        try {
          const post = await Post.findOneAndDelete({
            _id: postId,
            postAuthor: context.user._id,
          });

          if (!post) {
            throw new Error('Post not found or you are not authorized to delete this post');
          }

          await User.findByIdAndUpdate(
            context.user._id,
            { $pull: { posts: postId } }
          );

          return post;
        } catch (error) {
          console.error('Error removing post:', error);
          throw new Error('Failed to remove post');
        }
      }
      throw AuthenticationError;
    },
    removeComment: async (parent, { postId, commentId }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    updateProfileImage: async (parent, { profileImage }, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          context.user._id,
          { profileImage },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
