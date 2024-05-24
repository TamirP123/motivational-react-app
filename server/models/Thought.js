const { Schema, model } = require("mongoose");
const dayjs = require("dayjs");

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: "You need to leave a thought!",
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  thoughtAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function (dateTime) {
      return dayjs(dateTime).format("h:mm A MM/DD/YYYY");
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
      createdAt: {
        type: Date,
        default: Date.now,
        get: function (dateTime) {
          return dayjs(dateTime).format("h:mm A MM/DD/YYYY");
        },
      },
    },
  ],
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
