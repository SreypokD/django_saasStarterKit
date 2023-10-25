import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { colors, breakpoints } from '../../../styles/theme';
import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import getOrgId from '../../../utils/orgId';
import axios from '../../../services/axios';
import { DateString } from '../../../components/Common/DateString';
import { ButtonCompleteStyle, ButtonInprogresStyle, ButtonNullStyle, ButtonUncompleteStyle } from '../../../components/Common/StatusBtn';


const Wrapper = styled.div`
  display: none;
  @media (min-width: ${breakpoints.small}) {
    display: block;
  }
  margin-top: 0.5rem;
  vertical-align: middle;
  min-width: 100%;
  overflow-x: auto;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  overflow: hidden;
`;

const Table = styled.table`
  min-width: 100%;
`;

const ThBase = styled.th`
  padding: 0.75rem 1.5rem;
  background-color: ${colors.coolGray50};
  font-weight: medium;
  font-size: 0.75rem;
  line-height: 1rem;
  text-transform: uppercase;
  color: ${colors.coolGray500};
  letter-spacing: 0.05em;
`;

const StyledTh1 = styled(ThBase)`
  text-align: left;
`;

const StyledTh2 = styled(ThBase)`
  text-align: left;
`;

const StyledTh3 = styled(ThBase)`

  text-align: left;
  display: none;
  @media (min-width: ${breakpoints.medium}) {
    display: block;
  }
`;

const TableBody = styled.tbody`
  background-color: ${colors.white};
`;

const TdBase = styled.td`
  padding: 1rem 1.5rem;
  white-space: nowrap;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const StyledTd1 = styled(TdBase)`
  color: ${colors.gray900};
  max-width: 0rem;
 width: 50%;
`;


const StyledTd2 = styled(TdBase)`
  color: ${colors.coolGray500};
  text-align: left;
 
`;

const StyledTd3 = styled(TdBase)`

  display: none;
  @media (min-width: ${breakpoints.medium}) {
    display: block;
  }
`;

const PaymentButton = styled.a`
  display: inline-flex;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const Title = styled.p`
  color: ${colors.coolGray500};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 12px;
  ${PaymentButton}:hover {
    color: ${colors.gray900};
  }
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
`;

const Status = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem;
  background-color: ${colors.green100};
  color: ${colors.green800};
  text-transform: capitalize;
`;


const Nav = styled.nav`
  background-color: ${colors.white};
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${colors.coolGray200};
`;

const NavText = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${colors.coolGray700};
`;

const TrStyle = styled.tr`
  border-bottom: 1px solid ${colors.gray300};
`;


const Span = styled.span`
  font-weight: 500;
  padding: 0 3px;
`;

const DesktopActivityList = () => {
  const org_id = getOrgId();
  const { authState } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  let token = authState?.user.jwt_token;
  const headers = { Authorization: `Bearer ${token}` };

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (org_id !== '[org_id]') {
      fetchTodos();
    }
  }, [org_id]);


  const fetchTodos = async () => {
    fetchInit();
    let params = { org_id };
    try {
      let result = await axios.get(`/api/get/todos`, { params, headers });
      setTodos(result.data);
      fetchSuccess();
    } catch (err) {
      fetchFailure(err);
    }
  };
    // Render the appropriate status button with the updated event handler
    const renderStatusButton = (status) => {
      if (status === 'inprogres') {
        return <ButtonInprogresStyle>Inprogress</ButtonInprogresStyle>
      } else if (status === 'uncomplete') {
        return <ButtonUncompleteStyle>Uncomplete</ButtonUncompleteStyle>;
      } else if (status === 'complete') {
        return <ButtonCompleteStyle>Complete</ButtonCompleteStyle>;
      } else {
        return <ButtonNullStyle>No status</ButtonNullStyle>;
      }
    };
  return (
    <Wrapper>
    <Table>
      <thead>
        <tr>
          <StyledTh2>NO</StyledTh2>
          <StyledTh1>Title</StyledTh1>
          <StyledTh2>DateTime</StyledTh2>
          <StyledTh3> | 
          </StyledTh3>
          <StyledTh2>Status</StyledTh2>
        </tr>
      </thead>
      <TableBody>
          {todos.map((todo , index) => (
            <TrStyle TrStyle key={todo.id}>
              <StyledTd2>{index + 1}</StyledTd2>
              <StyledTd1>{todo.title}</StyledTd1>
              <StyledTd2>
                <DateString dateString={todo.date}/>
                </StyledTd2>
              <StyledTd3></StyledTd3>
              <StyledTd2>
                {renderStatusButton(todo.status)}
              </StyledTd2>
            </TrStyle>
          ))}
        </TableBody>
    </Table>
    <Nav>
      <NavText>
        Showing total of task: <Span>{todos.length}</Span>
      </NavText>
    </Nav>
  </Wrapper>
  );
};

export default DesktopActivityList;
