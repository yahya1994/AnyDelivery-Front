import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text ,ScrollView} from 'react-native';
import { Input, Button, ThemeProvider, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


const theme = {
    Button: {
      titleStyle: {
        color: 'white',  
        alignSelf: 'center',
      },buttonStyle:{
        borderRadius:50,
        alignSelf: 'stretch',
        width:300,
        backgroundColor:'#007aff'
      } 
    },
  };
class CreateParcelStepThree extends Component {
    constructor() {
        super();
        this.state = {
            s: 'ssssssssss',
        };
    }
    render() {
        return (

            <View style={styles.container}>
           
           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch',padding: 10  }}>
                    <Text style={{
                        borderRadius: 20,
                        padding: 15,
                        borderColor: '#007aff',
                    }}>Distance estimé</Text>

                    <Text style={{
                        width: '40%',
                        borderWidth: 2,
                        borderRadius: 20,
                        padding: 15,
                        borderColor: '#007aff',
                    }} >  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between' ,padding: 10}}>
                    <Text style={{  color: 'black', paddingLeft: 15 }}>
                        Rapidity </Text>

                    <View style={{ flexDirection: 'row' }}>
                        <CheckBox

                            checked={true}
                        />
                        <Icon
                            backgroundColor='white'
                            name='bicycle'
                            size={30}
                            color='#007aff'
                           
                        /></View>
                    <View style={{ flexDirection: 'row' }}>
                        <CheckBox
                            containerStyle={{ borderColor: 'black' }}
                            checked={false}
                        />
                        <Icon
                            backgroundColor='white'
                            name='car'
                            size={30}
                            color='#007aff'
                         
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch',padding: 10 }}>
                    <Text style={{
                        borderRadius: 20,
                        padding: 15,
                        borderColor: '#007aff',
                    }}>Code de comfirmation</Text>

                    <Text style={{
                        width: '40%',
                        borderWidth: 2,
                        borderRadius: 20,
                        padding: 15,
                        borderColor: '#007aff',
                    }}></Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'stretch',padding: 10,  }}>
                    <Text style={{
                        borderRadius: 20,
                        padding: 15,
                        borderColor: '#007aff',
                    }}>frais de livraison inferieur a </Text>

                    <Text style={{
                        width: '40%',
                        borderWidth: 2,
                        borderRadius: 20,
                        padding: 15,
                        borderColor: '#007aff',
                    }}></Text>
                </View>
                
            </View>


        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,  
         padding: 5,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'white'
    }, InputContainer: {
        width: '80%'
    },
    InputText: {
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#007aff',
        alignSelf: 'stretch',
        marginBottom: 15,
        paddingLeft: 15, width: '97%',
        backgroundColor: '#fff',
    }, btncontainer: {
        alignSelf: 'stretch',
        alignItems: 'center',
        margin: 15, 
    }, btnStyle: {
        borderRadius: 50,
    }
}

);
export default CreateParcelStepThree;
