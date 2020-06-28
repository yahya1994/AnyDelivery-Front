import React, { Component } from 'react';
import { View, Alert, StyleSheet, } from 'react-native';
import { Input, Button, ThemeProvider } from 'react-native-elements';
import { Buttons, InputText } from '../../components/Shared';
import { validateName, validateEmail, validateNumTel, validatePassword, validateComfirmPassword } from '../../helpers/functions/InputValidation';
import { FULL_NAME, EMAIL, COMFIRME_PASSWORD, INPUT_CHECK, PASSWORD, PHONE_NUMBER, ERROR } from '../../helpers/strings/strings';

export default class RegistrationStepOne extends Component {
    constructor() {
        super();
        this.state = {
            name: '', email: '', password: '', Comfirmpassword: '', phone_number: ''
        };
    }
    render() {
        console.log(this.state.isValide)
        return (
            <View style={styles.container}>
                <InputText style={styles.InputText}
                    placeholder={FULL_NAME}
                    onChangeText={text => {
                        this.setState({ name: (text) })
                    }}
                    errorMessage={validateName(this.state.name)}
                />
                <InputText style={styles.InputText}
                    placeholder={EMAIL}
                    onChangeText={text => {
                        this.setState({ email: (text) })
                    }
                    }
                    errorMessage={validateEmail(this.state.email)}
                /><InputText style={styles.InputText}
                    placeholder={PASSWORD}
                    secureTextEntry={true}
                    onChangeText={text =>
                        this.setState({ password: (text) })}
                    errorMessage={validatePassword(this.state.password)}
                />
                <InputText style={styles.InputText}
                    placeholder={COMFIRME_PASSWORD}
                    secureTextEntry={true}
                    onChangeText={text =>
                        this.setState({ Comfirmpassword: (text) })}
                    errorMessage={validateComfirmPassword(this.state.Comfirmpassword, this.state.password)}
                />
                <InputText
                keyboardType = 'number-pad'
                    placeholder={PHONE_NUMBER} onChangeText={text =>
                        this.setState({ phone_number: (text) })}
                    errorMessage={validateNumTel(this.state.phone_number)}
                />

                <Buttons
                    width='40%'
                    title='Suivant'

                    onPress={(
                        validateName(this.state.name)
                        || validateEmail(this.state.email)
                        || validatePassword(this.state.password)
                        || validateComfirmPassword(this.state.Comfirmpassword, this.state.password)
                        || validateNumTel(this.state.phone_number)) == false ? () => this.props.navigation.push('Creér votre compte2',
                            { name: this.state.name, email: this.state.email, password: this.state.password, phone_number: this.state.phone_number, role: this.props.route.params.role }) : () => Alert.alert(
                                ERROR,
                                INPUT_CHECK,
                                [{ text: "OK", cancelable: false }],
                                { cancelable: false })}
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
