import styled from 'styled-components';
import { colors } from '../../../styles/theme';

const DangerButton = styled.button`
  position: relative;
  color: ${colors.white};
  background-color: #c62828;
  padding: 0.5rem 1rem 0.5rem 1rem;
  font-weight: 600;
  letter-spacing: 0.025rem;
  margin: 1rem 0 1rem 0;
  transition-duration: 0.4s;
  overflow: hidden;
  width: 6rem;
  border: none;
  border-radius: 0.2rem;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    opacity: 90%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
  &:after {
    content: '';
    background: #e57373;
    display: block;
    position: absolute;
    padding-top: 300%;
    padding-left: 350%;
    margin-left: -20px !important;
    margin-top: -120%;
    opacity: 0;
    transition: all 0.8s;
  }

  &:active:after {
    padding: 0;
    margin: 0;
    opacity: 1;
    transition: 0s;
  }

  &:focus {
    box-shadow: 0 0 0 3px #e57373;
    outline-width: 1px;
    outline-color: #e57373;
  }
`;

export default DangerButton;
