const INITIAL_STATE = {
    token: null, strToken: null,
    success: null, loading: null,
    message: '', user: [],
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'DATA_ATTEMPT':
            return { ...state, loading: true }

        case 'SUCCESS':
            console.log(action.payload.user)
            return { ...state, user: action.payload.user, success: action.payload.success, loading:false };
        case 'FAIL':
            return { ...state, loading:false,success: action.payload.success, message: action.payload.message, modal: true };
        case 'AUTH_TOKEN':
            return { ...state, token: action.token };
        case 'LOGOUT':
            return { ...state };
        case 'SET_TOKEN':
            return { ...state, token: action.token };
        case 'GET_TOKEN':
            return { ...state, strToken: action.payload.token };
        
        default: return state;

    }
};  