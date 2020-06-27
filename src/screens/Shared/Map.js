import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Alert, Text,PermissionsAndroid, TextInput, } from 'react-native'
import MapView, { Polyline } from 'react-native-maps';
import geolocation from '@react-native-community/geolocation';
import networkCheck from '../../helpers/functions/networkCheck';
import axios from 'axios';
import Pusher from 'pusher-js/react-native';
import { connect } from 'react-redux';
import { ANYDELIVERY_BASE_URL } from '../../helpers/constants/constants';
import { getDistance } from 'geolib';
import { SendInClose } from '../../redux/actions';

const { width, height } = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
class Map extends Component {
  constructor() {
    super();
    this.state = {
      distance:0,
      points: [],
      finalPosition: {
        latitude: 0.0,
        longitude: 0.0,
        latitudeDelta: 0.0922,
        longitudeDelta: LONGITUDE_DELTA,
      },
      DeliveryManPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: LONGITUDE_DELTA,
      },
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: LONGITUDE_DELTA,
      }, DepartPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: LONGITUDE_DELTA,
      },
      Marker: false
    }
  }

   sendNotifInClose=  (id)=>{
    this.setState({
      distance: getDistance(
          { latitude: this.state.finalPosition.latitude, longitude: this.state.finalPosition.longitude },
          { latitude: this.state.DeliveryManPosition.latitude, longitude: this.state.DeliveryManPosition.longitude }
      )
  })
console.log('distance++++++++++++++ :       '+this.state.distance);
console.log('distance++++++++++++++ :       '+id);

 if (this.state.distance < 500000){
  
   this.props.SendInClose(id,this.state.distance);
 }else null ;

}
  Tracking() {
    Pusher.logToConsole = true;
    var pusher = new Pusher('be69eb45b105d1920b80', {
      cluster: 'eu', forceTLS: true
    });
    let this2 = this
    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function (data) {
      //alert(JSON.stringify(data));
      let points = this2.state.points;
      // points.push(data.location);
      if (this2.props.route.params.item.id == this2.props.route.params.item.id) {
        this2.setState(prevState => ({
          points: [...prevState.points, {
            id: data.location.id,
            latitude: parseFloat(data.location.latitude),
            longitude: parseFloat(data.location.longitude),
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }]
        }))
        var initialRegion = {
          latitude: parseFloat(data.location.latitude),
          longitude: parseFloat(data.location.longitude),
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        this2.setState({ DeliveryManPosition: initialRegion });
      } }
    );
  }
  componentWillUnmount() {
    geolocation.clearWatch(this.watchID);
     
  }
  componentDidMount() {
    networkCheck()
    var dest = {
      latitude: parseFloat(this.props.route.params.item.starting_latitude),
      longitude: parseFloat(this.props.route.params.item.starting_longitude),
    };
    this.setState({ finalPosition: dest });
    var depart = {
      latitude: parseFloat(this.props.route.params.item.destination_latitude),
      longitude: parseFloat(this.props.route.params.item.destination_longitude),
    };
    this.setState({ DepartPosition: depart });
    this.setState({ DeliveryManPosition: depart });


    this.showMAP();
    this.watchID = geolocation.watchPosition((position) => {
      var lat = parseFloat(position.coords.latitude);
      var long = parseFloat(position.coords.longitude);

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };

       if (this.props.auth.user.role === 2) { this.Send(long, lat) }
      console.log("SendFct : " + this.state.points);
      this.Tracking();
       this.sendNotifInClose(this.props.route.params.Client.id);

 



      // Alert.alert('done' + ' ' + this.state.initialPosition.latitude);
    }, error => { Alert.alert('Error', JSON.stringify(error)); } ,
    );

    // this.watch();
    // await    this.track()
   /*   try{
     const granted =     PermissionsAndroid.request(
       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION 
       )
       if (granted == PermissionsAndroid.RESULTS.GRANTED) {
         this.showMAP() 
       }
       else  {
          Alert.alert(
           'error',
           'votre service GPS  est desactivé ',
           [
             {
               text: 'Cancel',
               onPress: () => console.log('Cancel Pressed'),
               style: 'cancel',
             },
             {text: 'OK', onPress: () =>{
               this.PermissionsGPS() }},
           ],
           {cancelable: false},
         );
       }
       }catch (err){
         console.log(err);
       }  
      */ }

  PermissionsGPS = () => {
    geolocation.requestAuthorization();
  }
  Send = async (long, lat) => {
    axios.post(ANYDELIVERY_BASE_URL + '/track',
      {
        client_id: this.props.route.params.Client.id,
        delivery_man_id: this.props.auth.user.id,
        parcel_id: this.props.route.params.item.id,
        longitude: long,
        latitude: lat
      })
      .then((response) => {
        console.log('succes : ' + response)
        console.log('successssssssssssssssssssssssss :b3aaath ')
      })
  }
  /*  showMAPs = () => {
      geolocation.watchPosition((position) => {
        var lat = parseFloat(position.coords.latitude);
        Alert.alert('Error');
      }, error => { geolocation.requestAuthorization();}, {
        enableHighAccuracy: true,
        timeout: 5000,
        timestamp: 1000,
        maximumAge: 5000,
        distanceFilter: 1
      });
    }
  */
  config = () => {
    skipPermissionRequests = false;
  }
  showMAP = () => {

    this.watchID = geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude);
      var long = parseFloat(position.coords.longitude);
      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
      this.setState({ initialPosition: initialRegion });
      console.log('showMap' + ' ' + this.state.initialPosition.latitude);



    }, error => { Alert.alert('Error', JSON.stringify(error)); }

    );
  }


  render() {
    var markers = [
      {
        latitude: 35.6606,
        longitude: this.props.route.params.item.starting_longitude,
        title: 'Foo Place',
        subtitle: '1234 Foo Drive'
      }
    ];
    let marker = null;
    let Departmarker = null;
    let Initmarker = null;
    let Finalmarker = null;
    if (this.state.Marker) {
      marker = <MapView.Marker coordinate={this.state.finalPosition} />
    }

    return ( 
      <View style={styles.container} >
        <Text  style={styles.InputText}  > 
          postion de colis </Text>
        <Text  style={[styles.InputText,{color:'green',marginTop :50}]}  > position de livreur </Text>


        <MapView style={styles.map}
          ref={ref => this.map = ref}
          style={styles.map}
          showsUserLocation
          region={this.state.initialPosition}
        >
          {marker}
          {this.props.route.params.item.status != 2 && this.props.route.params.item.status != 0 ?
            <MapView.Marker title={this.props.route.params.DeliveryMan.name} pinColor={"green"} coordinate={this.state.DeliveryManPosition} /> : null}
          {Finalmarker = <MapView.Marker title={this.props.route.params.item.Receiver_name} description={'Point de Destination'} coordinate={this.state.finalPosition} />}
          {Departmarker = <MapView.Marker title={this.props.route.params.Client.name} description={'Point de Depart'} coordinate={this.state.DepartPosition} />}
          <Polyline strokeColor={'red'} strokeWidth={4} coordinates={this.state.points} />

        </MapView>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 0,
    alignItems: 'center'
  },
  map: {
    height: "100%",
    width: "100%"

  },
  InputText: {
    position: 'absolute', zIndex: 1,
    borderWidth: 2,
    color:'red',
    borderRadius: 20,
    borderColor: '#007aff',
    alignSelf: 'stretch',
    margin: 15,alignSelf:"flex-end",
    paddingLeft: 15, width: '40%',
    backgroundColor: '#fff',
  }, 
  
});
const mapStateToProps = state => {
  return { auth: state.auth };
};
export default connect(mapStateToProps, {SendInClose})(Map);
