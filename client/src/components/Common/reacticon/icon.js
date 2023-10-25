import styled from 'styled-components';
//icon
import {MdDelete} from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import {ImCheckmark2} from "react-icons/im";
import {BiCircle} from "react-icons/bi";
import {BiCheckCircle} from "react-icons/bi";
import {FcSearch} from "react-icons/fc"
export const StyledIconDelete = styled(MdDelete)`
  width: 2rem;
  height: 2rem;
  color: red;
  padding-left: 0.5rem;
`;

export const StyledIconEdit = styled(FaEdit)`
  width: 2rem;
  height: 2rem;
  color: blue;
  padding-left: 0.5rem;
`;

export const StyledIconUndone = styled(ImCheckmark2)`
  width: 2rem;
  height: 2rem;
  color: orange;
  padding-left: 0.5rem;
`;

export const StyledBiCircle = styled(BiCircle)`
  width: 2rem;
  height: 2rem;
  color: orange;
  padding-left: 0.5rem;
`;

export const StyledBiCheckCircle = styled(BiCheckCircle)`
  width: 2rem;
  height: 2rem;
  color: green;
  padding-left: 0.5rem;
`;

export const StyledFcSearch = styled(FcSearch)`
  position: absolute;
  right: 2.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.5rem;
  height: 1.5rem;
`;




