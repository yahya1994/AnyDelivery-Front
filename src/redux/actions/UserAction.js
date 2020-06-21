import { SharedFunction, } from '../../helpers/functions/functions';
import { Alert } from 'react-native';
import { CREATE_REPORT,CREATE_REPORT_ATTEMPT} from './actionType';
import { POST, GET, PUT  } from '../../helpers/constants/method/method';


export const UpdateProfil = (id,data) => dispatch => {
  dispatch({ type: 'UPDATE_PROFIL_ATTEMPT'})
    
  SharedFunction('/user/profil/'+id, PUT, data).then((response) => {
        console.log(data);
        console.log(response);
      dispatch({
        type: 'UPDATE_PROFIL', payload: { UserProfil: response,Loading:false} })
    }).catch((err) => {
      console.log(err);
      dispatch({
        type: 'UPDATE_PROFIL', payload: { Loading: false} })
    })
  };