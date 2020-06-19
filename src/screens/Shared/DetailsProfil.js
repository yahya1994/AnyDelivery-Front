import { View, Text, Image, Button } from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Overlay, CheckBox } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions';
import { RAPIDITY } from '../../helpers/strings/strings';
import { IMAGE_PATH, DELIVERYMAN_ROLE, CLIENT_ROLE } from '../../helpers/constants/constants';
class DetailsProfil extends Component {
    state = {
        place: '', visible: false,
    }
    OverlayRapidity = () => {
        this.setState({ visible: false });
    }
    toggleOverlay = () => {
        this.setState({ visible: true });
    };

    render() {

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
                        flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '3%', alignSelf: 'center', height: '8%', width: '85%'
                    }} >
                        <Text style={{ fontSize: 18 }} >{this.props.auth.user.name}</Text>
                    </View>

                    <View style={{
                        flex: 4, marginBottom: '3%', borderRadius: 20, marginTop: '5%', width: "95%", borderWidth: 1,
                        backgroundColor: 'white', borderColor: '#007aff', alignSelf: 'center', padding: 5
                    }} >
                        <View style={{ backgroundColor: 'white', flexDirection: 'column', alignSelf: 'stretch', flex: 1, justifyContent: 'space-around' }}>
                            <Text
                                style={{ borderRadius: 25, borderWidth: 1, fontSize: 20, borderColor: '#30ACE4', textAlign: 'left', margin: 5, backgroundColor: 'white', }}
                            > adresse  :  {this.props.auth.user.adresse} </Text>
                            <Text
                                style={{ borderWidth: 1, borderRadius: 25, fontSize: 20, borderColor: '#30ACE4', textAlign: 'left', margin: 5, backgroundColor: 'white', }}
                            > email  : {this.props.auth.user.email} </Text>
                            <Text
                                style={{ borderWidth: 1, fontSize: 20, borderRadius: 25, borderColor: '#30ACE4', textAlign: 'left', margin: 5, backgroundColor: 'white', }}
                            > cin  : {this.props.auth.user.cin} </Text>
                            <Text
                                style={{ borderWidth: 1, fontSize: 20, borderRadius: 25, borderColor: '#30ACE4', textAlign: 'left', margin: 5, backgroundColor: 'white', }}
                            > role  : {this.props.auth.user.role == 2 ? <Text> livreur </Text> : <Text>client </Text>}  </Text>

                            <View style={{flexDirection:'row' ,borderWidth: 1,  borderRadius: 25, borderColor: '#30ACE4' }}>
                                <Text
                                    style={{ fontSize: 20, textAlign: 'left', margin: 5, backgroundColor: 'white', }}
                                > date de creation  : 
                                  </Text>
                                <Text
                                    style={{ fontSize: 14 , textAlign: 'left', marginTop: 10, backgroundColor: 'white', }}
                                >  {this.props.auth.user.created_at} 
                                 </Text>
                            </View>
                          
                        </View>


                    </View>

                </LinearGradient>
            </View>
        );
    }
}
const mapStateToProps = state => {
    return { auth: state.auth };
};
export default connect(mapStateToProps, { logout })(DetailsProfil);


