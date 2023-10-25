import styled from 'styled-components';
import { colors } from '../../../styles/theme';

const CancelButton = styled.button`
  color: white;
  background-color: ${colors.gray500};
  padding: 0.5rem 1rem 0.5rem 1rem;
  font-weight: 600;
  letter-spacing: 0.025rem;
  margin: 1rem 1rem 1rem 0;
  transition-duration: 0.4s;
  overflow: hidden;
  width: 6rem;
  border: none;
  border-radius: 0.2rem;
  cursor: pointer;

  &:hover {
    opacity: 90%;
    background-color: ${colors.gray900};
    color: white
  }
`;

export default CancelButton;
