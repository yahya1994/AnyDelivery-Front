import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet, Image } from 'react-native'; 
import networkCheck from '../../helpers/functions/networkCheck';
import { CLIENT_ACCOUNT, DELIVERY_MAN_ACCOUNT } from '../../helpers/strings/strings';

class RegistrationType extends Component {
    constructor() {
        super();
        this.state = {
            Image: null,
        };
    }

    componentDidMount() {
        networkCheck()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, flexDirection: 'row' }} >
                    <Image
                        source={require('../../assets/img/client.jpg')}
                        style={{ borderRadius: 10, paddingTop: 20, height: '95%', width: "50%" }}
                    />
                    <Text style={{ paddingLeft: 20, paddingTop: '20%',fontSize: 15, fontWeight: 'bold' }}>{CLIENT_ACCOUNT} </Text>
                    <Icon style={{ alignItems: 'center', alignSelf: 'center' }}
                        backgroundColor='white'
                        color='#007aff'
                        name='chevron-circle-right'
                        size={50}
                        onPress={() => this.props.navigation.navigate('Creér votre compte',{role : 1})}
                    />

                </View   >

                <View style={{ flex: 1, flexDirection: 'row' }} >
                    <Image

                        source={require('../../assets/img/livreur.jpg')}
                        style={{ borderRadius: 10, paddingTop: 20, height: '95%', width: "50%" }}
                    />
                    <Text style={{ paddingLeft: 20, paddingTop: '20%' ,fontSize: 15, fontWeight: 'bold'}}>{DELIVERY_MAN_ACCOUNT}</Text>
                    <Icon style={{ alignItems: 'center', alignSelf: 'center' }}
                        backgroundColor='white'
                        color='#007aff'
                        name='chevron-circle-right'
                        size={50}
                        onPress={() => this.props.navigation.navigate('Creér votre compte',{role : 2})}
                    />
                </View>
            </View>


        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1, paddingTop: Platform.OS === 'ios' ? 90 : 90,
        justifyContent: 'space-between', paddingBottom: 5,

        backgroundColor: 'white'
    }, InputContainer: {
        width: '100%'
    },
});

export default RegistrationType;
