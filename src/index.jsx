import React, {useState, useEffect} from 'react';
import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
export default function MyFlixApplication() {
  
  return (
     <>
       <Container id="container">
         <MainView />
       </Container>
     </>
 )
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];
const root = createRoot(container); 
// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication tab="home" />);