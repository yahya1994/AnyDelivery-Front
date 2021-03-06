import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Alert } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Login  } from '../redux/actions';
import { connect } from 'react-redux';


const { width, height } = Dimensions.get('window');
const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
   
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position
  ]);
}



class Authentification extends Component {
  constructor() {
    super();
    this.state = {
   email:'ala@gmail.com',password:'ala'
    };
    this.buttonOpacity = new Value(1);
     this.onStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
            )
          ])
      }
    ]);
    
    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 180],
      extrapolate: Extrapolate.CLAMP
    });
    this.textInputZindex  = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP
    });
    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP
    });
    this.textIOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP
    });
    this.OnClose = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
            )
          ])
      }
    ]);
    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 2.6, 0],
      extrapolate: Extrapolate.CLAMP
    });
  }
  handleChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  }
  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  }
  SignUpHandler =()=>{
    this.props.navigation.navigate('Creér votre compte',{  } );
  }
  render() {
    console.log(this.state.email)
    return (
      <View
        style={{
          flex: 1, backgroundColor: 'white', justifyContent: 'flex-end'}} >
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,transform: [{ translateY: this.bgY }] }} >
          <Image
            source={require('../assets/img/login-image.jpg')}
            style={{ flex: 1, height: null, width: null }}
          />
        </Animated.View>
        <View style={{ height: height / 4, justifyContent: 'center' }}>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }]
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Se Connecter</Text>
            </Animated.View>
          </TapGestureHandler>
          <Animated.View
            style={{
              height: height / 2, ...StyleSheet.absoluteFill,
              top: null, justifyContent: 'center',
              opacity: this.textIOpacity,
              transform: [{ translateY: this.textInputY }],
              zIndex: this.textInputZindex,
            }}>
            <TapGestureHandler onHandlerStateChange={this.OnClose}>
              <Animated.View style={styles.closeBtn}>
                <Animated.Text style={{fontSize: 30, transform: [{ rotate:this.rotateCross  }] }} >
                   X
                    </Animated.Text>
              </Animated.View>
            </TapGestureHandler>
            <TextInput 
              placeholder='email'
              style={styles.TextInputStyle}
              autoCapitalize='none'
              value={this.state.email}
              onChangeText={text => this.setState({ email: (text) })}
            />
            <TextInput
              placeholder='password'
              style={styles.TextInputStyle}
              autoCapitalize='none'
              autoCorrect={false}
              value={this.state.password}
              onChangeText={text => this.setState({ password: (text) })}
              secureTextEntry={true}
            />
              <TouchableOpacity onPress={()=>this.props.Login(this.state.email,this.state.password,this.props.navigation
                )} style={styles.btnStyle}>
            <LinearGradient colors={['#007aff','#30ACE4','#007aff']} 
             style={{borderRadius:50  ,alignItems: 'center' ,width:'100%'}} >
              <Text style={styles.textStyle}>Login</Text></LinearGradient>
            </TouchableOpacity> 
            <Text style={{  alignSelf: 'center',}} >vous n'avez pas un compte ?,</Text> 
            <Text onPress={()=>this.props.navigation.navigate("Creér votre compte") } style={  styles.textStyleNewAcount} >creer votre compte </Text>
          </Animated.View>
        </View>
      </View>
    );
  }
}
export default connect(null, { Login  })(Authentification);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'white',
    height: 50,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5
  }, TextInputStyle: { 
    borderWidth: 2,
     borderRadius: 50, 
     borderColor: '#007aff',
    alignSelf: 'stretch',
  
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 15,
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  btnStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#007aff'  ,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 25
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },  textStyleNewAcount: {
    alignSelf: 'center',
    color:  '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  }, closeBtn: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    position: "absolute",
    top: -5,
    justifyContent: 'center',
    left: width / 2 - 20,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 2.2, borderWidth: 0.5,
    borderColor: 'black', }});