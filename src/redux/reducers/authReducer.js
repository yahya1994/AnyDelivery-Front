const INITIAL_STATE = {
    token:null ,strToken:null,
    success: null, 
    message:'', user: [],
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SUCCESS':
            return { ...state, success: action.payload };
        case 'FAIL':
            return { ...state, success: action.payload.success ,message:action.payload.message , modal: true };
        case 'AUTH_TOKEN':
            return { ...state, token : action.token };
        case 'LOGOUT':
            return { ...state };
        case 'SET_TOKEN':
            return { ...state,token : action.token };
            case 'GET_TOKEN':
                return { ...state,strToken : action.payload.token };
                case 'ME':
                    return { ...state, user : action.payload.user };
        
            default: return state;

        }
};  