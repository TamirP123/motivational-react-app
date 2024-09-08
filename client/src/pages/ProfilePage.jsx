import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { UPDATE_PROFILE_IMAGE, UPDATE_SOCIAL_LINKS } from "../utils/mutations";
import { validateSocialLink } from "../utils/validateSocialLinks";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEdit,
  FaTrash,
  FaTwitter,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import "../styles/ProfilePage.css";
import CloudinaryUploadWidget from "../components/CloudinaryUploadWidget";

const ProfilePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { loading, data, refetch } = useQuery(QUERY_ME);
  const [updateProfileImage] = useMutation(UPDATE_PROFILE_IMAGE);
  const [socialLinks, setSocialLinks] = useState({
    twitter: "",
    linkedin: "",
    github: "",
  });
  const [updateSocialLinks] = useMutation(UPDATE_SOCIAL_LINKS);
  const user = data?.me || {};
  const [notification, setNotification] = useState(null);
  const [socialLinkErrors, setSocialLinkErrors] = useState({
    twitter: "",
    linkedin: "",
    github: "",
  });

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

  useEffect(() => {
    if (data?.me?.socialLinks) {
      setSocialLinks({
        twitter: data.me.socialLinks.twitter || "",
        linkedin: data.me.socialLinks.linkedin || "",
        github: data.me.socialLinks.github || "",
      });
    }
  }, [data]);

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks((prev) => ({ ...prev, [name]: value }));
    
    // Validate the link
    if (!validateSocialLink(name, value)) {
      setSocialLinkErrors((prev) => ({ ...prev, [name]: `Invalid ${name} URL` }));
    } else {
      setSocialLinkErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSocialLinksSubmit = async (e) => {
    e.preventDefault();
    
    // Check if there are any errors
    if (Object.values(socialLinkErrors).some(error => error !== "")) {
      setNotification({ type: 'error', message: 'Please correct the errors before submitting.' });
      return;
    }

    console.log("Submitting social links:", socialLinks);
    try {
      const { data } = await updateSocialLinks({
        variables: { input: socialLinks },
      });
      if (data && data.updateSocialLinks) {
        console.log(
          "Social links updated successfully:",
          data.updateSocialLinks
        );
        setNotification({
          type: "success",
          message: "Social links updated successfully!",
        });
        setTimeout(() => setNotification(null), 3000); // Clear notification after 3 seconds
        refetch();
      } else {
        console.error("Unexpected response structure:", data);
        setNotification({
          type: "error",
          message: "Failed to update social links. Please try again.",
        });
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (err) {
      console.error("Error updating social links:", err);
      setNotification({
        type: "error",
        message: "Failed to update social links. Please try again.",
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  if (loading) {
    return <div className="profile-page loading">Loading...</div>;
  }

  return (
    <div className="profile-page">
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
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
        <div className="sidebar">
          <div className="friends-section">
            <h2>Friends</h2>
            {user.friends && user.friends.length > 0 ? (
              <ul className="friends-list">
                {user.friends.map((friend) => (
                  <li key={friend._id} className="friend-item">
                    <Link to={`/profile/${friend.username}`} className="friend-link">
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

          <div className="social-links-section">
            <h2>Social Media Links</h2>
            <form onSubmit={handleSocialLinksSubmit}>
              {Object.entries(socialLinks).map(([platform, url]) => (
                <div key={platform} className="social-link-input">
                  <label htmlFor={platform}>
                    {platform === "twitter" && <FaTwitter />}
                    {platform === "linkedin" && <FaLinkedin />}
                    {platform === "github" && <FaGithub />}
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="url"
                      id={platform}
                      name={platform}
                      value={url}
                      onChange={handleSocialLinkChange}
                      placeholder={`Enter your ${platform} profile URL`}
                      className={socialLinkErrors[platform] ? "input-error" : ""}
                    />
                    {socialLinkErrors[platform] && (
                      <div className="error-message">
                        <span className="error-icon">!</span>
                        {socialLinkErrors[platform]}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div className="update-social-links-btn-container">
                <button type="submit" className="update-social-links-btn">
                  Update Social Links
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="posts-section">
          <h2>Success Stories</h2>
          {user.posts && user.posts.length > 0 ? (
            <div className="posts-container">
              {user.posts.map((post) => (
                <div key={post._id} className="post-item">
                  <Link to={`/post/${post._id}`} className="post-link">
                    <p className="post-description">{post.description}</p>
                    <span className="post-date">{post.createdAt}</span>
                  </Link>
                  <button className="delete-post-btn">
                    <FaTrash /> Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-posts">No success stories yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
