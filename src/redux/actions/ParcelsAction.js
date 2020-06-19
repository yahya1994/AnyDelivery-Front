import { PARCELS, PAGE } from '../../helpers/constants/EndPoint/EndPoint';
import { SharedFunction, } from '../../helpers/functions/functions';
import AsyncStorage from '@react-native-community/async-storage';
import { FETCH_DATA_ATTEMPT,FETCH_PARCELS,CHOSE_PARCEL,CHOSE_PARCEL_FAIL,PARCEL_READY,PARCEL_DONE,CREATE_PARCEL,FETCH_MORE_PARCELS,FETCH_MORE_TAKEN_PARCELS,FETCH_TAKEN_PARCEL} from './actionType';
import { POST, GET, PUT  } from '../../helpers/constants/method/method';

export const fetshParcels = ( status,input,pageNumber) => dispatch => {
  dispatch({ type: FETCH_DATA_ATTEMPT })
  SharedFunction('/client/parcel?status='+status+'&input='+input+'&page='+pageNumber, GET).then((response) => {
  
     const type = response.current_page ===1 ?FETCH_PARCELS :FETCH_MORE_PARCELS
      dispatch({
        type: type, payload: {
          items: response.data, 
          totalItemsCount: response.total,
          current_page :response.current_page,
          last_page : response.last_page
        }
      })
     
    
  }).catch((err) => {
    console.log("error = "+ err ); })
};

export const fetsh_DeliveryMan_Parcel = (status,input,pageNumber) => dispatch => {
  dispatch({ type: 'FETCH_DATA_ATTEMPT' })
  SharedFunction('/deliveryMan/parcel?status='+status+'&input='+input+'&page='+pageNumber,  GET).then((response) => {
    const type = response.current_page ===1 ?FETCH_TAKEN_PARCEL :FETCH_MORE_TAKEN_PARCELS
    dispatch({
      type: type, payload: {
        items: response.data, 
        totalItemsCount: response.total,
        current_page :response.current_page,
        last_page : response.last_page
      }
    })
}).catch((err) => {
  console.log("error d= "+ err ); })
};
export const fetshParcels_DeliveryMan = (status,pageNumber) => dispatch => {
  dispatch({ type: FETCH_DATA_ATTEMPT })
  SharedFunction('/parcels?input='+status+'&page='+pageNumber, GET).then((response) => {
   
    const type = response.current_page ===1 ?FETCH_PARCELS :FETCH_MORE_PARCELS
    dispatch({
      type: type, payload: {
        items: response.data, 
        totalItemsCount: response.total,
        current_page :response.current_page,
        last_page : response.last_page
      }
    })
   
  
}).catch((err) => {
  console.log("error = "+ err ); })
};
export const CreateParcel = (data,nav) => dispatch => {
  SharedFunction('/client/parcel', POST, data).then((response) => {
    console.log(response)
    nav.replace ('Main');
    dispatch({
      type: CREATE_PARCEL, payload: { items: response, } })
  }).catch((err) => {
    console.log(err);

  })
};
export const sendRequest = (parcel_id,delivery_man_id,client_id) => dispatch => {
  let data ={
    parcel_id,delivery_man_id,client_id
  }
  SharedFunction('/deliveryMan/req', POST, { parcel_id,delivery_man_id,client_id}).then((response) => {
    console.log(response)
     
    dispatch({
      type: 'REQUEST_FOR_PARCEL', payload: { parcel_id:response.parcel_id,delivery_man_id: response.delivery_man_id } })
  }).catch((err) => {
    console.log(err);

  })
};
export const parcelReady = (id,OperationID,e) => dispatch => {
  SharedFunction('/client/parcelReady/'+id+'/'+OperationID+'/'+e, PUT ).then((response) => {
    console.log('7777777'+response)
    dispatch({
      type: PARCEL_READY, payload: { items: response, } })
  }).catch((err) => {
    console.log(err);

  })
};

export const parcelDone = (id) => dispatch => {
  SharedFunction('/deliveryMan/parcelDone/'+id, PUT ).then((response) => {
    console.log('Done '+response)
    dispatch({
      type: PARCEL_DONE, payload: { items: response, } })
  }).catch((err) => {
    console.log(err);

  })
};

export const showProfil = (parcel_id) => dispatch => {
  SharedFunction('/client/showProfils/?parcel='+parcel_id, GET ).then((response) => {
    console.log('Done '+response['profils'])
    dispatch({
      type: 'SHOW_PROFIL', payload: { profil: response, } })
  }).catch((err) => {
    console.log(err);

  })
};   



export const ChoseParcel = (id,delivery_man_id) => dispatch => {
  SharedFunction('/client/parcel/'+id+'/'+delivery_man_id, PUT ).then((response) => {
dispatch({ type: CHOSE_PARCEL, payload: { items: response, } })
  }).catch((err) => {
    console.log("response2")
    dispatch({  type: CHOSE_PARCEL_FAIL, payload: { message: "cette colis n'est pas encore disponible", success: false } })

  })
};
 
  