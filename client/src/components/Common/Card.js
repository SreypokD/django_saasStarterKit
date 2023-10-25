import React from 'react';
import styled from 'styled-components';
import { breakpoints, colors } from '../../styles/theme';

const StyledCard = styled.div`
  margin-top: 0.5rem;
  margin-left: 2rem;
  background-color: ${colors.white};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  overflow: hidden;
  @media (min-width: ${breakpoints.small}) {
    border-radius: 0.375rem;
  }
  @media (min-width: ${breakpoints.large}) {
    width: 95%;
  }
`;

const Card = ({ children, className }) => <StyledCard className={className}>{children}</StyledCard>;

export default Card;
