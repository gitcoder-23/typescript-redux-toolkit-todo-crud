// to call api data
import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';
export type TodoId = number;
export interface Todo {
  userId: number;
  id: TodoId;
  title: string;
  completed: boolean;
}

// to get all todos
export const getTodos = createAsyncThunk<Todo[]>('todos', async () => {
  const response = await API.get('/todos');
  console.log('response', response.data);

  return response.data;
});

// export async function getTodos(): Promise<Todos[]> {
//   const response = await API.get('/todos');
//   console.log('response', response.data);
//   return response.data;
// }

// to get single todo data by id
export const getTodo = createAsyncThunk('todo', async (id: number) => {
  const response = await API.get(`/todo/${id}`);
  return response.data;
});
