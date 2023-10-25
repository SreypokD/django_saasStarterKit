import styled from 'styled-components';

const TextArea = styled.textarea`
  background-color: #ffffff;
  border-color: #d2d6dc;
  border-width: 1px;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem 0.5rem 0.75rem;
  font-size: 1rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  display: block;
  width: 50rem;
  transition: box-shadow 0.2s ease-in-out;
  overflow: hidden;

  &:focus {
    box-shadow: 0 0 0 4px lightblue;
    outline-width: 1px;
    outline-color: lightblue;
  }
`;

export default TextArea;
