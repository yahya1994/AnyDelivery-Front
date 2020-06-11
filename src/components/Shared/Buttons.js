import React, { Component } from 'react';
import { View ,  TouchableOpacity} from 'react-native';
import {   Button ,ThemeProvider} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const Buttons =( { disabled,width, loadingProps,onPress,loading,title } )=>{
  
     return(
    
          <Button 
                raised
                titleStyle={ {alignSelf: 'center',
                color: '#fff',
                fontSize: 16,
                fontWeight: '600',marginBottom:3
 }}
                ViewComponent={LinearGradient} // Don't forget this!
                linearGradientProps={{
                  colors: ['#007aff','#30ACE4','#007aff'],
                
                }}
                TouchableComponent={TouchableOpacity}
                containerStyle={{     
                  
                  borderColor: '#007aff', alignSelf:'center',
                  borderRadius:25  , width:width  }}
                 title={title}
                 loading={loading}
                 onPress={onPress}
                 disabled={disabled}
             /> 
     );
 };

 export {Buttons};