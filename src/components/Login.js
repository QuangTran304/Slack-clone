import styled from 'styled-components';
import Button from '@mui/material/Button';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

const Login = () => {
  const signIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider).catch((error) => {
      alert(error.message);
    });
  };

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Slack_Technologies_Logo.svg/498px-Slack_Technologies_Logo.svg.png'
          alt='Slack logo'
        />
        <h3>Join Paperonics slack group</h3>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          onClick={signIn}
        >
          Sign in with Google
        </Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  > img {
    height: 70px;
    margin-bottom: 20px;
  }

  > h3 {
    padding-bottom: 55px;
  }
`;
