import React, { Component } from 'react';
import { View, TextInput, StyleSheet    ,Text} from 'react-native';
import { Input, Button , Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import GetAdresseFromMap from './GetAdresseFromMap'; 

const theme = {
    Button: {
      titleStyle: {
        color: 'white',  
        alignSelf: 'center',
      },buttonStyle:{
        borderRadius:50,
        width:150,
        backgroundColor:'#007aff'
      } 
    },
  };
class CreateParcelStepTwo  extends Component {
    constructor() {
        super();
        this.state = {
            s: 'ssssssssss',lat:null,long:null  ,visible: false,
        };
    }
    handleChange=( lat,long) =>{
        this.setState({ lat: lat,long : long}) 
    }

    OverlayExample = () => {
        this.setState({ visible: false });
    }
    toggleOverlay = () => {
        this.setState({ visible: true });
    };
    render() {
        return (
            <View style={styles.container}>
                    <TextInput style={styles.InputText}
                    placeholder='Nom et prenom'
                />
                <TextInput style={styles.InputText}
                    placeholder='Numéro de telephone'
                />
                <Input
                    disabled
                    placeholder={'localisation'}
                     inputContainerStyle={{borderBottomWidth: 0 ,   }}
                     containerStyle={{   borderWidth: 2, 
                        borderRadius: 20,
                        borderColor: '#007aff',
                        marginLeft: 5,
                        height:50,
                        marginRight: 5,
                        marginBottom: 15,
                        paddingLeft: 15,width:'97%',
                        backgroundColor: '#fff'}} 
                    rightIcon={
                        <Icon.Button
                            style={{alignItems:'center',alignSelf:'center'}}
                            backgroundColor='white'
                            name='map-marker'
                            size={28}
                            color='blue'
                            onPress={() => this.props.test()}
                        />
                    }
                />
                <TextInput style={styles.InputText}
                    placeholder='adresse'
                />
                  
                </View>


        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1, 
       
        justifyContent: 'space-between',
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
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 15,
        paddingLeft: 15,width:'97%',
        backgroundColor: '#fff',
    }, btncontainer: {
        alignSelf: 'stretch',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        margin: 15
    }, btnStyle: {
        borderRadius: 50,
    }
}

);
export default CreateParcelStepTwo;
