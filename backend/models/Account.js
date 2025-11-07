const AccountSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  accountNumber: String,
  accountType: String,
  balance: Number,
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model("Account", AccountSchema);
