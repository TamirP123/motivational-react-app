import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_POST } from "../utils/queries";
import { ADD_COMMENT, REMOVE_COMMENT } from "../utils/mutations";
import Auth from "../utils/auth";
import { FaUser, FaArrowLeft } from "react-icons/fa";
import "../styles/Post.css";

const Post = () => {
  const { postId } = useParams();
  const [commentText, setCommentText] = useState("");

  const { loading, data, error } = useQuery(QUERY_SINGLE_POST, {
    variables: { postId: postId },
  });

  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [
      { query: QUERY_SINGLE_POST, variables: { postId: postId } },
    ],
  });

  const [removeComment] = useMutation(REMOVE_COMMENT, {
    refetchQueries: [
      { query: QUERY_SINGLE_POST, variables: { postId: postId } },
    ],
  });

  const post = data?.post || {};

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await addComment({
        variables: { postId, commentText },
      });
      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await removeComment({
        variables: { postId, commentId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;
  if (!post) return <div className="error">Post not found</div>;

  return (
    <div className="post-page">
      <Link to="/success-stories" className="back-button">
        <FaArrowLeft /> Back to Success Stories
      </Link>
      <div className="post-content">
        <div className="post-header">
          <div className="post-author-info">
            <Link
              to={`/profile/${post.postAuthor?.username}`}
              className="author-link"
            >
              {post.postAuthor?.profileImage ? (
                <img
                  src={post.postAuthor.profileImage}
                  alt={post.postAuthor.username}
                  className="author-image"
                />
              ) : (
                <div className="author-image-placeholder">
                  <FaUser />
                </div>
              )}
              <div className="profile-hover-notification">View Profile</div>
            </Link>
            <div className="author-details">
              <Link
                to={`/profile/${post.postAuthor?.username}`}
                className="author-link"
              >
                <h2>
                  {post.postAuthor?.username || "Unknown User"}'s Success Story
                </h2>
              </Link>
              <span className="post-timestamp">{post.createdAt}</span>
            </div>
          </div>
        </div>
        <p className="post-description">{post.description}</p>
      </div>
      <div className="comments-section">
        <h3>Comments</h3>
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <div key={comment._id} className="comment">
              <div className="comment-header">
                <span className="comment-author">{comment.commentAuthor}</span>
                <span className="comment-author">
                  {comment.commentProfileImage}
                </span>
                <span className="comment-timestamp">{comment.createdAt}</span>
              </div>
              <p className="comment-text">{comment.commentText}</p>
              {Auth.loggedIn() &&
                Auth.getProfile().authenticatedPerson.username ===
                  comment.commentAuthor && (
                  <button
                    className="delete-comment"
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    Delete
                  </button>
                )}
            </div>
          ))
        ) : (
          <p className="no-comments">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
      {Auth.loggedIn() && (
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <h4>Add a Comment</h4>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Share your thoughts..."
            required
          />
          <button type="submit">Post Comment</button>
        </form>
      )}
    </div>
  );
};

export default Post;
