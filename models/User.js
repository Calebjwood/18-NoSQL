const { Schema, model } = require("mongoose");
const Thought = require("./Thought");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unque: true,
      trim: true,
    },
    email: {
      type: String,
      unque: true,
      validate: {
        validator: function(v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email"
    },
    required: [true, "Email required"]
    },
    thoughts: [Thought],
    // friends: [this],
    //self reference
  },
  {
    toJSON: {
      virtuals: true,
    }
  }
);

userSchema.virtuals("friendCount").get(function () {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
