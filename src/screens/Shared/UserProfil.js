import { View, Text, Image, Button } from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Overlay, CheckBox } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { logout, UpdateProfil } from '../../redux/actions';
import { RAPIDITY } from '../../helpers/strings/strings';
import { IMAGE_PATH, DELIVERYMAN_ROLE, CLIENT_ROLE } from '../../helpers/constants/constants';
import { InputText, Buttons } from '../../components/Shared';

class UserProfil extends Component {
    state = {
        visible2: false, visible1: false, place: '', visible: false, phone_number: '',price_km:0
    }
    OverlayRapidity = () => {
        this.setState({ visible: false });
    }
    toggleOverlay = () => {
        this.setState({ visible: true });
    };
    OverlayRapidity1 = () => {
        this.setState({ visible1: false });
    }
    toggleOverlay1 = () => {
        this.setState({ visible1: true });
    };
    OverlayRapidity2 = () => {
        this.setState({ visible2: false });
    }
    toggleOverlay2 = () => {
        this.setState({ visible2: true });
    };
    render() {
console.log(this.props.UserProfil.Loading)
        return (
            <View style={{ flexDirection: 'column', flex: 1, }} >
                <LinearGradient colors={['white', '#30ACE4', '#30ACE4', '#007aff']} style={{ flex: 1 }}>
                    <View style={{ backgroundColor: 'white', marginTop: '1%', borderRadius: 100, flex: 2, justifyContent: 'center', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', width: '50%' }} >
                        <Image
                            source={require('../../assets/img/me.jpg')}
                            style={{ borderRadius: 80, paddingTop: 20, height: '100%', width: "100%" }}
                        />

                    </View>
                    <View style={{
                        backgroundColor: 'white', borderRadius: 20,
                        flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '3%', alignSelf: 'center', height: '8%', width: '70%'
                    }} >
                        <Text style={{ fontSize: 18 }}>{this.props.auth.user.name}</Text>
                    </View>

                    <View style={{
                        flex: 3, marginBottom: '3%', borderRadius: 20, marginTop: '5%', width: "95%", borderWidth: 1,
                        backgroundColor: 'white', borderColor: '#007aff', alignSelf: 'center', padding: 5
                    }} >
                        <View style={{ backgroundColor: 'white', flexDirection: 'row', flex: 1, justifyContent: 'space-around' }}>
                            {this.props.auth.user.role == DELIVERYMAN_ROLE ?
                                <Text onPress={this.toggleOverlay}
                                    style={{ borderWidth: 2, borderColor: '#30ACE4', textAlign: 'center', margin: 5, width: '25%', backgroundColor: 'white', }}
                                >{RAPIDITY}  {"\n"}{"\n"}
                                    {this.props.auth.user.rapidity === 0 ?
                                        <Icon
                                            backgroundColor='white'
                                            name='bicycle'
                                            size={30}
                                            color='#007aff'
                                        /> : <Icon
                                            backgroundColor='white'
                                            name='car'
                                            size={30}
                                            color='#007aff'
                                        />} </Text> : null}
                            {this.props.auth.user.role == CLIENT_ROLE ?

                                <Text onPress={this.toggleOverlay1}
                                    style={{ borderWidth: 2, width: '80%', borderRadius: 20, borderColor: '#30ACE4', alignSelf: 'center', textAlign: 'center', padding: 10, margin: 5, backgroundColor: 'white', }}
                                > numéro de Téléphone{"\n"}{this.props.auth.user.phone_number} </Text> :
                                <Text onPress={this.toggleOverlay1}
                                    style={{ borderWidth: 2, width: '40%', borderColor: '#30ACE4', textAlign: 'center', margin: 5, backgroundColor: 'white', }}
                                > numéro de Téléphone{"\n"}{"\n"}  {this.props.auth.user.phone_number} </Text>
                            }
                            {this.props.auth.user.role == DELIVERYMAN_ROLE ?

                                <Text onPress={this.toggleOverlay2}
                                    style={{ borderWidth: 2, width: '25%', borderColor: '#30ACE4', textAlign: 'center', margin: 5, backgroundColor: 'white', }}
                                > frais par km{"\n"}{"\n"}  {this.props.auth.user.price_km} </Text> : null}

                        </View>

                        <View style={{ alignSelf: 'center', width: '90%', flex: 2, justifyContent: 'space-evenly' }}>
                            <Button title='votre profil' onPress={() => this.props.navigation.navigate('details')} />
                            {this.props.auth.user.role == DELIVERYMAN_ROLE ? <Button title='votre caisse ' /> : null}
                            <Button title='Déconnexion' onPress={() => this.props.logout(this.props.navigation)} />
                        </View>
                    </View>
                    <Overlay
                        overlayStyle={{ width: '90%', height: '18%', borderRadius: 80, flexDirection: 'column' }}
                        isVisible={this.state.visible}
                        onBackdropPress={this.OverlayRapidity}>
                        <Text style={{ textAlign: 'center', }}>votre status de rapidité</Text>
                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                            <CheckBox
                                checked={this.props.UserProfil.Profil.rapidity == 0 ? true : false}
                                onPress={() => this.props.UpdateProfil(this.props.auth.user.id, { rapidity: 0 })}
                            />
                            <Icon
                                backgroundColor='white'
                                name='bicycle'
                                size={30}
                                color='#007aff'
                            />
                            <CheckBox
                                onPress={() => this.props.UpdateProfil(this.props.auth.user.id, { rapidity: 1 })}
                                containerStyle={{ borderColor: 'black' }}
                                checked={this.props.UserProfil.Profil.rapidity == 1 ? true : false}
                            />
                            <Icon
                                backgroundColor='white'
                                name='car'
                                size={30}
                                color='#007aff'

                            />
                        </View>
                    </Overlay>
                    <Overlay
                        overlayStyle={{ width: '90%', height: '40%', borderRadius: 40,justifyContent:"center", flexDirection: 'column' }}
                        isVisible={this.state.visible1}
                        onBackdropPress={this.OverlayRapidity1}>
                        <InputText
                            value={this.state.phone_number}
                            onChangeText={text => this.setState({ phone_number: (text) })}
                        />
                        <Buttons width={'55%'} title='confirmer'
                            onPress={() => this.props.UpdateProfil(this.props.auth.user.id, { phone_number: this.state.phone_number })} />

                    </Overlay>
                    <Overlay
                        overlayStyle={{ width: '90%', height: '40%', borderRadius: 40,justifyContent:"center", flexDirection: 'column' }}
                        isVisible={this.state.visible2}
                        onBackdropPress={this.OverlayRapidity2}>
                        <InputText
                            value={this.state.price_km}
                            onChangeText={text => this.setState({ price_km: (parseInt(text))})}
                        />
                        <Buttons width={'55%'} title='confirmer' loading={this.props.UserProfil.Loading}
                            onPress={() => this.props.UpdateProfil(this.props.auth.user.id, { price_km: this.state.price_km })} />

                    </Overlay>
                </LinearGradient>
            </View>
        );
    }
}
const mapStateToProps = state => {
    return { auth: state.auth, UserProfil: state.userProfil };
};
export default connect(mapStateToProps, { logout, UpdateProfil })(UserProfil);


