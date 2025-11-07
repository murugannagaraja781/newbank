import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  fromAccount: String,
  toAccount: String,
  amount: Number,
  remarks: String,
  transactionType: { type: String, enum: ["CR", "DR"] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Transaction", transactionSchema);
