const TransactionSchema = new mongoose.Schema({
  accountNumber: String,
  type: String, // 'CR' or 'DR'
  amount: Number,
  remarks: String,
  date: { type: Date, default: Date.now },
});
export default mongoose.model("Transaction", TransactionSchema);
