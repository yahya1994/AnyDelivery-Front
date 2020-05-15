import { View, Text, TextInput, Button } from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Overlay, CheckBox } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import {  me} from '../redux/actions';
class UserProfil extends Component {
    state = {
        place: '', visible: false,
    }
    OverlayRapidity = () => {
        this.setState({ visible: false });
    }
    toggleOverlay = () => {
        this.setState({ visible: true });
    };
    componentDidMount(){
        this.props.me();
    }
    render() {

        return (
            <View style={{ flexDirection: 'column', flex: 1, }} >
                <LinearGradient colors={['white', '#30ACE4', '#30ACE4', '#007aff']} style={{ flex: 1 }}>
                    <View style={{ backgroundColor: 'white', borderRadius: 100, flex: 2, justifyContent: 'center', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', width: '50%' }} >
                        <Icon name="user" color='#007aff' size={85} />
                        <Text>Yahya ben haj amor </Text>
                    </View>
                    <View style={{
                        flex: 3, marginBottom: '5%', borderRadius: 20, marginTop: '5%', width: "95%", borderWidth: 1,
                        backgroundColor: 'white', borderColor: '#007aff', alignSelf: 'center', padding: 5
                    }} >
                        <View style={{ backgroundColor: 'white', flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                            <Text onPress={this.toggleOverlay}
                                style={{ borderWidth: 1, borderColor: '#007aff', textAlign: 'center', margin: 5, width: '25%', backgroundColor: 'white', }}
                            >rapidité  {"\n"}{"\n"} <Icon
                                    backgroundColor='white'
                                    name='bicycle'
                                    size={30}
                                    color='#007aff'
                                /> </Text>
                            <Text
                                style={{ borderWidth: 1, width: '25%', borderColor: '#007aff', textAlign: 'center', margin: 5, backgroundColor: 'white', }}
                            >diametre{"\n"} {"\n"} 5 </Text>
                            <Text
                                style={{ borderWidth: 1, width: '25%', borderColor: '#007aff', textAlign: 'center', margin: 5, backgroundColor: 'white', }}
                            > frais par km{"\n"}{"\n"}  10 </Text>
                        </View>
                        <View style={{ alignSelf: 'center', width: '90%', flex: 2, justifyContent: 'space-evenly' }}>
                            <Button title='votre profil' />
                            <Button title='votre caisse ' />
                            <Button title='Déconnexion' />
                        </View>
                    </View>
                    <Overlay
                        overlayStyle={{ width: '90%', height: '18%', borderRadius: 80, flexDirection: 'column' }}
                        isVisible={this.state.visible}
                        onBackdropPress={this.OverlayRapidity}>
                        <Text style={{ textAlign: 'center', }}>votre status de rapidité</Text>
                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                            <CheckBox
                                checked={true}
                            />
                            <Icon
                                backgroundColor='white'
                                name='bicycle'
                                size={30}
                                color='#007aff'
                            />
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
                    </Overlay>
                </LinearGradient>
            </View>
        );
    }
}
const mapStateToProps = state => {
    return { auth: state.auth };
};
export default connect(mapStateToProps, {  me })(UserProfil);

 
