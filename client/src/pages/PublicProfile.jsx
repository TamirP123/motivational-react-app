import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, Link, useNavigate } from "react-router-dom";

import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { SEND_FRIEND_REQUEST, REMOVE_FRIEND } from "../utils/mutations";
import {
  FaUser,
  FaArrowLeft,
  FaUserPlus,
  FaUserMinus,
  FaTwitter,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import Auth from "../utils/auth";
import "../styles/PublicProfile.css";

const PublicProfile = () => {
  const { username: userParam } = useParams();
  const navigate = useNavigate();
  const [relationshipStatus, setRelationshipStatus] = useState("not_friends");
  const [notification, setNotification] = useState(null);

  const { loading, data, error, refetch } = useQuery(QUERY_USER, {
    variables: { username: userParam },
    fetchPolicy: "network-only",
    onError: (error) => {
      console.error("GraphQL error:", error);
    },
  });

  const { data: userData, refetch: refetchMe } = useQuery(QUERY_ME, {
    fetchPolicy: "network-only",
  });

  const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST);
  const [removeFriend] = useMutation(REMOVE_FRIEND);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (data?.user && userData?.me) {
      updateRelationshipStatus();
    }
  }, [data, userData]);

  const updateRelationshipStatus = () => {
    if (!data?.user || !userData?.me) return;

    const currentUser = userData.me;
    const profileUser = data.user;

    // Check if they are already friends
    const isFriend = currentUser.friends?.some(
      (friend) => friend._id === profileUser._id
    );
    if (isFriend) {
      setRelationshipStatus("friends");
      return;
    }

    // Check for pending friend requests
    const pendingRequest = profileUser.friendRequests?.find(
      (request) =>
        (request.sender._id === currentUser._id &&
          request.receiver._id === profileUser._id) ||
        (request.sender._id === profileUser._id &&
          request.receiver._id === currentUser._id)
    );

    if (pendingRequest) {
      setRelationshipStatus("pending");
    } else {
      setRelationshipStatus("not_friends");
    }
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSendFriendRequest = async () => {
    if (!Auth.loggedIn()) {
      showNotification(
        "You must be logged in to send a friend request.",
        "error"
      );
      return;
    }

    try {
      await sendFriendRequest({
        variables: { receiverId: data.user._id },
      });
      setRelationshipStatus("pending");
      showNotification("Friend request sent successfully!");
      refetch();
      refetchMe();
    } catch (err) {
      console.error("Error sending friend request:", err);
      if (err.message.includes("Friend request already sent")) {
        showNotification("Friend request already sent!", "info");
        setRelationshipStatus("pending");
      } else {
        showNotification(
          "Failed to send friend request. Please try again.",
          "error"
        );
      }
    }
  };

  const handleRemoveFriend = async () => {
    if (!Auth.loggedIn()) {
      showNotification("You must be logged in to remove a friend.", "error");
      return;
    }

    try {
      await removeFriend({
        variables: { friendId: data.user._id },
      });
      setRelationshipStatus("not_friends");
      showNotification("Friend removed successfully!");
      refetch();
      refetchMe();
    } catch (err) {
      console.error("Error removing friend:", err);
      showNotification("Failed to remove friend. Please try again.", "error");
    }
  };

  const renderRelationshipButton = () => {
    if (
      !Auth.loggedIn() ||
      Auth.getProfile().authenticatedPerson._id === data.user._id
    ) {
      return null;
    }

    switch (relationshipStatus) {
      case "friends":
        return (
          <button
            onClick={handleRemoveFriend}
            className="friend-request-button remove-friend"
          >
            <FaUserMinus /> Remove Friend
          </button>
        );
      case "pending":
        return (
          <button className="friend-request-button" disabled>
            Request Pending
          </button>
        );
      case "not_friends":
        return (
          <button
            onClick={handleSendFriendRequest}
            className="friend-request-button add-friend"
          >
            <FaUserPlus /> Send Friend Request
          </button>
        );
      default:
        return null;
    }
  };

  const renderSocialIcons = () => {
    const socialIcons = [
      { icon: FaTwitter, key: "twitter" },
      { icon: FaLinkedin, key: "linkedin" },
      { icon: FaGithub, key: "github" },
    ];

    return (
      <div className="social-icons-container">
        {socialIcons.map(({ icon: Icon, key }) =>
          user.socialLinks && user.socialLinks[key] ? (
            <a
              key={key}
              href={user.socialLinks[key]}
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={key}
            >
              <Icon />
            </a>
          ) : null
        )}
      </div>
    );
  };

  if (loading) return <div className="public-profile">Loading...</div>;
  if (error)
    return <div className="public-profile">Error: {error.message}</div>;
  if (!data || !data.user)
    return <div className="public-profile">User not found</div>;

  const user = data.user;

  return (
    <div className="public-profile">
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <button onClick={() => navigate(-1)} className="back-button">
        <FaArrowLeft /> Back
      </button>
      <div className="profile-banner">
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
        </div>
        <h2 className="profile-username">{user.username}</h2>
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
        {renderRelationshipButton()}
        {renderSocialIcons()}
      </div>
      <div className="posts-section">
        <h3 className="posts-title">Success Stories</h3>
        <div className="posts-container">
          {user.posts && user.posts.length > 0 ? (
            user.posts.map((post) => (
              <div key={post._id} className="post-item">
                <Link to={`/post/${post._id}`} className="post-link">
                  <p className="post-description">{post.description}</p>
                  <p className="post-date">{post.createdAt}</p>
                </Link>
              </div>
            ))
          ) : (
            <p className="no-posts">No success stories yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
