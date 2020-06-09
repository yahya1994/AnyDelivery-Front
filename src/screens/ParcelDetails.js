import { View, Text, TextInput } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import QRCode from 'react-native-qrcode-svg';
import { Overlay } from 'react-native-elements';

class ParcelDetails extends Component {
    state = {
        visible: false

    }
   
    close = () => {
        this.setState({ visible: false });
    }
    open = () => {
        this.setState({ visible: true });
    };

    render() {

        return (
            <View style={{ backgroundColor: '#EFFBFB', flexDirection: 'column', flex: 1 }} >
                <View style={{ backgroundColor: '#EFFBFB', flex: 1, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch', }} >
                    <Icon style={{ padding: 10 }} name="user" color='#007aff' size={65} />
                    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', flexDirection: 'column' }} >
                        <Text   >{this.props.route.params.user.name}-{this.props.route.params.item.Receiver_name}{"\n"} </Text>
                        <View style={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 20, padding: 15, borderColor: 'blue', flexDirection: 'row', }}>
                            <Icon name="map-marker" color='#007aff' size={35} />
                            <Text style={{ margin: 10 }}>{this.props.route.params.item.starting_adresse}-->{this.props.route.params.item.destination_adresse}</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', flexDirection: 'column' }} >
                    <View style={{ backgroundColor: '#EFFBFB', flexDirection: 'column', flex: 1   ,marginRight:'3%'}}>
                    <Icon style={{   marginTop:'5%' , alignSelf:'center' }}  name="sticky-note-o" color='black' size={35} />
                    <Text  >Reclammer</Text>
                    </View>


                    </View>
                </View>
                <View style={{ flex: 3, width: "95%", alignSelf: 'center', borderWidth: 1, backgroundColor: 'white', borderColor: '#007aff' }} >
                    <View style={{ backgroundColor: 'white', justifyContent: 'space-around', flexDirection: 'row', }}>
                        
                      { this.props.route.params.item.status != 0 ?  <Overlay overlayStyle={{ width: '90%', height: '70%', borderRadius: 30, flexDirection: 'column' }}
                            isVisible={this.state.visible}
                            onBackdropPress={this.close}>
                                <View style={{ alignItems:'center',paddingTop:50 }}>
                            <QRCode   size={300} value={''.concat(this.props.route.params.item.id).concat(this.props.route.params.item.Client['0'].id).concat(this.props.route.params.item.DeliveryMan['0'].id)} />
                            </View>
                        </Overlay>: null}
                        { this.props.route.params.item.status != 0 ? 
                        <Text style={{ color: 'green', fontSize: 20, padding: 2, }} >Code Qr</Text>: null}
                        { this.props.route.params.item.status != 0 ? 
                        <Icon style={{ paddingRight: 12, paddingTop: 3 }} onPress={this.open} name="qrcode" color='black' size={45} /> : null}
                    </View>

                    <View style={{ backgroundColor: 'white', justifyContent: 'flex-start', flexDirection: 'row', }}>
                        <Icon style={{ padding: 2 }} name="calendar" color='#007aff' size={25} />
                        <Text style={{ color: '#007aff', padding: 2, }} >{this.props.route.params.item.date}</Text>
                    </View>
                    <Text style={{ color: '#007aff', marginLeft: 5, }} >description</Text>
                    <Text></Text>
                    <Text style={{ color: '#007aff', marginLeft: 5, }} >code comfirmation :   {this.props.route.params.item.id}{this.props.route.params.item.DeliveryMan['0'].id}{this.props.route.params.item.Client['0'].id}  </Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={3}
                        value={this.props.route.params.item.description}
                        style={{ height: '15%', borderWidth: 1, borderColor: '#007aff', margin: 5, backgroundColor: 'white' }}
                    />
                    <View style={{ backgroundColor: 'white', margin: 5, justifyContent: 'space-between', flexDirection: 'row', flex: 1, }}>
                        <Text style={{ color: '#007aff', marginLeft: 5, }} >temp estimé {"\n"}30 min  </Text>
                        <Text style={{ color: '#007aff', marginLeft: 5, }} >distance  estimé {"\n"}{this.props.route.params.item.Distance} km</Text>
                    </View>
                    <View style={{ backgroundColor: 'white', margin: 5, justifyContent: 'space-between', flexDirection: 'row', flex: 1, }}>
                        <Text style={{ color: '#007aff', marginLeft: 5, }} >frais de livraison {"< "}</Text>
                        <Text style={{ color: '#007aff', marginLeft: 5, }} >{this.props.route.params.item.cost} dt </Text>
                    </View>
                    <View style={{ backgroundColor: 'white', margin: 5, justifyContent: 'space-between', flexDirection: 'row', flex: 1, }}>
                        <Text style={{ color: '#007aff', marginLeft: 5, }} >num Tel {this.props.route.params.user.name}  {"\n"}{this.props.route.params.user.phone_number} </Text>
                        <Text style={{ color: '#007aff', marginLeft: 5, }} >num Tel {this.props.route.params.item.Receiver_name} {"\n"}{this.props.route.params.item.Receiver_num_Tel}</Text>
                    </View>
                    <View style={{ backgroundColor: 'white', margin: 5, justifyContent: 'space-between', flexDirection: 'row', flex: 1, }}>
                        <Text style={{ color: '#007aff', marginLeft: 5, }} >rapidté </Text>
                        <Icon style={{ padding: 10 }} name="car" color='#007aff' size={25} />

                    </View>

                </View>
            </View>
        );
    }
}
const mapStateToProps = state => {
    return { Parcels: state.parcel };
};
export default connect(mapStateToProps )(ParcelDetails);
