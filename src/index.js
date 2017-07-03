import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './conteiner/App/App';
import About from './components/About/About';
import Track from './conteiner/Track/Track';
import User from './conteiner/User/User';
import LoginForm from './conteiner/LoginForm/LoginForm';
import SignupForm from './conteiner/SignupForm/SignupForm';
import SomeProtectedComponent from './conteiner/SomeProtectedComponent/SomeProtectedComponent';
import registerServiceWorker from './registerServiceWorker';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {loginUserSuccess} from './actions/auth';
import {requireAuthentication} from './components/AuthenticatedComponent/AuthenticatedComponent';

import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import reducer from './reducers';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
const history = syncHistoryWithStore(browserHistory, store);

let token = localStorage.getItem('token');
let refreshToken = localStorage.getItem('refreshToken');
if (token !== null &&refreshToken !==null) {
    store.dispatch(loginUserSuccess(token, refreshToken));
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={ history }>
        <Route path="/" component={App} />
        <Route path="/about" component={About} />
            <Route path="/tracks/:id" component={Track}/>
            <Route path="/user" component={User}/>
            <Route path="/login" component={LoginForm}/>
            <Route path="/signup" component={SignupForm}/>
            <Route path="/protected" component={requireAuthentication(SomeProtectedComponent)}/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
