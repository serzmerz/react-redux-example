import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import tracks from './tracks';
import playlist from './playlist';
import filterTracks from './filterTracks';
import users from './users';
import auth from './auth';
import data from './protectedData';
import signup from './signup';

export default combineReducers({
    routing: routerReducer,
    tracks,
    playlist,
    users,
    auth,
    data,
    signup,
    filterTracks
})
