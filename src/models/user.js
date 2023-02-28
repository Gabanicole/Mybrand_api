import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  created_on: { type: Date, default: Date.now },
});
const User = mongoose.model("User", userSchema);
export default User;
