import { LoginStatus, Action } from '../actions/index';

const initialState: LoginStatus = {
    loggedIn: false,
    loggedInUser: null,
    logInMessage: ""
};

const LoginReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case 'LOGIN':
            return { 
                loggedIn: action.payload.loggedIn,
                loggedInUser: action.payload.loggedInUser,
                logInMessage: action.payload.logInMessage
            };
        default:
            return state;
    }
};

export default LoginReducer;