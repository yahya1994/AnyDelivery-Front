import React, { Component } from 'react';
import { View, TextInput, StyleSheet,   } from 'react-native';
import { Input, Button ,ThemeProvider} from 'react-native-elements';
import {Buttons , InputText} from'../components/Shared'; 
import { ScrollView } from 'react-native-gesture-handler';

 
class RegistrationStepOne  extends Component {
    constructor() {
        super();
        this.state = {
            name: '',email :'',password:'',phone_number:''
        };
    }
    render() {
        return (  
             

            <View style={styles.container}>
                <InputText style={styles.InputText}
                    placeholder='Nom et prenom'
                    onChangeText={text =>
                        this.setState({ name: (text) })}
                />
                <InputText style={styles.InputText}
                    placeholder='Email'
                    onChangeText={text =>
                        this.setState({ email: (text) })}
                /><InputText style={styles.InputText}
                    placeholder='Mot de passe '
                    onChangeText={text =>
                        this.setState({ password: (text) })}
                />
                <InputText style={styles.InputText}
                    placeholder='Confirmez le mot de passe'
                    onChangeText={text =>
                        this.setState({ password: (text) })}
                />  
                <InputText
                placeholder='Numero de Télephone'   onChangeText={text =>
                    this.setState({ phone_number: (text) })}/>
                 <Buttons 
                 width='40%'
                       title='Suivant'
                        onPress={() => this.props.navigation.push('Creér votre compte2', 
                    {  name:this.state.name,email:this.state.email,password:this.state.password,phone_number:this.state.phone_number,role:this.props.route.params.role })}
                    /> 
           </View> 


        );
    }
}
const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'ios' ? 90 : '15%',
        flex: 1,
        justifyContent: 'space-around',
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
