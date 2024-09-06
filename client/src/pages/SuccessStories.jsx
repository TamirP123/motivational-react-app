import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_POSTS } from "../utils/queries";
import { ADD_POST } from "../utils/mutations";
import Auth from "../utils/auth";
import { FaUser } from 'react-icons/fa';
import "../styles/SuccessStories.css";

const SuccessStories = () => {
  const [description, setDescription] = useState("");
  const { loading, data, refetch } = useQuery(QUERY_POSTS);
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [{ query: QUERY_POSTS }]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPost({ variables: { description } });
      setDescription("");
      await refetch(); // Refetch the posts after adding a new one
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;

  const posts = data?.posts || [];

  return (
    <div className="success-stories">
      <div className="stories-content">
        <h1>Success Stories</h1>
        {Auth.loggedIn() && (
          <form onSubmit={handleSubmit} className="story-form">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Share your success story..."
              required
            />
            <button type="submit">Post Story</button>
          </form>
        )}
        <div className="stories-list">
          {posts.length === 0 ? (
            <p className="no-stories">No Success Stories Available</p>
          ) : (
            posts.map((post) => (
              <Link
                to={`/post/${post._id}`}
                key={post._id}
                className="story-card"
              >
                <div className="story-header">
                  <div className="profile-image-container">
                    {post.postAuthor && post.postAuthor.profileImage ? (
                      <img
                        src={post.postAuthor.profileImage}
                        alt={post.postAuthor.username}
                        className="profile-image"
                      />
                    ) : (
                      <div className="profile-image-placeholder">
                        <FaUser />
                      </div>
                    )}
                  </div>
                  <h3 className="author-username">{post.postAuthor ? post.postAuthor.username : 'Unknown User'}</h3>
                </div>
                <p className="post-description">
                  {post.description}
                </p>
                <span className="timestamp">{post.createdAt}</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
