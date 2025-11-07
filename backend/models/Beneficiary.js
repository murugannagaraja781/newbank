import mongoose from "mongoose";

const beneficiarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  beneficiaryName: String,
  destinationAccount: String,
});

export default mongoose.model("Beneficiary", beneficiarySchema);
