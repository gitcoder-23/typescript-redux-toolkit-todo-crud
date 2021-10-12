import { configureStore } from '@reduxjs/toolkit';
import todosReducers from './reducers/todoReducers';

export default configureStore({
  reducer: {
    users: todosReducers, //name is same of usersReducers
  },
});
