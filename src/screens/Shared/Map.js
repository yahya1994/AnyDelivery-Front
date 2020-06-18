import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Alert, PermissionsAndroid, Button, } from 'react-native'
import MapView, { Polyline } from 'react-native-maps';
import geolocation from '@react-native-community/geolocation';
import networkCheck from '../../helpers/functions/networkCheck';
import axios from 'axios';
import Pusher from 'pusher-js/react-native';
import { connect } from 'react-redux';
import { ANYDELIVERY_BASE_URL } from '../../helpers/constants/constants';
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
      points: [],
      finalPosition: {
        latitude: 35.6326110,
        longitude: 10.95301441848278,
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
        latitude: 35.6326110,
        longitude: 10.95301441848278,
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
  Tracking() {
    Pusher.logToConsole = true;
    var pusher = new Pusher('0c956035633c2f990d85', {
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
      }
   /*
     var deliveryManCurentLocation = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
   
      var point = [];
      point.push({
        latitude: lat,
        longitude: long,

      });

      this.setState(prevState => ({
        points: [...prevState.points, {
          latitude: lat,
          longitude: long,
        }]
      }))
   ---------------
      mess.push(data.message);
      this2.setState(prevState => ({
          message: [...prevState.message, {
              _id: data.message.id,
              text: data.message.content,
              createdAt: new Date(),
              user: {
                  _id: data.message.user_id,
                  name: 'React Native',
                  avatar: 'https://placeimg.com/140/140/any',
              },
          }]
         }) 
      ) */}
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

      /* var point = [];
       point.push({
         latitude: lat,
         longitude: long,
 
       });
 
       this.setState(prevState => ({
         points: [...prevState.points, {
           latitude: lat,
           longitude: long,
         }]
       }))*/
      if (this.props.auth.user.role == 2) { this.Send(long, lat) }
      console.log("SendFct : " + this.state.points);
      this.Tracking();

      // this.setState({ initialPosition: initialRegion });
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
        delivery_man_id: 2,
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
  changePosition = event => {
    const coords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.initialPosition,
      latitude: coords.latitude,
      longitude: coords.longitude
    })
    var initialRegion = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }

    this.setState({ initialPosition: initialRegion, Marker: true })
    this.setState({ Marker: true })

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


        <MapView style={styles.map}
          ref={ref => this.map = ref}
          style={styles.map}
          showsUserLocation
          region={this.state.initialPosition}
        >
          {marker}
          {this.props.route.params.item.status != 2 && this.props.route.params.item.status != 0 ?
            <MapView.Marker title={this.props.route.params.DeliveryMan.name} pinColor={"green"} description={'1234 Foo Drive'} coordinate={this.state.DeliveryManPosition} /> : null}
          {Finalmarker = <MapView.Marker title={this.props.route.params.item.Receiver_name} description={'recepteur -- 1234 Foo Drive'} coordinate={this.state.finalPosition} />}
          {Departmarker = <MapView.Marker title={this.props.route.params.Client.name} description={'emeteur -- 1234 Foo Drive'} coordinate={this.state.DepartPosition} />}
          <Polyline strokeColor={'red'} strokeWidth={4} coordinates={this.state.points} />

        </MapView>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  map: {
    height: "100%",
    width: "100%"

  }
});
const mapStateToProps = state => {
  return { auth: state.auth };
};
export default connect(mapStateToProps, null)(Map);
