import { SharedFunction, } from '../../helpers/functions/functions';
import { Alert } from 'react-native';
import { CREATE_REPORT,CREATE_REPORT_ATTEMPT} from './actionType';
import { POST, GET, PUT  } from '../../helpers/constants/method/method';


export const fetshConversation = () => dispatch => {
  dispatch({ type: 'FETSH_CONVERSATION_ATTEMPT' })
  SharedFunction('/dess',GET).then((response) => {
     
      dispatch({
        type: 'FETSH_CONVERSATION', payload: { data:response,Loading: false} })
    }).catch((err) => {
      console.log(err);
      dispatch({
        type: 'FETSH_CONVERSATION', payload: { Loading: false} })
    })
  };