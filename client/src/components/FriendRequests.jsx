import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_FRIEND_REQUESTS } from "../utils/queries";
import { RESPOND_FRIEND_REQUEST } from "../utils/mutations";

const FriendRequestsDropdown = () => {
  const { loading, data, error } = useQuery(QUERY_FRIEND_REQUESTS);
  const [respondFriendRequest] = useMutation(RESPOND_FRIEND_REQUEST);

  if (loading) return <div>Loading friend requests...</div>;
  if (error) return <div>Error loading friend requests</div>;

  const handleResponse = (requestId, status) => {
    respondFriendRequest({
      variables: { requestId, status },
      refetchQueries: [{ query: QUERY_FRIEND_REQUESTS }],
    });
  };

  return (
    <div>
      <h4>Friend Requests</h4>
      {data.myFriendRequests.map((request) => (
        <div key={request._id}>
          <p>{request.sender.username} wants to be friends!</p>
          <button onClick={() => handleResponse(request._id, "ACCEPTED")}>
            Accept
          </button>
          <button onClick={() => handleResponse(request._id, "REJECTED")}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
};

export default FriendRequestsDropdown;
