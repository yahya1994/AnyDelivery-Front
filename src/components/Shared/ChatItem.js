import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { parcelReady, fetshParcels } from '../../redux/actions';
import { CLIENT_ROLE } from '../../helpers/constants/constants';

class ChatItem extends Component {

    render() {
         return (
            <View style={{ flex: 1 }}>
                {
                    this.props.auth.user.role !== this.props.item.user['0'].role
                        && (this.props.auth.user.role == 2 ?
                            this.props.item.deliveryMan['0'].delivery_man_id == this.props.auth.user.id : true)
                        && (this.props.auth.user.role == 1 ?
                            this.props.item.deliveryMan['0'].user_id == this.props.auth.user.id : true  )
                        ?
                        <TouchableOpacity   onPress={() => this.props.nav.push('Chat',
                        { idReceiver: this.props.item.parcel_id })}>
                        <View  style={styles.containerStyle}>
                            <Image
                                source={require('../../assets/img/livreur.jpg')}
                                style={{ borderRadius: 80, paddingTop: 20, height: '100%', width: '20%' }}
                            />
                            <Text style={{ fontSize: 24, padding: 15,paddingRight:"20%" }}> {this.props.item.user['0'].name}</Text>
                            <View style={{ justifyContent:'flex-end' ,flexDirection:'row',flex:1,paddingRight:'5%' }}>
                           { this.props.auth.user.role  == CLIENT_ROLE ? <Text style={{ fontSize: 15, paddingTop: 15 }}> {this.props.auth.user.name}  -- </Text> :
                           <Text style={{ fontSize: 15, paddingTop: 15 }}> {this.props.item.user['0'].name}  --  </Text>}                          
                            <Text style={{ fontSize: 15, paddingTop: 15 }}> {this.props.item.deliveryMan['0'].Receiver_name}</Text>
                            </View>
                             </View>
                        </TouchableOpacity>
                        : null}
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        marginTop: 10, borderRadius: 25,
        flexDirection: 'row',
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
