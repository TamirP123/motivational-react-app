import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || {};

  if (loading) {
    return <div className="profile-page">Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-banner">
        <div className="profile-image-container">
          {user.profileImage ? (
            <img src={user.profileImage} alt={user.username} className="profile-image" />
          ) : (
            <div className="profile-image-placeholder">
              <FaUser />
            </div>
          )}
        </div>
        <h2 className="profile-username">{user.username}'s Profile</h2>
        <p className="profile-email">Email: {user.email}</p>
      </div>
      
      <div className="profile-content">
        <div className="friends-section">
          <h3>Friends</h3>
          {user.friends && user.friends.length > 0 ? (
            <ul className="friends-list">
              {user.friends.map((friend) => (
                <li key={friend._id} className="friend-item">
                  <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No friends yet.</p>
          )}
        </div>

        <div className="posts-section">
          <h3>Posts</h3>
          {user.posts && user.posts.length > 0 ? (
            <ul className="posts-list">
              {user.posts.map((post) => (
                <li key={post._id} className="post-item">
                  <Link to={`/post/${post._id}`}>{post.description}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;