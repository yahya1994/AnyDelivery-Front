import { View, Text, TextInput } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { retrieveData,fetshParcels} from '../redux/actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

class ParcelDetails extends Component {

             componentDidMount(){
        // let aaa = await this.retrieveToken();
      // console.log('token  = '+aaa);
         this.props.fetshParcels();
    }
   
    
    render() {
         
        return (
            <View style={{  backgroundColor:'#EFFBFB', flexDirection: 'column', flex: 1 }} >
                <View style={{ backgroundColor: '#EFFBFB', flex: 1, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch', }} >
                    <Icon style={{ padding: 10 }} name="user" color='#007aff' size={65} />

                    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', flexDirection: 'column' }} >
                        <Text   >{this.props.route.params.user.name}-{this.props.route.params.item.Receiver_name}{"\n"} </Text>
                        <View style={{backgroundColor:'white', borderWidth: 1,borderRadius:20, padding: 15,borderColor:'blue', flexDirection: 'row', }}>
                            <Icon  name="map-marker" color='#007aff' size={35} />
                            <Text style={{ margin:10 }}>{this.props.route.params.item.starting_adresse}-->{this.props.route.params.item.destination_adresse}</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', flexDirection: 'column' }} >
                        <Icon style={{ padding: 10 }} name="times-circle" color='#FF0000' size={50} />
                        <Icon style={{ padding: 10 }} name="minus-circle" color='purple' size={50} />
                    </View>
                </View>
                <View style={{ flex: 3,  width: "95%", alignSelf:'center', borderWidth: 1,backgroundColor:'white', borderColor: '#007aff' }} >
                    <Icon style={{ padding: 10 }} name="calendar" color='#007aff' size={25} />
                    <Text style={{ color: '#007aff', marginLeft: 5, }} >description</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={5}
                        value={this.props.route.params.item.description}
                        style={{ height: '20%', borderWidth: 1, borderColor: '#007aff', margin: 5, backgroundColor: 'white' }}
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
export default connect(mapStateToProps, { retrieveData,fetshParcels })(ParcelDetails);
