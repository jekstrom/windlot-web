import { LoginStatus, Action } from '../actions/index';

const initialState: LoginStatus = {
    loggedIn: false,
    loggedInUser: null
};

const LoginReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case 'LOGIN':
            return { 
                loggedIn: action.payload.loggedIn,
                loggedInUser: action.payload.loggedInUser
            };
        default:
            return state;
    }
};

export default LoginReducer;