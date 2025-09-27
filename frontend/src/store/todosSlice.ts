import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import API from "@/utils/API";

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

interface TodosState {
  todosByPage: Record<number, Todo[]>;
  totalByPage: Record<number, number>;
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
}

const initialState: TodosState = {
  todosByPage: {},
  totalByPage: {},
  loading: false,
  error: null,
  page: 1,
  limit: 5,
};

export const fetchTodos = createAsyncThunk(
  "todos/fetch",
  async ({ page = 1, limit = 5 }: { page?: number; limit?: number }) => {
    const { data } = await API.get(`/todos?page=${page}&limit=${limit}`);
    return { page, data };
  }
);

export const addTodo = createAsyncThunk(
  "todos/add",
  async (todoText: string, { getState }) => {
    const { data } = await API.post("/todos", { todo: todoText, completed: false });
    return data as Todo;
  }
);

export const updateTodo = createAsyncThunk("todos/update", async (todo: Todo) => {
  const { data } = await API.put(`/todos/${todo.id}`, todo);
  return data as Todo;
});

export const deleteTodo = createAsyncThunk("todos/delete", async (id: number) => {
  await API.delete(`/todos/${id}`);
  return id;
});

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<any>) => {
        const { page, data } = action.payload;
        state.todosByPage[page] = data.todos;
        state.totalByPage[page] = data.total;
        state.page = page;
        state.limit = data.limit;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch todos";
      })
      // ADD
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        // Insert in current page
        const currentPage = state.page;
        if (!state.todosByPage[currentPage]) state.todosByPage[currentPage] = [];
        state.todosByPage[currentPage] = [action.payload, ...state.todosByPage[currentPage]];
        state.totalByPage[currentPage] = (state.totalByPage[currentPage] || 0) + 1;

        // Keep page limit
        if (state.todosByPage[currentPage].length > state.limit) {
          state.todosByPage[currentPage].pop();
        }
      })
      // UPDATE
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const todo = action.payload;
        Object.keys(state.todosByPage).forEach((page) => {
          const index = state.todosByPage[Number(page)].findIndex((t) => t.id === todo.id);
          if (index !== -1) state.todosByPage[Number(page)][index] = todo;
        });
      })
      // DELETE
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<number>) => {
        const id = action.payload;
        Object.keys(state.todosByPage).forEach((page) => {
          state.todosByPage[Number(page)] = state.todosByPage[Number(page)].filter((t) => t.id !== id);
          state.totalByPage[Number(page)] = Math.max((state.totalByPage[Number(page)] || 1) - 1, 0);
        });
      });
  },
});

export default todosSlice.reducer;
