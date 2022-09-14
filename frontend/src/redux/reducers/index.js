import { combineReducers } from 'redux';
import Auth from './Auth';
import { SIGNOUT } from 'redux/constants/Auth';

const reducers = combineReducers({
    auth: Auth
});

const rootReducer = (state, action) => {   
    // Clear all data in redux store to initial.
    if(action.type === SIGNOUT)
       state = undefined;    
    return reducers(state, action);
 };

export default rootReducer;