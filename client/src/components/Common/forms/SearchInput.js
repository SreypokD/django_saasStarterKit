import styled from 'styled-components';

const SearchInput = styled.input`
  background-color: #ffffff;
  border-color: #d2d6dc;
  border-width: 1px;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem 0.5rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0.25rem 0 0 51rem;
  display: block;
  width: 30%;
  
  line-height: 1.25rem;
  transition: box-shadow 0.2s ease-in-out;

  &:focus {
    box-shadow: 0 0 0 4px lightblue;
    outline-width: 1px;
    outline-color: lightblue;
  }
`;

export default SearchInput;