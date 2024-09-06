const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');

const postSchema = new Schema({
    description: {
        type: String,
        trim: true,
        required: true,
    },
    postAuthor: {
        type: String,
        trim: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function(dateTime){
            return dayjs(dateTime).format("h:mm A MM/DD/YYYY")
        },
    },
    comments: [
        {
          commentText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
          },
          commentAuthor: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
            get: function(dateTime){
                return dayjs(dateTime).format("h:mm A MM/DD/YYYY")
            },
          },
        },
    ],
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);


const Post = model('Post', postSchema);

module.exports = Post;