import { SharedFunction, } from '../../helpers/functions/functions';
import { Alert } from 'react-native';
import { CREATE_REPORT,CREATE_REPORT_ATTEMPT} from './actionType';


export const CreateReport = (id,data,role ,nav) => dispatch => {
  dispatch({ type: CREATE_REPORT_ATTEMPT })
  SharedFunction('/parcel/'+id+'/reclamation', 'POST', data).then((response) => {
        console.log(data);
        console.log(response);
        Alert.alert(
          "success",
          "votre Reclamation est creér avec success",
          [{ text: "OK", onPress: ()=>  nav.goBack()    }],
          { cancelable: false });
     
      dispatch({
        type: CREATE_REPORT, payload: { Loading: false} })
    }).catch((err) => {
      console.log(err);
      dispatch({
        type: CREATE_REPORT, payload: { Loading: false} })
    })
  };