import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { colors } from '../../../styles/theme';
import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import getOrgId from '../../../utils/orgId';
import Todo from './todo';
import { Empty, Spin } from 'antd';
import axios from '../../../services/axios';
import Card from '../../../components/Common/Card';
import { message, Modal } from 'antd';
import SearchInput from '../../../components/Common/forms/SearchInput';
import { StyledFcSearch } from '../../../components/Common/reacticon/icon';

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  width:100%;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
`;

const TitleTr = styled.p`
  display:flex;
  justity-content: space-between;
  background-color: ${colors.coolGray300};
  padding:5px;
`

const ThStyle = styled.strong`
  margin-right: 16%;
  font-size:17px;
  &:first-child {
    margin-left: 0.5rem;
  }
  &:nth-child(2){
    margin-left: 1rem;
  }
  &:nth-child(3){
    margin-left: 0.5rem;
  }
  &:nth-child(5){
    margin-left: -1.6rem;
  }
`

const SearchStyle = styled.div`
  position: relative;
  display:flex;
  align-items: center;
  justity-content: end;
`

const ReadUpdate = () => {
  const org_id = getOrgId();
  const { authState } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  let token = authState?.user.jwt_token;
  const headers = { Authorization: `Bearer ${token}` };

  const [todos, setTodos] = useState([]);

  //Edit Todo state and form state
  const [isEditting, setEdit] = useState(false);
  const [editTodoID, setTodoID] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editStatus, setEditStatus] = useState('');
  //delete diglog visible
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [deleteTargetTodo, setDeleteTargetTodo] = useState(null);

  // search bar
  const [searchQuery, setSearchQuery] = useState('');



  /* eslint-disable */
  useEffect(() => {
    if (org_id !== '[org_id]') {
      fetchTodos();
    }
  }, [org_id]);

  const fetchTodos = async () => {
    fetchInit();
    let params = { org_id };
    let result = await axios.get(`/api/get/todos`, { params, headers }).catch((err) => {
      fetchFailure(err);
    });

    setTodos(result.data);
    fetchSuccess();
  };

  const deleteTodo = async (todo) => {
    setDeleteTargetTodo(todo);
    setDeleteConfirmationVisible(true);
  };

  const confirmDelete = async () => {
    fetchInit();
    const todo_id = deleteTargetTodo.id;

    const params = { todo_id };
    await axios.delete(`/api/delete/todo`, { params, headers }).catch((err) => {
      fetchFailure(err);
    });

    setDeleteConfirmationVisible(false);
    setTimeout(() => fetchTodos(), 300);
    message.success('Todo Deleted');
    fetchSuccess();
  };

  const cancelDelete = () => {
    setDeleteConfirmationVisible(false);
  };

  const putTodo = async (event, todo) => {
    event.preventDefault();
    fetchInit();
    let title = event.target.title.value;
    let description = event.target.description.value;
    let author = authState?.user.username;
    let status = event.target.status.value;
    let date = event.target.date.value;
    let todo_id = todo.id;

    let data = { title, description, author, status, date, todo_id };

    if (!title || !description || !status || !date) {
      message.error('Please fill in all fields');
      fetchSuccess(); // Stop loading state
      return;
    } else {
      message.success('Todo Edited');
    }
    await axios.put(`/api/put/todo`, data, { headers }).catch((err) => {
      fetchFailure(err);
    });

    setEdit(false);
    //Save data to context to limit api calls
    setTimeout(() => fetchTodos(), 300);
    fetchSuccess();
  };

  const editTodo = (todo) => {
    setEdit(true);
    setTodoID(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setEditDate(todo.date);
    setEditStatus(todo.status);

  };

  const handleEditTitleChange = (event) => {
    setEditTitle(event.target.value);
  };

  const handleEditDescChange = (event) => {
    setEditDescription(event.target.value);
  };

  const handleStatusChange = (event) => {
    setEditStatus(event.target.value);
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    const currentDate = new Date().toISOString().slice(0, 10); // Get the current date in YYYY-MM-DD format
  
    if (selectedDate >= currentDate) {
      setEditDate(selectedDate);
    } else {
      // Display an error message or handle the validation error as per your requirements
      message.error('Please select a date in the future');
    }
  };
  //search title of task
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <StyledMain>
      <SearchStyle>
        <SearchInput type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='search title of task' />
        <StyledFcSearch />
      </SearchStyle>

      <Title>Todos List: </Title>
      <Card>
        <TitleTr>
          <ThStyle>Title</ThStyle>
          <ThStyle>Description</ThStyle>
          <ThStyle>Date</ThStyle>
          <ThStyle>Status</ThStyle>
          <ThStyle>Action</ThStyle>
        </TitleTr>
        <Spin tip="Loading..." spinning={isLoading}>
          {filteredTodos.length !== 0 ? (
            filteredTodos.map((todo) => (
              <Todo
                todo={todo} key={todo.id} // Add the key prop with a unique identifier
                isEditting={isEditting}
                editTodoID={editTodoID}
                handleEditTitleChange={handleEditTitleChange}
                editTitle={editTitle}
                handleEditDescChange={handleEditDescChange}
                editDescription={editDescription}
                editTodo={editTodo}
                handleStatusChange={handleStatusChange}
                editStatus={editStatus}
                handleDateChange={handleDateChange}
                editDate={editDate}
                deleteTodo={deleteTodo}
                putTodo={putTodo}
                setEdit={setEdit}
              />
            ))
          ) : (
            <Empty />
          )}
        </Spin>
      </Card>
      <Modal
        title="Confirm Delete"
        visible={deleteConfirmationVisible}
        onOk={confirmDelete}
        onCancel={cancelDelete}
        okText="Delete"
        cancelText="No"
      >
        <strong>Are you sure you want to delete this todo?</strong>
      </Modal>
    </StyledMain>
  );
};

export default ReadUpdate;
