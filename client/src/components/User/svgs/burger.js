import React from 'react';
import styled from 'styled-components';

const Svg = styled.svg`
  height: 2.5rem;
  width: 2.5rem;
`;

const Burger = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </Svg>
);

export default Burger;
