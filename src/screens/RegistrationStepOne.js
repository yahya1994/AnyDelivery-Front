import React, { Component } from 'react';
import { View, TextInput, StyleSheet,   } from 'react-native';
import { Input, Button ,ThemeProvider} from 'react-native-elements';
import {Buttons , InputText} from'../components/Shared'; 

 
class RegistrationStepOne  extends Component {
    constructor() {
        super();
        this.state = {
            s: 'ssssssssss',
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.InputText}
                    placeholder='Nom et prenom'
                />
                <TextInput style={styles.InputText}
                    placeholder='Email'
                /><TextInput style={styles.InputText}
                    placeholder='Mot de passe '
                />
                <TextInput style={styles.InputText}
                    placeholder='Confirmez le mot de passe'
                />
                 <Buttons 
                 width='20%'
                       title='Suivant'
                        onPress={() => this.props.navigation.push('Creér votre compte2', 
                    { ss: "this.state.s" })}
                    /> 
 
                </View> 


        );
    }
}
const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'ios' ? 60 : 60,
        flex: 1,
        justifyContent: 'space-around',
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
        paddingLeft: 15,
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
export default RegistrationStepOne;
