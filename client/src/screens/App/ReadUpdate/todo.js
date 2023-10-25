import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../../styles/theme';
import Button from '../../../components/Common/buttons/SecondaryButton';
import CancelButton from '../../../components/Common/buttons/CancelButton';
import Dialog from '../../../components/Common/Dialog';
import FieldLabel from '../../../components/Common/forms/FieldLabel';
import TextArea from '../../../components/Common/forms/TextArea';
import TextInput from '../../../components/Common/forms/TextInput';
import { StyledBiCheckCircle, StyledBiCircle, StyledIconDelete, StyledIconEdit, StyledIconUndone } from '../../../components/Common/reacticon/icon';
import DropDown from '../../../components/Common/forms/DropDownd';
import DateStyle from '../../../components/Common/forms/DateInput';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
import { DateString } from '../../../components/Common/DateString';
import { ContainStatus } from '../Create/index'
import { ContainDate } from '../Create/index'
import { message, Modal } from 'antd';
import { ButtonCompleteStyle, ButtonInprogresStyle, ButtonNullStyle, ButtonUncompleteStyle } from '../../../components/Common/StatusBtn';
const Wrapper = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  
`;


const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

`;

const FormButtonsWrapper = styled.div`
  display: flex;
  align-item: center;
  justify-content : space-evenly;

`;


const ContainList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  
`

const TableStyle = styled.table`
    border-bottom: 1px solid black;
    width: 100%; 
`

const TdStyle = styled.td`
  width: 20%;
  white-space: wrap;

  /* Add styles for the first child */
  &:first-child {
    display: flex;
    align-items: center;
    font-weight: bold;
    margin-right: 2rem;

    p {
      margin-top: 0.8rem;
      margin-left: 0.5rem;
    }
  }
  &:nth-child(2){
    margin-right : 5rem;

  }

`;

const TrStyle = styled.tr`
  display:flex;
  align-items: center;
  
  &:hover {
    opacity: 90%;
    background-color: ${colors.gray100};
  } 
  
  ${({ isCompleted }) =>
    (isCompleted) &&
    `
    color: red;
    text-decoration: line-through;
  `}
`

const ContainDateStatus = styled.div`
  display:flex;
  align-items: center;
  justify-content: space-between;
  width : 60rem;
  margin-top: 0.5rem;

  `
const TitleEdit = styled.h1`
  text-align: center;
  `

const ContainBtn = styled.div`
  display:flex;
  align-items: center;
  justify-content: end;
  width:51rem;
  
