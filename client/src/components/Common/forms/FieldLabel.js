import styled from 'styled-components';
import { colors } from '../../../styles/theme';

const Label = styled.label`
  input {
    margin: 0.5rem 0rem 0rem -6.3rem;
    width: 20rem;
  }
  display: block;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${colors.gray700};
  margin-left: 6rem
`;

export default Label;
