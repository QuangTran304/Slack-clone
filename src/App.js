import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <BrowserRouter>
      <>
        <Header />

        <AppBody>
          <Sidebar />
          <Routes>{/* <Route path='/' element={ } */}</Routes>
        </AppBody>
      </>
    </BrowserRouter>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
