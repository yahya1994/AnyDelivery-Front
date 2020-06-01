import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Alert, PermissionsAndroid, Button,   } from 'react-native'
import MapView, { Polyline } from 'react-native-maps';
import geolocation from '@react-native-community/geolocation';
import networkCheck from '../helpers/functions/networkCheck';

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
      points: [
      ],
      finalPosition: {
        latitude: 35.6326110,
        longitude: 10.95301441848278,
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
 
  componentWillUnmount() {
    geolocation.clearWatch(this.watchID);

  }
     componentDidMount() {
      networkCheck()
      var dest = {
        latitude:this.props.route.params.item.starting_latitude,
        longitude:this.props.route.params.item.starting_longitude,
      };
       this.setState({ finalPosition: dest });
       var depart = {
        latitude:this.props.route.params.item.destination_latitude,
        longitude:this.props.route.params.item.destination_longitude,
      };
       this.setState({ DepartPosition: depart });
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

      console.log(this.state.points)
 
      this.setState({ initialPosition: initialRegion });
      console.log(this.state.initialPosition.latitude);
     
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

  showMAPs = () => {
    geolocation.watchPosition((position) => {
      var lat = parseFloat(position.coords.latitude);
      console.log(lat + 'rrrrrrrrrrrrrrrr');
      Alert.alert('Error');
    }, error => { geolocation.requestAuthorization();}, {
      enableHighAccuracy: true,
      timeout: 5000,
      timestamp: 1000,
      maximumAge: 5000,
      distanceFilter: 1
    });
  }

  config=()=>{
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
        latitude:35.6606,
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
console.log('============'+this.props.route.params.item.starting_latitude)
    return (
      <View style={styles.container} >


        <MapView style={styles.map}
          ref={ref => this.map = ref}
          style={styles.map}
          showsUserLocation
          region={this.state.initialPosition}
        > 
          {marker}
{    Initmarker = <MapView.Marker title={'yahya'} pinColor={'green'} description={ '1234 Foo Drive' } coordinate={this.state.initialPosition} />}
{  Finalmarker = <MapView.Marker  title={'test'}  description={ '1234 Foo Drive' } coordinate={this.state.finalPosition} />}
   {  Departmarker = <MapView.Marker  title={'yyy'}  description={ '1234 Foo Drive' } coordinate={this.state.DepartPosition} />}
          <Polyline  strokeColor={'red'} strokeWidth={4} coordinates={this.state.points} />

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
export default Map;