import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";

const router = express.Router();

router.get("/summary", protect, async (req, res) => {
  const account = await Account.findOne({ userId: req.user });
  res.json(account);
});

router.get("/details/:accNo", protect, async (req, res) => {
  const transactions = await Transaction.find({ fromAccount: req.params.accNo })
    .sort({ createdAt: -1 })
    .limit(10);
  res.json(transactions);
});

export default router;
