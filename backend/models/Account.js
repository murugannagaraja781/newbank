import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  accountNumber: String,
  accountType: String,
  balance: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Account", accountSchema);
