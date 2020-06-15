import { CREATE_REPORT,CREATE_REPORT_ATTEMPT} from '../actions/actionType';

const INITIAL_STATE = {
    Loading: null,
    data: [],

};
export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'FETSH_CONVERSATION_ATTEMPT':
            return { ...state,   Loading:true };
        case 'FETSH_CONVERSATION':
            return { ...state, data:action.payload.data, Loading: action.payload.Loading, };
     
        default:
            return state;

    }


}; 