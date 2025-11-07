import express from "express";
import nodemailer from "nodemailer";
import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
let tempOtp = "";

router.post("/send-otp", protect, async (req, res) => {
  const { email } = req.body;
  tempOtp = Math.floor(100000 + Math.random() * 900000).toString();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "OTP for Fund Transfer",
    text: `Your OTP is ${tempOtp}`,
  });

  res.json({ message: "OTP sent to email" });
});

router.post("/transfer", protect, async (req, res) => {
  const { fromAcc, toAcc, amount, otp, remarks } = req.body;
  if (otp !== tempOtp) return res.status(400).json({ message: "Invalid OTP" });

  const sender = await Account.findOne({ accountNumber: fromAcc });
  const receiver = await Account.findOne({ accountNumber: toAcc });

  if (!sender || !receiver)
    return res.status(400).json({ message: "Invalid accounts" });
  if (sender.balance < amount)
    return res.status(400).json({ message: "Insufficient funds" });

  sender.balance -= amount;
  receiver.balance += amount;

  await sender.save();
  await receiver.save();

  await Transaction.create({
    fromAccount: fromAcc,
    toAccount: toAcc,
    amount,
    remarks,
    transactionType: "DR",
  });
  await Transaction.create({
    fromAccount: toAcc,
    toAccount: fromAcc,
    amount,
    remarks,
    transactionType: "CR",
  });

  tempOtp = "";
  res.json({ message: "Transfer successful" });
});

export default router;
