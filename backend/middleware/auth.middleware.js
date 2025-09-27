import axios from "axios";
const DUMMY_BASE = process.env.BASE_URL || "https://dummyjson.com";

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  try {
    const response = await axios.get(`${DUMMY_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    req.user = response.data;
    req.token = token;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

export default authMiddleware;
