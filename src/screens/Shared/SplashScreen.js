import React from 'react';
import { StyleSheet, Image, View, MaskedViewIOS, Animated } from 'react-native';
import { retrieveToken, } from '../../helpers/functions/functions';

export default class SplashScreen extends React.Component {
    state = {
        loadingProgress: new Animated.Value(0),
        animationDone: false
    }

  async  componentDidMount(){
        let token =await retrieveToken('AUTH_TOKEN');
        Animated.timing(this.state.loadingProgress,{
            toValue : 100,
            duration:3000,
            useNativeDriver:true,
            delay:400
        }).start(()=>{
           console.log(token);
           if (token ==null){
           this.props.navigation.push('Auth')}
           else this.props.navigation.push('Auth')
            this.setState({animationDone:true})
        });
     }
    render() {
          const imageScale={
            transform:[
                 {
                     scale: this.state.loadingProgress.interpolate({
                         inputRange:[10,20,1000],
                         outputRange:[1,0.5,2]
                     })
                 }
            ]
        };
     
        return (
            <View style={{ flex: 1 ,justifyContent:'center'}}>
                        <Animated.Image
                            source={require("../../assets/img/logoSP.png")}
                            style={[{ width: '100%' ,flex:1} ,imageScale]}
                            resizeMode="contain"
                        />
            </View>
        );
    }
}