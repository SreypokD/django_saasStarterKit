import React from 'react';
import styled from 'styled-components';
import { breakpoints, colors } from '../../styles/theme';

const StyledDialog = styled.div`
margin: 1.25rem;
margin-left: 3rem;
padding: 1.5rem;
background-color: ${colors.gray200};
box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
overflow: hidden;
@media (min-width: ${breakpoints.small}) {
  border-radius: 0.375rem;
  padding: 1.5rem;
}
@media (min-width: ${breakpoints.large}) {
  width: 90%;
}
`;

const Card = ({ children, className }) => <StyledDialog className={className}>{children}</StyledDialog>;

export default Card;