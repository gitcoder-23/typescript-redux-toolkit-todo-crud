import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTodos, getTodo } from '../actions/todoAction';

interface Todo {
  id: number;
  done: boolean;
  text: string;
  title: string;
  loader: boolean;
  errors: any;
  todo: any;
}
interface TodoContainer {
  id: number;
  done: boolean;
  text: string;
}

interface opsTodo {
  loader: boolean;
  errors: string;
}
interface TodoSliceState {
  todos: Todo[];
  loading: opsTodo;
  todosContainer: TodoContainer[];
}

const initialState: TodoSliceState = {
  todos: [],
  // if no todo found
  // todosContainer: [],
  loader: loading,
  // errors: {},
  // for single todo
  // todo: {},
};

const todoReducers = createSlice({
  name: 'todoReducers',
  initialState,

  // normal actions create here
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      // console.log('action', action);
      state.todos = [...state.todos, action.payload];
    },
  },

  extraReducers: {
    // pending promise
    [getTodos.pending]: (state, action) => {
      state.loader = true;
    },
    // fulfilled promise
    [getTodos.fulfilled]: (state, action) => {
      state.loader = false;
      // response.data accessed
      state.todos = action.payload;
      // if no user found
      state.todosContainer = action.payload;
    },
    // rejected promise error
    [getTodos.rejected]: (state, action) => {
      state.loader = false;
      state.errors = action.payload;
    },
    // ------------------------------ //

    // pending promise
    [getTodo.pending]: (state, action) => {
      state.loader = true;
    },
    // fulfilled promise
    [getTodo.fulfilled]: (state, action) => {
      state.loader = false;
      // response.data accessed
      state.user = action.payload;
    },
    // rejected promise error
    [getTodo.rejected]: (state, action) => {
      state.loader = false;
      state.errors = action.payload;
    },
  },
});

export const { addTodo } = todoReducers.actions;

export default todoReducers.reducer;
