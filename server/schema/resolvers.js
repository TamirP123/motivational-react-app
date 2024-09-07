const { User, Post, FriendRequest } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("posts");
    },
    user: async (parent, { username }) => {
      try {
        const user = await User.findOne({ username })
          .populate("posts")
          .populate({
            path: "friendRequests",
            populate: [
              { path: "sender", select: "_id username" },
              { path: "receiver", select: "_id username" }
            ]
          })
          .populate("friends");
        
        if (!user) {
          throw new Error("User not found");
        }
        
        return user;
      } catch (error) {
        console.error("Error in user resolver:", error);
        throw new Error("Failed to fetch user data");
      }
    },
    posts: async (parent, { username }) => {
      try {
        const params = username ? { username } : {};
        const posts = await Post.find(params).sort({ createdAt: -1 }).populate({
          path: "postAuthor",
          select: "username profileImage",
        });
        console.log("Fetched posts:", posts);
        return posts;
      } catch (error) {
        console.error("Error fetching posts:", error);
        throw new Error("Failed to fetch posts");
      }
    },
    post: async (parent, { postId }) => {
      return Post.findOne({ _id: postId }).populate({
        path: "postAuthor",
        select: "username profileImage",
      });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("posts")
          .populate("friends");
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
    myFriendRequests: async (parent, args, context) => {
      if (context.user) {
        const friendRequests = await FriendRequest.find({
          $or: [
            { sender: context.user._id },
            { receiver: context.user._id }
          ]
        }).populate('sender').populate('receiver');
        console.log("Friend requests found:", friendRequests);
        return friendRequests;
      }
      throw new AuthenticationError("Not logged in");
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
            path: "postAuthor",
            select: "username profileImage",
          });

          console.log("Created post:", populatedPost);
          return populatedPost;
        } catch (error) {
          console.error("Error creating post:", error);
          throw new Error("Failed to create post");
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
            throw new Error(
              "Post not found or you are not authorized to delete this post"
            );
          }

          await User.findByIdAndUpdate(context.user._id, {
            $pull: { posts: postId },
          });

          return post;
        } catch (error) {
          console.error("Error removing post:", error);
          throw new Error("Failed to remove post");
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
    sendFriendRequest: async (parent, { receiverId }, context) => {
      if (context.user) {
        try {
          const receiver = await User.findById(receiverId);
          if (!receiver) {
            throw new Error("User not found");
          }

          const existingRequest = await FriendRequest.findOne({
            $or: [
              { sender: context.user._id, receiver: receiverId },
              { sender: receiverId, receiver: context.user._id }
            ],
            status: 'pending'
          });

          if (existingRequest) {
            throw new Error("Friend request already sent");
          }

          const newRequest = new FriendRequest({
            sender: context.user._id,
            receiver: receiverId,
            status: 'pending'
          });

          await newRequest.save();

          // Update both users' friendRequests arrays
          await User.findByIdAndUpdate(context.user._id, { $push: { friendRequests: newRequest._id } });
          await User.findByIdAndUpdate(receiverId, { $push: { friendRequests: newRequest._id } });

          const populatedRequest = await FriendRequest.findById(newRequest._id)
            .populate('sender', '_id username')
            .populate('receiver', '_id username');

          return populatedRequest;
        } catch (error) {
          console.error("Error in sendFriendRequest resolver:", error);
          throw new Error(error.message);
        }
      }
      throw new AuthenticationError("Not logged in");
    },

    respondFriendRequest: async (parent, { requestId, status }, context) => {
      if (context.user) {
        const friendRequest = await FriendRequest.findById(requestId);
        if (!friendRequest) {
          throw new Error("Friend request not found");
        }

        friendRequest.status = status;
        await friendRequest.save();

        if (status === 'accepted') {
          // Add each user to the other's friends list
          await User.findByIdAndUpdate(friendRequest.sender, { $addToSet: { friends: friendRequest.receiver } });
          await User.findByIdAndUpdate(friendRequest.receiver, { $addToSet: { friends: friendRequest.sender } });
        }

        return friendRequest;
      }
      throw new AuthenticationError("Not logged in");
    },
    removeFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { friends: friendId } },
          { new: true }
        ).populate('friends');

        await User.findByIdAndUpdate(
          friendId,
          { $pull: { friends: context.user._id } }
        );

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
