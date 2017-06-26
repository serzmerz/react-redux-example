import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './conteiner/App/App';
import About from './components/About/About';
import Track from './conteiner/Track/Track';
import User from './conteiner/User/User';
import registerServiceWorker from './registerServiceWorker';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import reducer from './reducers';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={ history }>
        <Route path="/" component={App} />
        <Route path="/about" component={About} />
            <Route path="/tracks/:id" component={Track}/>
            <Route path="/user" component={User}/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();

