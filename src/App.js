import React from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import { ContentLayout, FooterLayout, HeaderLayout } from './component/Layout/Layout';

function App() {
  return (
    <Container className="wrapper d-flex flex-column gap-3">
      <HeaderLayout />
      <ContentLayout />
      <FooterLayout />
    </Container>
  );
}

export default App;
