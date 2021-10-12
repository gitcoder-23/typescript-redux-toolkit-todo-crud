// to call api data
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API from '../../api';
import { RootState, AppDispatch } from '../store';
export type TodoId = number;
export interface Todo {
  userId: number;
  id: TodoId;
  title: string;
  completed: boolean;
}

// List Todo
export const getTodos = createAsyncThunk<
  Todo[],
  undefined,
  { state: RootState }
>('getTodos', async (_, thunkAPI) => {
  const response = await API.get('/todos');
  return response.data;
});

// Single Todo
// export const getTodo = createAsyncThunk<
//   Todo,
//   { id: number },
//   { state: RootState }
// >('todo', async (id) => {
//   const response = await API.get(`/todo/${id}`);
//   return response.data;
// });

// export const getTodo = createAsyncThunk<
//   Todo,
//   { id: number },
//   { state: RootState }
// >('getTodo', async ({ id }) => {
//   const response = await API.get(`/todos/${id}`);
//   return response.data;
// });

// Add Todo

export const addTodos = createAsyncThunk<
  Todo,
  { data: Todo },
  { state: RootState }
>('addtodos', async ({ data }) => {
  const response = await API.post('/todos', data);
  return response.data;
});

//  update Todo
export const updateTodos = createAsyncThunk<
  Todo,
  { data: Todo },
  { state: RootState }
>('updatetodos', async ({ data }) => {
  const response = await API.patch(`/todos/${data.id}`, data);
  return response.data;
});

// Delete Todo

export const deleteTodos = createAsyncThunk<
  Todo,
  { id: number },
  { state: RootState }
>('deletetodos', async ({ id }) => {
  const response = await API.delete(`/todos/${id}`);
  console.log('response', response);
  return response.data;
});
