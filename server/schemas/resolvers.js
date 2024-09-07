respondFriendRequest: async (parent, { requestId, status }, context) => {
  if (!context.user) {
    throw new AuthenticationError('You need to be logged in!');
  }

  try {
    console.log('Finding friend request:', requestId);
    const updatedRequest = await FriendRequest.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    ).populate('sender receiver');

    console.log('Updated request:', JSON.stringify(updatedRequest, null, 2));

    if (!updatedRequest) {
      throw new Error('Friend request not found');
    }

    if (!updatedRequest.sender || !updatedRequest.receiver) {
      throw new Error('Invalid friend request data');
    }

    console.log('Sender:', JSON.stringify(updatedRequest.sender, null, 2));
    console.log('Receiver:', JSON.stringify(updatedRequest.receiver, null, 2));

    if (status === 'accepted') {
      console.log('Updating friends lists');
      await User.findByIdAndUpdate(updatedRequest.sender._id, {
        $addToSet: { friends: updatedRequest.receiver._id }
      });
      await User.findByIdAndUpdate(updatedRequest.receiver._id, {
        $addToSet: { friends: updatedRequest.sender._id }
      });
    }

    // Fetch the updated user data
    const updatedSender = await User.findById(updatedRequest.sender._id);
    const updatedReceiver = await User.findById(updatedRequest.receiver._id);

    if (!updatedSender || !updatedReceiver) {
      throw new Error('Failed to fetch updated user data');
    }

    if (!updatedSender.username || !updatedReceiver.username) {
      throw new Error('Username is missing for sender or receiver');
    }

    const result = {
      _id: updatedRequest._id,
      sender: {
        _id: updatedSender._id,
        username: updatedSender.username
      },
      receiver: {
        _id: updatedReceiver._id,
        username: updatedReceiver.username
      },
      status: updatedRequest.status
    };

    console.log('Returning result:', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('Error in respondFriendRequest:', error);
    throw new Error(`Failed to respond to friend request: ${error.message}`);
  }
},