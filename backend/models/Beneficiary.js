const BeneficiarySchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  accountNumber: String,
});
export default mongoose.model("Beneficiary", BeneficiarySchema);
