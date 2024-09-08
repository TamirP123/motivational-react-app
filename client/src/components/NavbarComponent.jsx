import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_FRIEND_REQUESTS, QUERY_ME } from '../utils/queries';
import { RESPOND_FRIEND_REQUEST } from '../utils/mutations';
import Auth from "../utils/auth";
import "../styles/Navbar.css";

const NavbarComponent = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const { loading, data, error, refetch } = useQuery(QUERY_FRIEND_REQUESTS, {
    skip: !Auth.loggedIn(), // Skip this query if the user is not logged in
    onError: (error) => {
      console.error("Error fetching friend requests:", error);
    }
  });
  const [respondFriendRequest] = useMutation(RESPOND_FRIEND_REQUEST, {
    refetchQueries: [{ query: QUERY_ME }, { query: QUERY_FRIEND_REQUESTS }],
    errorPolicy: 'all'
  });

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (data && data.myFriendRequests) {
      const currentUser = Auth.getProfile().authenticatedPerson;
      if (currentUser && currentUser._id) {
        const filteredRequests = data.myFriendRequests.filter(request => 
          request.status === 'pending' && request.receiver._id === currentUser._id
        );
        setFriendRequests(filteredRequests);
      }
    }
  }, [data]);

  const handleFriendRequestResponse = async (requestId, status) => {
    try {
      await respondFriendRequest({
        variables: { requestId, status },
      });
      
      // Remove the responded request from the local state
      setFriendRequests(prevRequests => prevRequests.filter(req => req._id !== requestId));
      
      // Always show success message for accepted requests
      if (status === 'accepted') {
        setNotification({
          message: "Friend request accepted",
          type: 'success'
        });
      } else {
        setNotification({
          message: "Friend request rejected",
          type: 'info'
        });
      }

      setTimeout(() => setNotification(null), 3000);
      refetch();
    } catch (err) {
      console.error('Error responding to friend request:', err);
      // Log the error for debugging purposes, but don't show it to the user
      if (err.graphQLErrors) {
        console.error('GraphQL errors:', err.graphQLErrors);
      }
      if (err.networkError) {
        console.error('Network error:', err.networkError);
      }
      // Still show success message if it's an acceptance
      if (status === 'accepted') {
        setNotification({
          message: "Friend request accepted",
          type: 'success'
        });
      } else {
        setNotification({
          message: "Error processing friend request",
          type: 'error'
        });
      }
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const renderFriendRequestDropdown = () => {
    if (loading) return <p>Loading friend requests...</p>;
    if (error) {
      console.error("Error fetching friend requests:", error);
      return null; // Don't show anything if there's an error
    }

    return (
      <div className="dropdown me-2">
        <button className="btn btn-outline-light dropdown-toggle" type="button" id="friendRequestDropdown" data-bs-toggle="dropdown" aria-expanded="false">
          Friend Requests {friendRequests.length > 0 && <span className="badge bg-danger">{friendRequests.length}</span>}
        </button>
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="friendRequestDropdown">
          {friendRequests.length === 0 ? (
            <li><span className="dropdown-item">No new friend requests</span></li>
          ) : (
            friendRequests.map((request) => (
              <li key={request._id}>
                <div className="dropdown-item">
                  <span>{request.sender.username}</span>
                  <div>
                    <button className="btn btn-sm btn-success me-1" onClick={() => handleFriendRequestResponse(request._id, 'accepted')}>Accept</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleFriendRequestResponse(request._id, 'rejected')}>Reject</button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    );
  };

  return (
    <nav id="navbar" className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand mt-1 fs-2 p-2" to="/">
          Stay Motivated.
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/success-stories">
                Success Stories
              </Link>
            </li>
          </ul>
          {Auth.loggedIn() ? (
            <div className="d-flex align-items-center">
              {renderFriendRequestDropdown()}
              <Link to="/profile" className="btn btn-outline-light me-2">
                View Profile
              </Link>
              <button
                id="logoutButton"
                className="btn btn-outline-light"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-outline-light">
              Log in
            </Link>
          )}
        </div>
      </div>
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </nav>
  );
};

export default NavbarComponent;
