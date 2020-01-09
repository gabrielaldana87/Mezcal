import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter } from 'react-router-dom';
import rootReducer from './reducers';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss';
import 'react-id-swiper/lib/styles/scss/swiper.scss';
import 'rheostat/css/rheostat.css';
import persistMiddleware from './middleware/persistMiddleware';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

const preloadedState = window.PRELOADED_STATE;
delete window.PRELOADED_STATE;

const store = createStore(rootReducer, preloadedState,
  composeWithDevTools(applyMiddleware(persistMiddleware))
);

ReactDOM.hydrate(
  <Provider store={ store }>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
