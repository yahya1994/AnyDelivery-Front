
const INITIAL_STATE = {
    Loading: null,
    success: null,

};
export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'CREATE_REPORT':
            return { ...state, Loading: action.payload.Loading, };
        case 'CREATE_REPORT_ATTEMPT':
            return { ...state, Loading: true };
        default:
            return state;

    }


}; 