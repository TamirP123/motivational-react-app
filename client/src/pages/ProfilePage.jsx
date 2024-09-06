import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link, useParams, Navigate } from 'react-router-dom';
import { QUERY_ME, QUERY_USER } from '../utils/queries';
import { UPDATE_PROFILE_IMAGE, REMOVE_POST } from '../utils/mutations';
import CloudinaryUploadWidget from '../components/CloudinaryUploadWidget';
import { FaUser, FaEdit, FaTrash } from 'react-icons/fa';
import Auth from '../utils/auth';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const { username: userParam } = useParams();
  const [imageUrl, setImageUrl] = useState('');
  const [updateProfileImage] = useMutation(UPDATE_PROFILE_IMAGE);
  const [removePost] = useMutation(REMOVE_POST);

  const { loading, data, error, refetch } = useQuery(QUERY_ME);

  console.log('Auth.loggedIn():', Auth.loggedIn());
  console.log('userParam:', userParam);
  console.log('data:', data);
  console.log('error:', error);

  if (loading) return <div className="profile-page">Loading...</div>;

  if (error) {
    console.error('GraphQL error:', error);
    return <div className="profile-page">Error loading profile. Please try again later.</div>;
  }

  if (!Auth.loggedIn()) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  if (!data || (!data.me && !data.user)) {
    return <div className="profile-page">No user data available. Please try logging in again.</div>;
  }

  const user = data.me || data.user;
  const isPersonalProfile = Auth.loggedIn() && (!userParam || Auth.getProfile().data.username === userParam);

  if (!isPersonalProfile && userParam) {
    return <Navigate to={`/profile/${userParam}`} />;
  }

  const handleImageUpload = async (url) => {
    setImageUrl(url);
    try {
      await updateProfileImage({
        variables: { profileImage: url },
      });
    } catch (err) {
      console.error('Error updating profile image:', err);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const { data } = await removePost({
        variables: { postId },
      });
      console.log('Post removed:', data.removePost);
      refetch();
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-banner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-3 text-center">
              <div className="profile-image-container">
                {user.profileImage || imageUrl ? (
                  <img 
                    src={user.profileImage || imageUrl} 
                    alt="Profile" 
                    className="profile-image" 
                  />
                ) : (
                  <div className="profile-image-placeholder">
                    <FaUser />
                  </div>
                )}
                {isPersonalProfile && (
                  <div className="edit-overlay">
                    <CloudinaryUploadWidget onImageUpload={handleImageUpload}>
                      <FaEdit className="edit-icon" />
                    </CloudinaryUploadWidget>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-9 profile-info">
              <h2 className="profile-username">{user.username}</h2>
              <p className="profile-email">{user.email}</p>
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
          {data?.me?.posts && data.me.posts.length > 0 ? (
            data.me.posts.map((post) => (
              <div key={post._id} className="post-item">
                <Link to={`/post/${post._id}`} className="post-link">
                  <p className="post-description">{post.description}</p>
                </Link>
                <p className="post-date">Created at: {post.createdAt}</p>
                <button className="delete-post-btn" onClick={() => handleDeletePost(post._id)}>
                  <FaTrash /> Delete Post
                </button>
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

export default ProfilePage;