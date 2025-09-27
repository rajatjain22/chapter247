import axios from "axios";
const DUMMY_BASE = process.env.BASE_URL || "https://dummyjson.com";

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await axios.post(
      `${DUMMY_BASE}/auth/login`,
      { username, password, expiresInMins: 30 },
      { withCredentials: true }
    );

    const { accessToken, refreshToken, ...user } = response.data;

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 10 * 60 * 1000,
      sameSite: "lax",
    });

    res.json({ user });
  } catch {
    res.status(401).json({ error: "Invalid credentials" });
  }
};

export const signup = async (req, res) => {
  const { username, password, firstName, lastName } = req.body;
  try {
    const response = await axios.post(`${DUMMY_BASE}/users/add`, {
      username,
      password,
      firstName,
      lastName,
    });

    const user = response.data;

    res.json({ user });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(400).json({ error: "Signup failed" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.json({ success: true });
};

export const getProfile = (req, res) => {
  try {
    res.json(req.user);
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};
