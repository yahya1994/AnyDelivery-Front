import { View, Text, Image, Button } from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Overlay, CheckBox } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import {logout} from '../../redux/actions';
import { RAPIDITY } from '../../helpers/strings/strings';
import  {IMAGE_PATH} from '../../helpers/constants/constants';
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
   
    render() {

        return (
            <View style={{ flexDirection: 'column', flex: 1, }} >
                <LinearGradient colors={['white', '#30ACE4', '#30ACE4', '#007aff']} style={{ flex: 1 }}>
                    <View style={{ backgroundColor: 'white',marginTop:'1%', borderRadius: 100, flex: 2, justifyContent: 'center', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', width: '50%' }} >
                    <Image
            source={require('../../assets/img/me.jpg')}
            style={{ borderRadius:80 ,paddingTop:20,height:'100%',width:"100%" }}
          />

                    </View>
                    <View style={{ backgroundColor: 'white', borderRadius: 20 ,
                      flexDirection: 'column',justifyContent:'center', alignItems: 'center',marginTop:'3%', alignSelf: 'center',height:'8%', width: '70%' }} >
                    <Text style={{fontSize:18}}>{this.props.auth.user.name}</Text>
                    </View>
                    <View style={{
                        flex: 3, marginBottom: '3%', borderRadius: 20, marginTop: '5%', width: "95%", borderWidth: 1,
                        backgroundColor: 'white', borderColor: '#007aff', alignSelf: 'center', padding: 5
                    }} >
                        <View style={{ backgroundColor: 'white', flexDirection: 'row', flex: 1, justifyContent: 'space-around' }}>
                            <Text onPress={this.toggleOverlay}
                                style={{ borderWidth: 1, borderColor: '#007aff', textAlign: 'center', margin: 5, width: '25%', backgroundColor: 'white', }}
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
                            />} </Text>
                            
                            <Text
                                style={{ borderWidth: 1, width: '25%', borderColor: '#007aff', textAlign: 'center', margin: 5, backgroundColor: 'white', }}
                            > frais par km{"\n"}{"\n"}  {this.props.auth.user.price_km} </Text>
                        </View>
                        <View style={{ alignSelf: 'center', width: '90%', flex: 2, justifyContent: 'space-evenly' }}>
                            <Button title='votre profil' />
                            <Button title='votre caisse ' />
                            <Button title='Déconnexion' onPress={()=>this.props.logout(this.props.navigation)}  />
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
export default connect(mapStateToProps,{logout} )(UserProfil);

 
