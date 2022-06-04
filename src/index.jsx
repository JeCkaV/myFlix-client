import React, {useState, useEffect} from 'react';
import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

//Store
const store = createStore(moviesApp);

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
      return (
          <Provider store={store}>
              <Container>
                  <MainView />
              </Container>
          </Provider>
      );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];
const root = createRoot(container); 
// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication tab="home" />);

//Tells React to render app in root of DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);