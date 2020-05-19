import React, { Component } from 'react';
import {  Input   } from 'react-native-elements';

const InputText =({  renderErrorMessage,errorStyle,errorMessage,value,onChangeText,placeholder,secureTextEntry })=>{
 
     return(
        <Input
        renderErrorMessage={ renderErrorMessage}
        errorMessage={errorMessage}
        errorStyle={errorStyle}
        placeholder={placeholder}
        inputContainerStyle={{borderBottomWidth: 0   }}
            containerStyle={{   borderWidth: 2, 
              borderRadius: 20,
            borderColor: '#007aff',
            marginLeft: 5,
            height:55,
            marginRight: 5,
            marginBottom: 15,
            paddingLeft: 15,width:'97%',
            backgroundColor: '#fff'}} 
        autoCapitalize='none'
        autoCorrect={false}
        value={value} 
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
     );
 };

 export {InputText};