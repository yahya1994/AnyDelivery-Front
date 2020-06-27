import { CREATE_REPORT,CREATE_REPORT_ATTEMPT} from '../actions/actionType';

const INITIAL_STATE = {
    Loading: false,
    Profil: [],

};
export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'UPDATE_PROFIL':
            console.log('lllll'+action.payload.UserProfil)
            return { ...state, Profil: action.payload.UserProfil,Loading:false };
        case 'UPDATE_PROFIL_ATTEMPT':
            return { ...state, Loading: true };
        default:
            return state;

    }


}; 