`;
const Todo = ({
  todo,
  isEditting,
  editTodoID,
  handleEditTitleChange,
  editTitle,
  handleEditDescChange,
  editDescription,
  editTodo,
  deleteTodo,
  putTodo,
  setEdit,
  handleStatusChange,
  editStatus,
  editDate,
  handleDateChange
}) => {
  
  //  if task complete 
  const [isCompleted, setIsCompleted] = useState(false);
  const handleCompleteButtonClick = async (todo) => {
    setIsCompleted(!isCompleted);
    try {
      const response = await axios.put(`/api/put/complete/todo`, { todo_id: todo.id }, {
        headers: {
          Authorization: 'Bearer YOUR_AUTH_TOKEN',
        },
      });
    } catch (success) {
      if (!isCompleted) {
        message.success('Todo marked as completed');
      } else {
        message.error("You're not complete");
      }
    }
  };

  // Render the appropriate status button with the updated event handler
  const renderStatusButton = () => {
    if (isCompleted) {
      return <ButtonCompleteStyle onClick={() => handleCompleteButtonClick(todo)}>Complete</ButtonCompleteStyle>;
    } else if (todo.status === 'inprogres') {
      return <ButtonInprogresStyle onClick={() => handleCompleteButtonClick(todo)}>In Progress</ButtonInprogresStyle>;
    } else if (todo.status === 'uncomplete') {
      return <ButtonUncompleteStyle onClick={() => handleCompleteButtonClick(todo)}>Uncomplete</ButtonUncompleteStyle>;
    } else if (todo.status === 'complete') {
      return <ButtonCompleteStyle onClick={() => handleCompleteButtonClick(todo)}>Complete</ButtonCompleteStyle>;
    }
    return <ButtonNullStyle onClick={() => handleCompleteButtonClick(todo)}>No status</ButtonNullStyle>;
  };

  return (
  
    
    <Wrapper>
      <ContainList>
        <TableStyle>
          <tbody>
            <TrStyle isCompleted={isCompleted || todo.status === 'complete'}>
              <TdStyle>
                {isCompleted || todo.status === 'complete' ? (
                  <StyledBiCheckCircle onClick={handleCompleteButtonClick} />
                ) : (
                  <StyledBiCircle onClick={handleCompleteButtonClick} />
                )}
                <p>{todo.title}</p>
              </TdStyle>
              <TdStyle>{todo.description}</TdStyle>
              <TdStyle>
                <DateString dateString={todo.date} />
              </TdStyle>
              <TdStyle>{renderStatusButton()}</TdStyle>
              <TdStyle>

                <StyledIconEdit
                  onClick={() => editTodo(todo)}
                  textcolor={colors.white}
                  backgroundcolor={colors.indigo600}
                  hovercackgroundcolor={colors.indigo500}
                  activebackgroundcolor={colors.indigo700}
                >
                  Edit
                </StyledIconEdit>
                <StyledIconDelete
                  onClick={() => deleteTodo(todo)}
                  backgroundcolor={colors.red500}
                  textcolor={colors.white}
                  hovercackgroundcolor={colors.indigo500}
                  activebackgroundcolor={colors.indigo700}
                >
                  Delete
                </StyledIconDelete>
              </TdStyle>
            </TrStyle>
          </tbody>
        </TableStyle>
      </ContainList>
      {/* if edit todo */}

      {isEditting && todo.id === editTodoID && (
        <form onSubmit={(event) => putTodo(event, todo)}>
          <Dialog>
            <TitleEdit>Edit Todo</TitleEdit>
            <TitleWrapper>
              <FieldLabel>
                Title:
                <TextInput onChange={handleEditTitleChange} value={editTitle} name="title" />
              </FieldLabel>
            </TitleWrapper>
            <DescriptionWrapper>
              <FieldLabel>
                Description:
                <TextArea
                  onChange={handleEditDescChange}
                  value={editDescription}
                  name="description"
                />
              </FieldLabel>
            </DescriptionWrapper>
            <ContainDateStatus>
              <ContainStatus>
                <FieldLabel htmlFor="status">
                  Select status:
                  <DropDown id="status" name="status" value={editStatus} onChange={handleStatusChange}>
                    <option selected value="none">Task status</option>
                    <option value="uncomplete">Uncomplete</option>
                    <option value="inprogres">InProgress</option>
                    <option value="complete">Complete</option>
                  </DropDown>
                </FieldLabel>
              </ContainStatus>
              <ContainDate>
                Date of task:
                <DateStyle type='date' id='date' name='date' value={editDate} onChange={handleDateChange} />
              </ContainDate>
            </ContainDateStatus>
            <FormButtonsWrapper>
              <ContainBtn>
                <CancelButton
                  onClick={() => setEdit(false)}
                  backgroundColor={colors.red500}
                  textColor={colors.white}
                  hoverBackgroundColor={colors.indigo500}
                  activeBackgroundColor={colors.indigo600}
                >
                  Cancel
                </CancelButton>
                <Button
                  type="submit"
                  backgroundColor={colors.indigo600}
                  textColor={colors.white}
                  hoverBackgroundColor={colors.indigo500}
                  activeBackgroundColor={colors.indigo600}
                >
                  Save change
                </Button>
              </ContainBtn>

            </FormButtonsWrapper>
          </Dialog>
        </form>
      )}
    </Wrapper>
  );
};

export default Todo;
