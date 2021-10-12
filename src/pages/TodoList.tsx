import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useAppSelector, useAppDispatch } from '../store/reducers/hooks';
import { useSelector, useDispatch } from 'react-redux';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// import { getTodos } from '../store/actions/todoAction';
import {
  getTodos,
  deleteTodos,
  addTodos,
  Todo,
  updateTodos,
} from '../store/reducers/todoSlice';

const TodoList: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [todo, setTodo] = useState<Todo>();
  const toggle = () => setModal(!modal);
  const dispatch = useAppDispatch();
  const todosList = useAppSelector((state) => state.todos.todositem);
  // console.log('todosList', todosList);

  const deleteTodoItem = (id: number) => {
    if (window.confirm('Do you want to delete?')) {
      deleteTodos({ id });
    }
  };

  const initialValues: Todo = {
    userId: todo ? todo.userId : Math.floor(100000 + Math.random() * 900000),
    id: todo ? todo.id : Math.floor(100000 + Math.random() * 900000),
    title: todo ? todo.title : '',
    completed: todo ? todo.completed : false,
  };
  const editTodo = (todoData: Todo) => {
    setTodo(todoData);
    setModal(true);
  };

  useEffect(() => {
    // api data called
    dispatch(getTodos());
  }, []);
  return (
    <div>
      <button onClick={toggle}>Add Todo</button>&nbsp;
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#Sl.no</th>
            <th>UserId</th>
            <th>Id</th>
            <th>Title</th>
            <th>Completed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todosList &&
            todosList
              .slice(0)
              .reverse()
              .map((todoData: Todo, index) => (
                <tr key={todoData.id}>
                  <td>{index + 1}</td>
                  <td>{todoData.id}</td>
                  <td>{todoData.userId}</td>
                  <td>{todoData.title}</td>
                  <td>
                    {todoData.completed == true ? (
                      <strong style={{ color: 'green' }}>Yes</strong>
                    ) : (
                      <strong style={{ color: 'red' }}>No</strong>
                    )}
                  </td>
                  <td>
                    <button type="button" onClick={() => editTodo(todoData)}>
                      Edit
                    </button>
                    &nbsp;
                    <button
                      type="button"
                      onClick={() => deleteTodoItem(todoData.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      {/* Add/Edit Modal Start */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <form>
          <ModalBody>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, actions) => {
                console.log(values);
                const data = values;
                if (todo?.id) {
                  dispatch(updateTodos({ data }));
                  actions.setSubmitting(false);
                  setModal(false);
                } else {
                  dispatch(addTodos({ data }));
                  actions.setSubmitting(false);
                  setModal(false);
                }
              }}
            >
              {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
                <Form onSubmit={handleSubmit}>
                  <label htmlFor="title">Title:</label>{' '}
                  <Field
                    id="title"
                    name="title"
                    placeholder="Title"
                    value={values.title}
                    onChange={handleChange}
                  />{' '}
                  <label htmlFor="title">Completed:</label>{' '}
                  <Field
                    type="checkbox"
                    id="completed"
                    name="completed"
                    onChange={handleChange}
                  />
                  <br />
                  <br />{' '}
                  <button type="submit" className="btn btn-primary mt-2">
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </form>
      </Modal>
      {/* Add/Edit Modal End */}
    </div>
  );
};

export default TodoList;
