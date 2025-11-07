import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  customerId: { type: String, unique: true },
  name: String,
  email: String,
  password: String, // hashed
  accountType: { type: String, default: "Savings" },
  consent: { type: Boolean, default: false },
});
export default mongoose.model("User", UserSchema);
