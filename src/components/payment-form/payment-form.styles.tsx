import styled from 'styled-components';

import Button from '../button/button.component';

export const PaymentFormContainer = styled.div`
  min-width: 410px;
  border: 1px solid darkgrey;
  padding: 10px;
  width:100%;
  margin: 30px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 800px) {
    width:80%;
    margin: 5px;
    }
`;

export const FormContainer = styled.form`
    height: auto;
   justify-content: center;
    min-width: 400px;
`;

export const PaymentButton = styled(Button)`
  margin-left: auto;
  padding: 20px 40px;
  margin-top: 30px;
`;