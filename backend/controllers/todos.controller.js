import axios from "axios";
const DUMMY_BASE = process.env.BASE_URL || "https://dummyjson.com";

export const getTodos = async (req, res) => {
  const { token, user } = req;
  const page = parseInt(req.query.page || "1", 10);
  const limit = parseInt(req.query.limit || "5", 10);
  const skip = (page - 1) * limit;

  try {
    const response = await axios.get(
      `${DUMMY_BASE}/todos/user/${user.id}?limit=${limit}&skip=${skip}`,
      { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
    );

    res.json({
      todos: response.data.todos,
      total: response.data.total,
      page,
      limit,
    });
  } catch {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

export const createTodo = async (req, res) => {
  const { user, token } = req;
  const { todo, completed } = req.body;

  try {
    const response = await axios.post(
      `${DUMMY_BASE}/todos/add`,
      { todo, completed, userId: user.id },
      { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
    );

    res.json(response.data);
  } catch {
    res.status(500).json({ error: "Failed to create todo" });
  }
};

export const updateTodo = async (req, res) => {
  const { user, token } = req;
  const { id } = req.params;
  const { todo, completed } = req.body;

  try {
    const todoResponse = await axios.get(`${DUMMY_BASE}/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    if (todoResponse.data.userId !== user.id)
      return res.status(403).json({ error: "Forbidden" });

    const response = await axios.put(
      `${DUMMY_BASE}/todos/${id}`,
      { todo, completed },
      { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
    );

    res.json(response.data);
  } catch {
    res.status(500).json({ error: "Failed to update todo" });
  }
};

export const deleteTodo = async (req, res) => {
  const { user, token } = req;
  const { id } = req.params;

  try {
    const todoResponse = await axios.get(`${DUMMY_BASE}/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    if (todoResponse.data.userId !== user.id)
      return res.status(403).json({ error: "Forbidden" });

    const response = await axios.delete(`${DUMMY_BASE}/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    res.json(response.data);
  } catch {
    res.status(500).json({ error: "Failed to delete todo" });
  }
};
