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
      await refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDescriptionChange = (e) => {
    const input = e.target.value;
    if (input.length <= 100) {
      setDescription(input);
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
              onChange={handleDescriptionChange}
              placeholder="Share your success story... (max 100 characters)"
              required
              maxLength={100}
            />
            <div className="character-count">{description.length}/100</div>
            <button type="submit">Post Story</button>
          </form>
        )}
        <div className="stories-list">
          {posts.length === 0 ? (
            <p className="no-stories">No Success Stories Available</p>
          ) : (
            posts.map((post) => (
              <div key={post._id} className="story-card">
                <Link
                  to={`/profile/${post.postAuthor.username}`}
                  className="story-header"
                >
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
                    <div className="profile-hover-notification">View Profile</div>
                  </div>
                  <h3 className="author-username">{post.postAuthor ? post.postAuthor.username : 'Unknown User'}</h3>
                </Link>
                <Link to={`/post/${post._id}`} className="post-link">
                  <div className="post-description-box">
                    <p className="post-description">{post.description}</p>
                  </div>
                </Link>
                <span className="timestamp">{post.createdAt}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
