import {
  createSlice,
  PayloadAction,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { RootState, AppDispatch } from '../store';
import axios from 'axios';
type TodoState = 'LOADING' | 'READY' | 'ERROR';

//  Coming data of API
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface ShowTodo {
  todositem: Todo[];
  todoState: TodoState;
  errorMessage: string;
}

const initialState: ShowTodo = {
  todositem: [],
  todoState: 'READY',
  errorMessage: '',
};

// List Todo
export const getTodos = createAsyncThunk<
  Todo[],
  undefined,
  { state: RootState }
>('getTodos', async (_, thunkAPI) => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/todos'
  );
  return response.data;
});

// Add Todo

export const addTodos = createAsyncThunk<
  Todo,
  { data: Todo },
  { state: RootState }
>('addtodos', async ({ data }) => {
  const response = await axios.post(
    'https://jsonplaceholder.typicode.com/todos',
    data
  );
  return response.data;
});

//  update Todo
export const updateTodos = createAsyncThunk<
  Todo,
  { data: Todo },
  { state: RootState }
>('updatetodos', async ({ data }) => {
  const response = await axios.patch(
    `https://jsonplaceholder.typicode.com/todos/${data.id}`,
    data
  );
  return response.data;
});

// Delete Todo

export const deleteTodos = createAsyncThunk<
  Todo,
  { id: number },
  { state: RootState }
>('deletetodos', async ({ id }) => {
  const response = await axios.delete(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );
  return response.data;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: initialState,

  // normal actions create here
  reducers: {},

  extraReducers: function (builder) {
    // get Todos
    builder.addCase(getTodos.pending, (state, action) => {
      state.todoState = 'LOADING';
    });
    builder.addCase(
      getTodos.fulfilled,
      (state, action: PayloadAction<Todo[]>) => {
        state.todositem = action.payload;
      }
    );
    builder.addCase(getTodos.rejected, (state, action) => {
      state.todoState = 'ERROR';
      state.errorMessage = action.error.message || '';
    });

    // Add Todos

    builder.addCase(
      addTodos.fulfilled,
      (state, action: PayloadAction<Todo>) => {
        const todos = action.payload;
        if (todos) {
          state.todositem = [...state.todositem, todos];
        }
      }
    );

    // Update Todo

    builder.addCase(
      updateTodos.fulfilled,
      (state, action: PayloadAction<{ id: number }>) => {
        const index = state.todositem.findIndex(
          (tData) => tData.id === action.payload.id
        );
        state.todositem[index] = {
          ...state.todositem[index],
          ...action.payload,
        };
      }
    );

    // Delete Todo

    builder.addCase(
      deleteTodos.fulfilled,
      (state, action: PayloadAction<{ id: number }>) => {
        let index = state.todositem.findIndex(
          ({ id }) => id === action.payload.id
        );
        state.todositem.splice(index, 1);
      }
    );
  },
});

export default todoSlice.reducer;
