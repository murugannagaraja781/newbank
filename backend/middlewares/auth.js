import jwt from "jsonwebtoken";
export default function (req, res, next) {
  const token = req.header("authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id };
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}
