import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'mobx-react';
import App from './app';
import './global.css';
import stores from './stores';

const rootElement = document.getElementById('root');
const context = stores();

// Accept HMR
if (module.hot) {
  module.hot.accept();
}

// Render application to target container
ReactDOM.render(
  <AppContainer>
    <Provider {...context} >
      <App />
    </Provider>
  </AppContainer>,
  rootElement
);

// react-hot-loader 3 specific - rerender AppContainer
// in case of problems with react-router, check this issue:
// https://github.com/gaearon/react-hot-loader/issues/249
if (module.hot) {
  module.hot.accept('./index', () => {
    ReactDOM.render(
      <AppContainer>
        <Provider {...context}>
          <App/>
        </Provider>
      </AppContainer>,
      rootElement
    );
  });
}
