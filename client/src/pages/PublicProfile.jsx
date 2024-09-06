import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import { QUERY_USER } from '../utils/queries';
import { FaUser } from 'react-icons/fa';
import '../styles/ProfilePage.css';

const PublicProfile = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: userParam },
  });

  const user = data?.user || {};

  if (loading) return <div className="profile-page">Loading...</div>;

  return (
    <div className="profile-page">
      <div className="profile-banner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-3 text-center">
              <div className="profile-image-container">
                {user.profileImage ? (
                  <img 
                    src={user.profileImage} 
                    alt="Profile" 
                    className="profile-image" 
                  />
                ) : (
                  <div className="profile-image-placeholder">
                    <FaUser />
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-9 profile-info">
              <h2 className="profile-username">{user.username}</h2>
              <p className="profile-stats">
                <span>{user.posts?.length || 0} posts</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <div className="posts-section">
          <h3 className="posts-title">Posts</h3>
          {user.posts && user.posts.length > 0 ? (
            user.posts.map((post) => (
              <div key={post._id} className="post-item">
                <Link to={`/post/${post._id}`} className="post-link">
                  <p className="post-description">{post.description}</p>
                </Link>
                <p className="post-date">Created at: {new Date(parseInt(post.createdAt)).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p className="no-posts">No posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;