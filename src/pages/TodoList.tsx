import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useAppSelector, useAppDispatch } from '../store/reducers/hooks';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
  getTodos,
  getTodo,
  deleteTodos,
  addTodos,
  Todo,
  TodoId,
  updateTodos,
} from '../store/actions/todoAction';
import API from '../api';

const TodoList: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [openViewModal, setViewOpenModal] = useState(false);
  const [viewTodoData, setViewTodoData] = useState<Todo>();
  const [todo, setTodo] = useState<Todo>();
  const toggle = () => setModal(!modal);
  const viewToggle = () => setViewOpenModal(!openViewModal);
  const dispatch = useAppDispatch();
  const todosList = useAppSelector((state) => state.todos.todositem);
  const singleTodo = useAppSelector((state) => state.todos.todoItem);
  console.log('singleTodo', singleTodo);

  const cancelClick = () => {
    setModal(false);
  };

  const viewCancelClick = () => {
    setViewOpenModal(false);
  };

  const viewTodo = async (todoData: Todo) => {
    setModal(false);
    setViewOpenModal(true);
    // dispatch(getTodo(todoData));
    setTodo(todoData);
    // try {
    //   const todoSingle = await API.get(`/todos/${id}`);
    //   setViewOpenModal(true);
    //   setViewTodoData(todoSingle.data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const deleteTodoItem = (id: number) => {
    if (window.confirm('Do you want to delete?')) {
      dispatch(deleteTodos({ id }));
      dispatch(getTodos());
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
  const handleReset = (resetForm: any) => {
    resetForm();
  };
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
                    {/* <button type="button" onClick={() => viewTodo(todoData.id)}>
                      View
                    </button> */}
                    <button type="button" onClick={() => viewTodo(todoData)}>
                      View
                    </button>
                    &nbsp;
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

        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            console.log(values);
            const data = values;
            if (todo?.id) {
              dispatch(updateTodos({ data }));
              handleReset.bind(null, (values.title = ''));
              actions.setSubmitting(false);
              setModal(false);
            } else {
              dispatch(addTodos({ data }));
              handleReset.bind(null, (values.title = ''));
              actions.setSubmitting(false);
              setModal(false);
            }
          }}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
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
              </ModalBody>
              <ModalFooter>
                <Button color="primary" type="submit">
                  {todo?.id ? 'Edit' : 'Add'}
                </Button>{' '}
                <Button color="secondary" onClick={cancelClick}>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </Modal>
      {/* Add/Edit Modal End */}
      {/* View Modal Start */}
      <Modal isOpen={openViewModal} toggle={viewToggle}>
        <ModalHeader toggle={viewToggle}>View Todo</ModalHeader>

        {/* <ModalBody>
          <h4>Title: {viewTodoData?.title}</h4>

          <strong>
            Completed:{' '}
            {viewTodoData?.completed == true ? (
              <span style={{ color: 'green' }}>Yes</span>
            ) : (
              <span style={{ color: 'red' }}>No</span>
            )}
          </strong>
        </ModalBody> */}
        {/* <ModalBody>
          <h4>Title: {singleTodo?.title}</h4>

          <strong>
            Completed:{' '}
            {singleTodo?.completed == true ? (
              <span style={{ color: 'green' }}>Yes</span>
            ) : (
              <span style={{ color: 'red' }}>No</span>
            )}
          </strong>
        </ModalBody> */}
        <ModalBody>
          <h4>Title: {todo?.title}</h4>

          <strong>
            Completed:{' '}
            {todo?.completed == true ? (
              <span style={{ color: 'green' }}>Yes</span>
            ) : (
              <span style={{ color: 'red' }}>No</span>
            )}
          </strong>
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={viewCancelClick}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      {/* View Modal End */}
    </div>
  );
};

export default TodoList;
