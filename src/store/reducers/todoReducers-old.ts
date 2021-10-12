import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTodos, getTodo } from '../actions/todoAction-old';

//  Coming data of API
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TodoSliceState {
  todos: Todo[];
  todo: Todo;
  loading: boolean;
  error: string | null;
}

const initialState = {
  todos: [],
  todo: {} as Todo,
  loading: true,
  error: null,
} as TodoSliceState;

const todoReducers = createSlice({
  name: 'todos',
  initialState,

  // normal actions create here
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      // console.log('action', action);
      state.todos = [...state.todos, action.payload];
    },
  },

  extraReducers: {
    // pending promise
    [getTodos.pending.name]: (state, action) => {
      console.log('action.payload', action.payload);
      state.loading = true;
    },
    // fulfilled promise
    [getTodos.fulfilled.name]: (state, action) => {
      console.log('action.payload', action.payload);
      state.loading = false;
      // response.data accessed
      state.todos = action.payload;
    },
    // rejected promise error
    [getTodos.rejected.name]: (state, action) => {
      console.log('action.payload', action.payload);
      state.loading = false;
      state.error = action.payload;
    },
    // ------------------------------ //

    // pending promise
    [getTodo.pending.name]: (state, action) => {
      state.loading = true;
    },
    // fulfilled promise
    [getTodo.fulfilled.name]: (state, action) => {
      state.loading = false;
      // response.data accessed
      state.todo = action.payload;
    },
    // rejected promise error
    [getTodo.rejected.name]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addTodo } = todoReducers.actions;

export default todoReducers.reducer;
