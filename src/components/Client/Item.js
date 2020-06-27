import React, { Component } from 'react';
import { TouchableOpacity, View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Overlay } from 'react-native-elements';
import QrScanner from './QrScanner';
import { connect } from 'react-redux';
import { parcelReady, showProfil, fetshParcels } from '../../redux/actions';
import ShowProfils from './ShowProfils';
import { Linking } from 'react-native';
import OneSignal from 'react-native-onesignal';

class Item extends Component {
    constructor() {
        super();
        this.state = {
            visible2: false, visible: false, visible1: false, visibleScanner: false, QRcheck: null
        }
    }
    parcelReady = async (id) => {
        await this.props.parcelReady(id);
        this.OverlayExample1();
        this.props.refresh();
    }

    OverlayExample2 = () => { this.setState({ visible2: false }); }
    
    toggleOverlay2 = () => {
        this.setState({ visible2: true });
        this.props.showProfil(this.props.item.id)
    };
    QrCheck = (res) => { this.setState({ QRcheck: res }) }

    OverlayExample = () => { this.setState({ visible: false }); }

    toggleOverlay = () => { this.setState({ visible: true }); };

    OverlayExample1 = () => { this.setState({ visible1: false }); }

    toggleOverlay1 = () => { this.setState({ visible1: true }); };

    ScannerOverlay = () => { this.setState({ visibleScanner: false }); }

    toggleScanner = () => { this.setState({ visibleScanner: true }); };

    render() {
        OneSignal.setExternalUserId(this.props.auth.user.id.toString());
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
                                    <Image
                                        source={require('../../assets/img/w.png')}
                                    />
                                    <Overlay
                                        overlayStyle={{
                                            width: '90%', height: '60%', borderRadius: 80,
                                            flexDirection: 'column', justifyContent: "space-around", alignItems: 'center'
                                        }}
                                        isVisible={this.state.visible1}
                                        onBackdropPress={this.OverlayExample1}>
                                        <Text style={{ fontSize: 20 }} >votre livreur est  :  {this.props.item.status.toString() !== '0' ? this.props.item.DeliveryMan['0'].name : ''}</Text>
                                        <Image
                                            source={require('../../assets/img/livreur.jpg')}
                                            style={{ borderRadius: 80, paddingTop: 20, height: '50%', width: "80%" }}
                                        />
                                        <TouchableOpacity onPress={this.toggleScanner}  >
                                            <Text style={{ fontSize: 20, borderRadius: 20 }}>resultat de scanne
                                            :{this.state.QRcheck ? <Icon name="check-circle" color='green' size={35} />
                                                    : this.state.QRcheck == false ? <Icon name="times-circle" color='red' size={35} /> :
                                                        <Text style={{ backgroundColor: 'green', color: 'white', borderRadius: 20, }} >  Lancer    </Text>}  </Text>
                                        </TouchableOpacity>
                                    </Overlay>
                                    <Overlay isVisible={this.state.visibleScanner}
                                        onBackdropPress={this.ScannerOverlay}>
                                        <QrScanner check={this.state.QRcheck}
                                            close={this.ScannerOverlay}
                                            QrCheck={this.QrCheck}
                                            refresh={() => this.props.refresh()}
                                            id={this.props.item.id}
                                            OperationID={''.concat(this.props.item.id).concat(this.props.item.Client['0'].id).concat(this.props.item.DeliveryMan['0'].id)} />
                                    </Overlay>
                                </TouchableOpacity   >
                            </View> : null}
                        {this.props.item.status === 0 ?
                            <View style={{ width: "50%", marginTop: "20%" }}>
                                <TouchableOpacity onPress={this.toggleOverlay2}  >
                                    <Icon name="users" color='green' size={35} />
                                    <Overlay
                                        overlayStyle={{ width: '95%', height: '70%', borderRadius: 30, flexDirection: 'column', justifyContent: "space-around", alignItems: 'center' }}
                                        isVisible={this.state.visible2}
                                        onBackdropPress={this.OverlayExample2}>
                                        {this.props.Parcels.Loading == true ?
                                            <ActivityIndicator size='large' />
                                            :
                                            this.props.Parcels.profil['profils'] != '' ?
                                                <FlatList
                                                    style={{ backgroundColor: 'white', width: '80%', }}
                                                    data={this.props.Parcels.profil['profils']}
                                                    renderItem={({ item }) => (
                                                        <ShowProfils close={this.OverlayExample2} refresh={() => this.props.refresh()} item={this.props.item.id} profil={item.delivery_man['0']} />
                                                    )}
                                                    keyExtractor={item => item.id.toString()}
                                                /> : <Text>vos n'avez pas des demandes</Text>}
                                        <TouchableOpacity onPress={() => this.props.showProfil(this.props.item.id)}  >
                                            <Icon name="refresh" color='#007aff' size={35} />
                                        </TouchableOpacity>
                                    </Overlay>
                                    <Overlay isVisible={this.state.visibleScanner}
                                        onBackdropPress={this.ScannerOverlay}>
                                    </Overlay>
                                </TouchableOpacity   >
                                {this.props.Parcels.profil['profils'] != '' && (
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
                                        <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>+</Text>
                                    </View>
                                )}
                            </View> : null}
                    </View>
                    <View style={{ flex: 3, alignSelf: 'stretch', }} >
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', paddingRight: 20, alignSelf: 'stretch', }} >
                            <Text   >{this.props.item.Distance} km</Text>
                        </View>
                        <Text>{this.props.item.Client['0'].name} -- {this.props.item.Receiver_name} </Text>
                        <Text>{this.props.item.starting_adresse} -- {this.props.item.destination_adresse}</Text>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', alignSelf: 'stretch', }} >
                            {this.props.item.status.toString() !== '0' ? <TouchableOpacity onPress={this.toggleOverlay}  >
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
                                    <Icon style={{ padding: 10 }} name="phone-square" onPress={() =>
                                        Linking.openURL(`tel:${parseInt(this.props.item.DeliveryMan['0'].phone_number)}`)

                                    } color='green' size={45} />
                                    <Icon onPress={()=>this.setState({visible:false},() => this.props.nav.navigate('chats', { idReceiver: this.props.item.id })) }
                                        style={{ padding: 10 }} name="envelope-o" color='#007aff' size={45} />
                                </Overlay>
                            </TouchableOpacity > : <TouchableOpacity disabled={true} onPress={this.toggleOverlay}  >
                                    <Icon style={{ padding: 10 }} name="comments-o" color='grey' size={35} />
                                </TouchableOpacity >}
                            <TouchableOpacity onPress={() => this.props.nav.navigate('Map', { item: this.props.item, DeliveryMan: this.props.item.DeliveryMan['0'], Client: this.props.item.Client['0'] })}  >
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
    },
    circle: {
        fontSize: 10,
        borderRadius: 100, margin: 3, paddingTop: 10,
        width: '13%', height: '10%'
    }
};
const mapStateToProps = state => {
    return { Parcels: state.parcel, auth: state.auth };
};
export default connect(mapStateToProps, { parcelReady, showProfil, fetshParcels })(Item);
