import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Alert, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Overlay, CheckBox } from 'react-native-elements';
import QrScanner from './QrScanner';
import QRCode from 'react-native-qrcode-svg';
import { connect } from 'react-redux';
import { parcelReady, fetshParcels} from '../redux/actions';

class Item extends Component {
    constructor() {
        super();
        this.state = {
            visible: false, visible1: false, visibleScanner: false, QRcheck: null
        }
    }
    parcelReady=async(id)=>{
       await this.props.parcelReady(id);
       this.OverlayExample1();
        this.props.refresh();
    }
  
    
    QrCheck = (res) => {
        this.setState({ QRcheck: res })
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
                            <Text>{this.props.item.status.toString() === '1' ? 'en cours'
                                : this.props.item.status.toString() === '2' ? 'livré'
                                    : this.props.item.status.toString() === '3' ? 'réserver'
                                        : 'en attente'}</Text>
                        </View>
                        {this.props.item.status === 3 ?
                            <View style={{ width: "50%", marginTop: "20%" }}>
                                <TouchableOpacity onPress={this.toggleOverlay1}  >
                                    <Icon name="users" color='green' size={35} />
                                    <Overlay
                                        overlayStyle={{
                                            width: '90%', height: '75%', borderRadius: 80,
                                            flexDirection: 'column', justifyContent: "space-around", alignItems: 'center'
                                        }}
                                        isVisible={this.state.visible1}
                                        onBackdropPress={this.OverlayExample1}>
                                        <Text style={{ fontSize:20}} >votre livreur est  :  {this.props.item.status.toString() !== '0' ? this.props.item.DeliveryMan['0'].name : ''}</Text>
                                        <QRCode size={280} value={''.concat(this.props.item.id).concat(this.props.item.Client['0'].id).concat(this.props.item.DeliveryMan['0'].id)} />
                                        <TouchableOpacity onPress={this.toggleScanner}  >
                                            <Text style={{ fontSize: 20, borderRadius: 20 }}>resultat de scanne
                                            :{this.state.QRcheck ? <Icon name="check-circle" color='green' size={35} />
                                                    : this.state.QRcheck == false ? <Icon name="times-circle" color='red' size={35} /> :
                                                        <Text style={{ backgroundColor: 'green', color: 'white', borderRadius: 20, }} >  Lancer    </Text>}  </Text>
                                        </TouchableOpacity>
                                       { this.state.QRcheck ==true ? <TouchableOpacity  style={{ alignSelf: 'center' }} onPress={()=>this.parcelReady(this.props.item.id)} >
                                            <Text style={{
                                                alignSelf: 'center',
                                                color: 'white', backgroundColor: '#007aff',
                                                fontSize: 30, borderRadius: 20, paddingLeft: 30, paddingRight: 30
                                            }}>  Valider </Text>
                                        </TouchableOpacity>:
                                        <TouchableOpacity disabled= { true } style={{ alignSelf: 'center' }} onPress={()=>console.log('rrrr')} >
                                            <Text style={{
                                                opacity:0.5,
                                                alignSelf: 'center',
                                                color: 'white', backgroundColor: '#007aff',
                                                fontSize: 30, borderRadius: 20, paddingLeft: 30, paddingRight: 30
                                            }}>  Valider </Text>
                                        </TouchableOpacity>}
                                    </Overlay>
                                    <Overlay isVisible={this.state.visibleScanner}
                                        onBackdropPress={this.ScannerOverlay}>
                                        <QrScanner check={this.state.QRcheck} 
                                        close={this.ScannerOverlay} 
                                        QrCheck={this.QrCheck} 
                                        OperationID={''.concat(this.props.item.id).concat(this.props.item.Client['0'].id).concat(this.props.item.DeliveryMan['0'].id)} />
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
                                    <Icon onPress={() => this.props.nav.push('Chat',   {  idReceiver: this.props.item.Client['0'].id})} 
                                    style={{ padding: 10 }} name="envelope-o" color='#007aff' size={45} />
                                </Overlay>
                            </TouchableOpacity >
                            <TouchableOpacity onPress={() => this.props.nav.navigate('Map', { item: this.props.item })}  >
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
const mapStateToProps = state => {
    return { Parcels: state.parcel };
};
export default connect(mapStateToProps, {parcelReady,fetshParcels })(Item);
