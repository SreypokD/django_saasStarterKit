import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import AuthContext from '../../../utils/authContext';
import { colors, breakpoints } from '../../../styles/theme';
import ApiContext from '../../../utils/apiContext';

import SEO from '../../../components/Marketing/Layout/seo';
import LoadingOverlay from '../../../components/Common/loadingOverlay';
import ResetFormHeader from './resetFormHeader';
import ResetSuccess from './resetSuccessMessage';
import AuthCard from '../../../components/Auth/authCard';
import Button from '../../../components/Auth/Buttons/authButton';
import Input from '../../../components/Common/forms/TextInput';
import Label from '../../../components/Auth/authFormLabel';
import InputWrapper from '../../../components/Common/forms/TextInputWrapper';

const Wrapper = styled.div`
  background-color: ${colors.gray50};
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: ${breakpoints.small}) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (min-width: ${breakpoints.large}) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const PasswordReset = () => {
  const { firebase } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetchInit();

    let email = event.target.email.value;

    await firebase
      .auth()
      .sendPasswordResetEmail(email)
      .catch((err) => {
        fetchFailure(err);
      });

    setSuccess(true);
    fetchSuccess();
  };

  const seoData = {
    title: 'Saas Starter Kit Pro Reset Password Page',
    description: 'Saas Starter Kit Pro Reset Password Page'
  };

  return (
    <React.Fragment>
      <SEO seoData={seoData} />
      <Wrapper>
        {isLoading && <LoadingOverlay />}
        {!success ? (
          <div>
            <ResetFormHeader />
            <AuthCard>
              <form onSubmit={handleSubmit}>
                <Label htmlFor="email">Email:</Label>
                <InputWrapper>
                  <Input type="email" name="email" id="email" />
                </InputWrapper>
                <Button type="submit">Submit</Button>
              </form>
            </AuthCard>
          </div>
        ) : (
          <ResetSuccess />
        )}
      </Wrapper>
    </React.Fragment>
  );
};

export default PasswordReset;
