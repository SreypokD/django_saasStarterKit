import React from 'react';
import styled from 'styled-components';
import Stats from './stats';
import ActivityList from './todoList';
import { colors, breakpoints } from '../../../styles/theme';
import LineBarAreaComposedChart from './Charts/LineBarAreaComposedChart';
import StackedChart from './Charts/StackedChart';
import AreaChartFillByValue from './Charts/AreaChartFillByValue';
import SimpleBarChart from './Charts/SimpleBarChart';
import TotalItem from './total';
import TodoList from './todoList';

const Title = styled.h1`
  font-weight: 600;
  color: ${colors.gray900};
  font-size: 1.5rem;
`;

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: ${breakpoints.large}) {
    grid-template-columns: 1fr;
    align-items: center;
  }
  grid-auto-flow: row;
  grid-row-gap: 2rem;
  grid-column-gap: 2rem;
  margin-top: 2rem;
`;

const Dashboard = () => {
  return (
    <div>
      <Title>Dashboard</Title>
      <TotalItem/>
      {/* <Stats /> */}
      {/* <ChartsContainer>
        <LineBarAreaComposedChart />
        <StackedChart />
        <AreaChartFillByValue />
        <SimpleBarChart />
      </ChartsContainer>  */}
     <TodoList />
    </div>
  );
};
export default Dashboard;
