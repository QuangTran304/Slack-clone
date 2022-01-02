import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import CircularProgress from '@mui/material/CircularProgress';

function App() {
  const [user, loading] = useAuthState(auth);

  const renderMainApp = () => {
    if (loading) {
      // if (true) {  // FIXME: Just for testing the loading screen
      return (
        <AppLoading>
          <AppLoadingContent>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Slack_Technologies_Logo.svg/498px-Slack_Technologies_Logo.svg.png'
              alt='Slack logo'
            />
            <CircularProgress />
          </AppLoadingContent>
        </AppLoading>
      );
    }

    if (!user) {
      return <Login />;
    }

    return (
      <>
        <Header />

        <AppBody>
          <Sidebar />
          <Routes>
            <Route path='/' element={<Chat />} />
          </Routes>
        </AppBody>
      </>
    );
  };

  // Main App JSX
  return <BrowserRouter>{renderMainApp()}</BrowserRouter>;
}

export default App;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;
`;

const AppLoadingContent = styled.div`
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    height: 80px;
    padding: 20px;
    margin-bottom: 50px;
  }
`;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
