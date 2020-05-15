import React, { Component } from 'react';
import { View, TextInput, StyleSheet,   } from 'react-native';
import { Input, Button ,ThemeProvider} from 'react-native-elements';


const theme = {
    Button: {
      titleStyle: {
        color: 'white',  
        alignSelf: 'center', 
      },buttonStyle:{
        borderRadius:30,
        width:150,
        backgroundColor:'#007aff',
        borderWidth:1,borderColor:'#007aff'
      } 
    },
  };
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
                <View style={styles.btncontainer}>
                <ThemeProvider theme={theme}>   
                 <Button 
                       raised
                       title='Suivant'
                        loading={false}
                        onPress={() => this.props.navigation.push('Creér votre compte2', 
                    { ss: "this.state.s" })}
                    /></ThemeProvider>
 
                </View></View>


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
