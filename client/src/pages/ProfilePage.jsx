import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { UPDATE_PROFILE_IMAGE } from "../utils/mutations";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import { FaUser, FaEdit, FaTrash } from "react-icons/fa";
import "../styles/ProfilePage.css";
import CloudinaryUploadWidget from "../components/CloudinaryUploadWidget";

const ProfilePage = () => {
  const { loading, data, refetch } = useQuery(QUERY_ME);
  const [updateProfileImage] = useMutation(UPDATE_PROFILE_IMAGE);
  const user = data?.me || {};

  const handleImageUpload = async (imageUrl) => {
    try {
      await updateProfileImage({
        variables: { profileImage: imageUrl },
      });
      refetch();
    } catch (err) {
      console.error("Error updating profile image:", err);
    }
  };

  if (loading) {
    return <div className="profile-page loading">Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-image-container">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.username}
              className="profile-image"
            />
          ) : (
            <div className="profile-image-placeholder">
              <FaUser />
            </div>
          )}
          <CloudinaryUploadWidget onImageUpload={handleImageUpload}>
            <button className="edit-overlay">
              <FaEdit className="edit-icon" />
            </button>
          </CloudinaryUploadWidget>
        </div>
        <h1 className="profile-username">{user.username}</h1>
        <p className="profile-email">{user.email}</p>
        <div className="profile-stats">
          <div className="stat">
            <span className="stat-value">{user.posts?.length || 0}</span>
            <span className="stat-label">Posts</span>
          </div>
          <div className="stat">
            <span className="stat-value">{user.friends?.length || 0}</span>
            <span className="stat-label">Friends</span>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="friends-section">
          <h2>Friends</h2>
          {user.friends && user.friends.length > 0 ? (
            <ul className="friends-list">
              {user.friends.map((friend) => (
                <li key={friend._id} className="friend-item">
                  <Link to={`/profile/${friend.username}`}>
                    <div className="friend-image-container">
                      {friend.profileImage ? (
                        <img
                          src={friend.profileImage}
                          alt={friend.username}
                          className="friend-image"
                        />
                      ) : (
                        <div className="friend-image-placeholder">
                          <FaUser />
                        </div>
                      )}
                    </div>
                    <span className="friend-username">{friend.username}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-friends">No friends yet.</p>
          )}
        </div>

        <div className="posts-section">
          <h2>Success Stories</h2>
          {user.posts && user.posts.length > 0 ? (
            <ul className="posts-list">
              {user.posts.map((post) => (
                <li key={post._id} className="post-item">
                  <Link to={`/post/${post._id}`} className="post-link">
                    <p className="post-description">{post.description}</p>
                    <span className="post-date">{post.createdAt}</span>
                  </Link>
                  <button className="delete-post-btn">
                    <FaTrash /> Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-posts">No success stories yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
