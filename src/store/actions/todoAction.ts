// to call api data
import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../api';

// to get all todos
export const getTodos = createAsyncThunk('todos', async () => {
  const response = await API.get('/todos');
  return response.data;
});

// to get single todo data by id
export const getTodo = createAsyncThunk('todo', async (id: number) => {
  const response = await API.get(`/todo/${id}`);
  return response.data;
});
