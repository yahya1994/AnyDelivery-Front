import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Alert, PermissionsAndroid, Button, TextInput } from 'react-native'
import MapView, { Polyline } from 'react-native-maps';
import geolocation from '@react-native-community/geolocation';
import networkCheck from '../../helpers/functions/networkCheck';
import { SAVE } from '../../helpers/strings/strings';

const { width, height } = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
class GetAdresseFromMap extends Component {
  constructor() {
    super();
    this.state = {
      points: [

      ], adresse: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      finalPosition: {
        latitude: 35.6326110,
        longitude: 10.95301441848278,
        latitudeDelta: 0.0922,
        longitudeDelta: LONGITUDE_DELTA,
      },
      initialPosition: {
        latitude: 35.6326151,
        longitude: 10.9530144184827,
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
    this.showMAP();

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
      ...this.state.adresse,
      latitude: coords.latitude,
      longitude: coords.longitude
    })
    var initialRegion = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }

    this.setState({ adresse: initialRegion, Marker: true })
    this.setState({ Marker: true })
    //console.log(this.state.adresse.latitude)

  } 
  render() {
 
    let marker = null;
    let Initmarker = null;
    let Finalmarker = null;

    if (this.state.Marker) {
      marker = <MapView.Marker coordinate={this.state.adresse} />
    }
    Initmarker = <MapView.Marker title={"yaaahya"} coordinate={this.state.initialPosition} />
    Finalmarker = <MapView.Marker coordinate={this.state.finalPosition} />

    return (
      <View style={styles.container} >

        <TextInput style={styles.InputText}
          value={'Latitude: ' + this.state.adresse.latitude.toString() + ' | Longitude: ' + this.state.adresse.longitude.toString()}

        />
        <MapView style={styles.map}
          onPress={this.changePosition}
          ref={ref => this.map = ref}
          style={styles.map}
          showsUserLocation
          region={this.state.initialPosition}
        >
          {marker}
          <Polyline strokeColor={'red'} strokeWidth={4} coordinates={this.state.points} />

        </MapView>
       
        <Button
          onPress={() => this.props.changeFunction(this.state.adresse.latitude, this.state.adresse.longitude)}
          title={SAVE}></Button>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 0,
    alignItems: 'center',
  },
  map: {
    height: "95%",
    width: "100%",
    paddingBottom: 5

  },
  InputText: {
    position: 'absolute', zIndex: 1,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#007aff',
    alignSelf: 'stretch',
    margin: 5,
    paddingLeft: 15, width: '97%',
    backgroundColor: '#fff',
  }
});
export default GetAdresseFromMap;