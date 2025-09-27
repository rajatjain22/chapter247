import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "./todosSlice";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    credentials: "include",
  }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    fetchTodos: builder.query<{ todos: Todo[]; total: number }, { page: number; limit: number }>({
      query: ({ page, limit }) => `/todos?page=${page}&limit=${limit}`,
      providesTags: (result) =>
        result
          ? [...result.todos.map(({ id }) => ({ type: "Todos" as const, id })), { type: "Todos", id: "LIST" }]
          : [{ type: "Todos", id: "LIST" }],
    }),
    updateTodo: builder.mutation<Todo, Todo>({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PUT",
        body: todo,
      }),
      invalidatesTags: (result, error, todo) => [{ type: "Todos", id: todo.id }],
    }),
    deleteTodo: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({ url: `/todos/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
  }),
});

export const {
  useFetchTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi;
