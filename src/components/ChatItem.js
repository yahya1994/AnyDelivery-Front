import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Overlay, CheckBox } from 'react-native-elements';
import QrScanner from './QrScanner';
import QRCode from 'react-native-qrcode-svg';
import { connect } from 'react-redux';
import { parcelReady, fetshParcels } from '../redux/actions';
import Item from './Item';

class ChatItem extends Component {

    render() {

        return ( 
            <View style={{flex:1}}>

                { this.props.auth.user.role !== this.props.item.user['0'].role
                &&( this.props.auth.user.id !== this.props.item.user_id ) 
                && ( this.props.auth.user.role ==2 ? 
                    this.props.item.deliveryMan['0'].delivery_man_id == this.props.auth.user.id :true
                    )    
                
                ?
                   
                        <View  onStartShouldSetResponder={() => this.props.nav.push('Chat',
                        { idReceiver: this.props.item.parcel_id })} style={styles.containerStyle}>
        <Image
            source={require('../assets/img/me.jpg')}
            style={{ borderRadius:80 ,paddingTop:20,height:'100%',width:'20%' }}
          />
                            <Text style={{fontSize:24,padding:15}}> {this.props.item.user['0'].name}</Text>
                           

                        </View>   : null}


            </View>

        );
    }
}

const styles = {
    containerStyle: {
       flex:1,
        marginTop: 10, borderRadius: 25,
        flexDirection: 'row' ,
        backgroundColor: 'white',
    }, VcontainerStyle: {
        borderColor: 'black',
        borderRadius: 15,
        marginTop: 15,
    },
    circle: {
        fontSize: 10,
        borderRadius: 100, margin: 3, paddingTop: 10,
        width: '13%', height: '10%'
    }
};
const mapStateToProps = state => {
    return { auth: state.auth };
};
export default connect(mapStateToProps, { parcelReady, fetshParcels })(ChatItem);
