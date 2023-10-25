import React from 'react';
import styled from 'styled-components';
import { colors, breakpoints } from '../../../styles/theme';
import CountUp from 'react-countup';

const Wrapper = styled.div`
  padding: 1.25rem 1rem;
  @media (min-width: ${breakpoints.small}) {
    padding: 1.5rem;
  }
`;

const Dt = styled.dt`
  color: ${colors.gray900};
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.5rem;
`;

const Dd = styled.dd`
  margin-top: 0.25rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  @media (min-width: ${breakpoints.medium}) {
    display: block;
  }
  @media (min-width: ${breakpoints.large}) {
    display: flex;
  }
`;

const Number = styled.div`
  display: flex;
  align-items: baseline;
  color: ${colors.indigo800};
  font-weight: 600;
  font-size: 1.7rem;
  line-height: 2rem;
  margin-left: 3rem;
`;



const Description = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

const Pill = styled.div`
  display: flex;
  align-items: center;
  color: ${({ pillTextColor }) => pillTextColor};
  background-color: ${({ pillColor }) => pillColor};
  border-radius: 5px;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.25rem;
  padding: 1rem;
  @media (min-width: ${breakpoints.medium}) {
    margin-top: 0.5rem;
  }
  @media (min-width: ${breakpoints.large}) {
    margin-top: 0;
  }
`;

const StatColumn = ({ title, number, svg, diffDescription, diff, pillTextColor, pillColor }) => (
  <Wrapper>
    <dl>
      <Dt>{title}</Dt>
      <Dd>
        <Number>
          <CountUp separator="," end={number} />
        </Number>
        <Pill pillTextColor={pillTextColor} pillColor={pillColor}>
          {svg}
          <Description>{diffDescription}</Description>
          {diff}
        </Pill>
      </Dd>
    </dl>
  </Wrapper>
);

export default StatColumn;
