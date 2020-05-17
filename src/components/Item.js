import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Alert, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Overlay, CheckBox } from 'react-native-elements';
import QrScanner from './QrScanner';
import QRCode from 'react-native-qrcode-svg';
class Item extends Component {
    constructor() {
        super();
        this.state = {
            visible: false, visible1: false, visibleScanner: false
        }
    }

    OverlayExample = () => {
        this.setState({ visible: false });
    }
    toggleOverlay = () => {
        this.setState({ visible: true });
    };
    OverlayExample1 = () => {
        this.setState({ visible1: false });
    }
    toggleOverlay1 = () => {
        this.setState({ visible1: true });
    };
    ScannerOverlay = () => {
        this.setState({ visibleScanner: false });
    }
    toggleScanner = () => {
        this.setState({ visibleScanner: true });
    };
    render() {


        const change = {
            ...styles.circle,
            backgroundColor: this.props.item.status === 2 ? '#1BB566' : this.props.item.status === 0 ? 'red' : this.props.item.status === 1 ? 'yellow'
                : this.props.item.status === 3 ? 'orange' : 'black'
        }

        return (
            <View >
                <View style={styles.containerStyle}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row' }} >
                            <Text style={change}>  </Text>
                            <Text>{this.props.item.status.toString() === '1' ? 'en cours' : this.props.item.status.toString() === '2' ? 'livré' : this.props.item.status.toString() === '3' ? 'a rammaser' : 'en attente'}</Text>
                        </View>
                        {this.props.item.status === 3 ?
                            <View style={{ width: "50%", marginTop: "20%" }}>
                                <TouchableOpacity onPress={this.toggleOverlay1}  >
                                    <Icon name="user-plus" color='#007a' size={35} />
                                    <Overlay
                                        overlayStyle={{ width: '90%', height: '60%', borderRadius: 80, flexDirection: 'column', justifyContent: "space-between", alignItems: 'center' }}
                                        isVisible={this.state.visible1}
                                        onBackdropPress={this.OverlayExample1}>
                                        <View>
                                            <Text style={{ paddingBottom: 20 }}>votre livreur est  :
                                           {this.props.item.status.toString() !== '0' ? this.props.item.DeliveryMan['0'].name : ''}</Text>

                                            <QRCode
                                                style={{ paddingBottom: 20 }}
                                                size={230}
                                                value=" test test scanner qr"
                                            />

                                            <TouchableOpacity style={{ paddingTop: 40 ,alignSelf:'center' }} onPress={this.toggleScanner}  >
                                               <Text style={{borderWidth :2 }}> Scanner </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </Overlay>

                                    <Overlay isVisible={this.state.visibleScanner}
                                        onBackdropPress={this.ScannerOverlay}>
                                        <QrScanner />
                                    </Overlay>


                                </TouchableOpacity   >

                                {2 > 0 && (
                                    <View
                                        style={{
                                            position: 'absolute',
                                            right: -6,
                                            top: -3,
                                            backgroundColor: 'red',
                                            borderRadius: 6,
                                            width: 12,
                                            height: 12,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}  >
                                        <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}> 1    </Text>
                                    </View>
                                )}
                            </View> : null}

                    </View>

                    <View style={{ flex: 3, alignSelf: 'stretch', }} >
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', paddingRight: 20, alignSelf: 'stretch', }} >

                            <Text   >{this.props.item.Distance} km</Text>
                        </View>
                        <Text>{this.props.item.Client['0'].name} -{this.props.item.Receiver_name} </Text>
                        <Text>{this.props.item.starting_adresse} --{this.props.item.destination_adresse}</Text>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', alignSelf: 'stretch', }} >
                            <TouchableOpacity onPress={this.toggleOverlay}  >
                                <Icon style={{ padding: 10 }} name="comments-o" color='#DB4BDB' size={35} />
                                <Overlay
                                    overlayStyle={{ width: '90%', height: '20%', borderRadius: 80, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}
                                    isVisible={this.state.visible}
                                    onBackdropPress={this.OverlayExample}>


                                    <Icon
                                        style={{ padding: 10 }} name="user" color='#007aff' size={65} />
                                    <View>
                                        <Text>votre livreur :</Text>
                                        <Text>{this.props.item.status.toString() !== '0' ? this.props.item.DeliveryMan['0'].name : ''}</Text>
                                    </View>
                                    <Icon style={{ padding: 10 }} name="phone-square" color='green' size={45} />
                                    <Icon style={{ padding: 10 }} name="envelope-o" color='#007aff' size={45} />
                                </Overlay>
                            </TouchableOpacity >

                            <TouchableOpacity onPress={() => this.props.nav.push('Map')}  >
                                <Icon style={{ padding: 10 }} name="map-marker" color='#007aff' size={35} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.nav.push('ParcelDetails', { item: this.props.item, user: this.props.item.Client['0'] })}  >
                                <Icon style={{ padding: 10 }} name="info-circle" color='#007a' size={35} />
                            </TouchableOpacity>

                        </View></View>

                </View>

            </View>

        );
    }
}

const styles = {
    containerStyle: {
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        marginTop: 10, borderRadius: 25,
        flexDirection: 'row', flex: 1,
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
export default Item;