import React, { Component } from 'react';
import {  Input   } from 'react-native-elements';

const InputText =({  keyboardType , disable,color, renderErrorMessage,errorStyle,errorMessage,value,onChangeText,placeholder,secureTextEntry })=>{
 
     return(
        <Input
        keyboardType = {keyboardType}
        disabledInputStyle={{color:'black',opacity:1}} 
        disabled={disable== true ?true : false}
        renderErrorMessage={ renderErrorMessage}
        errorMessage={errorMessage}
        errorStyle={errorStyle}
        placeholder={placeholder}
        inputContainerStyle={{borderBottomWidth: 0   }}
            containerStyle={{   borderWidth: 2, 
              borderRadius: 20,
            borderColor: color =='red' ? 'red': '#007aff',
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