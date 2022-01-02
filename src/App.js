import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';

function App() {
  const [user, loading] = useAuthState(auth);

  const renderMainApp = () => {
    if (loading) {
      return <div>Loading...</div>;
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

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
