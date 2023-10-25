import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Spin, message } from 'antd';

import AuthContext from '../../../utils/authContext';
import getOrgId from '../../../utils/orgId';
import ApiContext from '../../../utils/apiContext';
import { colors } from '../../../styles/theme';
import axios from '../../../services/axios';
import { sendEventToAnalytics } from '../../../services/analytics';

import Button from '../../../components/Common/buttons/SecondaryButton';
import Dialog from '../../../components/Common/Dialog';
import FieldLabel from '../../../components/Common/forms/FieldLabel';
import TextArea from '../../../components/Common/forms/TextArea';
import TextInput from '../../../components/Common/forms/TextInput';
import DropDown from '../../../components/Common/forms/DropDownd';
import DateStyle from '../../../components/Common/forms/DateInput';
import { isBefore, parse, parseISO } from 'date-fns'; // Importing isBefore and parseISO functions for date comparison


const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
`;

const InputWrapper = styled.div`
  padding: 1.5rem;
`;

const TextAreaWrapper = styled.div`
  padding: 0 1.5rem;
`;

const ButtonWrapper = styled.div`
  text-align: left;
  padding: 1rem;
   display:flex;
    align-items: center;
    justify-content: end;
    width : 58.5rem;
`;
const ContainDateStatus = styled.div`
  display:flex;
  align-items: center;
  justify-content: space-between;
  width : 60rem;
  margin-left: 1.5rem;
  margin-top: 1rem;
  
`;


export const ContainStatus = styled.div`
  width : 25rem;
`;
export const ContainDate = styled.div`
  width : 25rem;
  margin-right: -1rem;
`;

const CreateTask = () => {
  const org_id = getOrgId();

  const [formTitle, setTitle] = useState('');
  const [formDescription, setDescription] = useState('');
  const [selectStatus, setSelectStatus] = useState('');
  const [selectedDate, setSelectedDate] = useState(''); ///from this
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const { authState } = useContext(AuthContext);
  let token = authState?.user.jwt_token;
  const headers = { Authorization: `Bearer ${token}` };

  const postTodo = async (event) => {
    event.preventDefault();
    fetchInit();

    let author = authState?.user.username;
    let title = event.target.title?.value ?? ''; // Check if event.target.title exists before accessing value
    let description = event.target.description?.value ?? ''; // Check if event.target.description exists before accessing value
    let status = event.target.status?.value ?? ''; // Check if event.target.status exists before accessing value
    let date = event.target.date?.value ?? '';
    let data = { title, description, author, status, date, org_id };

    if (!title || !description || !status || !date) {
      message.error('Please fill in all fields');
      fetchSuccess(); // Stop loading state
      return;
    }
    await axios.post(`/api/post/todo`, data, { headers }).catch((err) => {
      fetchFailure(err);
    });
    sendEventToAnalytics('create_todo', { description: 'user created todo' });

    setTitle('');
    setDescription('');
    setSelectStatus('');
    setSelectedDate('');
    message.success('Todo Created');
    fetchSuccess();
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescChange = (event) => {
    setDescription(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectStatus(event.target.value);
  }

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    const currentDate = new Date(); // Get the current date

    if (isBefore(parseISO(selectedDate), currentDate)) {
      // If selectedDate is before currentDate
      message.error('Please select a date in the future');
      setSelectedDate(''); // Clear the selectedDate
    } else {
      setSelectedDate(selectedDate);
    }
  }

  return (
    <div>
      <Title>Create todo list here</Title>
      <form onSubmit={postTodo}>
        <Dialog>
          <Spin tip="Loading..." spinning={isLoading}>
            <InputWrapper>
              <FieldLabel htmlFor="title">
                Todo list title:
                <TextInput onChange={handleTitleChange} value={formTitle} name="title" />
              </FieldLabel>
            </InputWrapper>
            <TextAreaWrapper>
              <FieldLabel htmlFor="description">
                Description:
                <TextArea onChange={handleDescChange} value={formDescription} name="description" />
              </FieldLabel>
            </TextAreaWrapper>
            <ContainDateStatus>
              <ContainStatus>
                <FieldLabel htmlFor="status">
                  Select status:
                  <DropDown value={selectStatus} id="status" name="status" onChange={handleStatusChange}>
                    <option value="none">Task status</option>
                    <option value="uncomplete">Uncomplete</option>
                    <option value="inprogres">In Progress</option>
                    <option value="complete">Complete</option>
                  </DropDown>
                </FieldLabel>
              </ContainStatus>
              <ContainDate>
                Date of task:
                <DateStyle type='date' id='date' name='date' value={selectedDate} onChange={handleDateChange} />
              </ContainDate>
            </ContainDateStatus>
            <ButtonWrapper>
              <Button
                textcolor={colors.white}
                backgroundcolor={colors.indigo600}
                hovercackgroundcolor={colors.indigo500}
                activebackgroundcolor={colors.indigo700}
              >
                Save list
              </Button>
            </ButtonWrapper>
          </Spin>
        </Dialog>
      </form>
    </div>
  );
};

export default CreateTask;
