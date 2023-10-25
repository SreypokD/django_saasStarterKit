import React, { useState, useEffect, useContext } from 'react';
import styled , { css } from 'styled-components';
import { colors ,breakpoints } from '../../../styles/theme';
import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import getOrgId from '../../../utils/orgId';
import axios from '../../../services/axios';
import StatColumn from './statColumn';


import { FcPositiveDynamic  ,FcTodoList} from "react-icons/fc";
import { IoListOutline } from "react-icons/io5";

const Card = styled.div`
  background-color: ${colors.white};
  overflow: hidden;
  border-radius: 0.5rem;
  margin-top: 1.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  @media (min-width: ${breakpoints.medium}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

`;

const BorderDiv = styled.div`
  @media (min-width: ${breakpoints.medium}) {
    border-left: 1px solid ${colors.gray200};
  }
  @media (max-width: ${breakpoints.medium}) {
    border-top: 1px solid ${colors.gray200};
  }
`;

const iconStyle = css`
  margin-left: -0.25rem;
  margin-right: 0.125rem;
  flex-shrink: 0;
  align-self: center;
  width: 2.5rem;
  height:2.5rem
`;

const UnCompleteStyle = styled(IoListOutline )`
  ${iconStyle}
`;

const CompleteStyle = styled(FcTodoList)`
  ${iconStyle}
`;

const InprogressStyle = styled(FcPositiveDynamic)`
  ${iconStyle}
`;


const TotalItem = () => {
    const org_id = getOrgId();
    const { authState } = useContext(AuthContext);
    const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
    const { isLoading } = apiState;
    let token = authState?.user.jwt_token;
    const headers = { Authorization: `Bearer ${token}` };
  
    const [todos, setTodos] = useState([]);
    const [totalUncomplete, setTotalUncomplete] = useState(0);
    const [totalInprogress, setTotalInprogress] = useState(0);
    const [totalComplete, setTotalComplete] = useState(0);
  
    useEffect(() => {
      if (org_id !== '[org_id]') {
        fetchTodos();
      }
    }, [org_id]);
  
    useEffect(() => {
      getTotalStatus();
    }, [todos]);
  
    const fetchTodos = async () => {
      fetchInit();
      let params = { org_id };
      let result = await axios.get(`/api/get/todos`, { params, headers }).catch((err) => {
        fetchFailure(err);
      });
  
      setTodos(result.data);
      fetchSuccess();
    };
  
    //get each status function 
    const getTotalStatus = () => {
      const uncompleteCount = todos.filter((todo) => todo.status === 'uncomplete').length;
      const inprogressCount = todos.filter((todo) => todo.status === 'inprogres').length;
      const completeCount = todos.filter((todo) => todo.status === 'complete').length;
  
      setTotalUncomplete(uncompleteCount);
      setTotalInprogress(inprogressCount);
      setTotalComplete(completeCount);
    };
  
    return (
      <React.Fragment>
        <Card>
          <div>
            <StatColumn
              title="Total Uncomplete"
              number={totalUncomplete}
              svg={<UnCompleteStyle />}
              diffDescription="Increased by"
            //   diff="uncomplete"
              pillColor={colors.red100}
              pillTextColor={colors.red500}
              
            />
          </div>
          
          <BorderDiv>
            <StatColumn
              title="Total Inprogress"
              number={totalInprogress}
              svg={<InprogressStyle />}
              diffDescription="Increased by"
            //   diff=""
              pillColor={colors.gray100}
              pillTextColor={colors.green800}
            />
          </BorderDiv>
          <BorderDiv>
            <StatColumn
              title="Total Complete"
              number={totalComplete}
              svg={<CompleteStyle />}
              diffDescription="Decreased by"
            //   diff=""
             
              pillColor={colors.green100}
              pillTextColor={colors.red800}
            />
          </BorderDiv>
        </Card>
      </React.Fragment>
    );
  };
  
  export default TotalItem;
