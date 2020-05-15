import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { Input, CheckBox, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import DatePicker from 'react-native-datepicker';
import GetAdresseFromMap from './GetAdresseFromMap';
import { CreateParcel } from '../redux/actions';
import { connect } from 'react-redux';

class CreateParcels extends Component {
    constructor() {
        super();
        this.state = {
             visible: false,checked:null,
            lat_Depart: 0,date:'', long_Depart: 0, name_Depart: '', 
            description: '', numTel_Depart: 0, adresse_Depart: ''
            , lat_Destination: 0, long_Destination: 0, 
            name_Receiver: '',  name_Destination:'',numTel_Destination:"",
            adresse_Destination: '', frais: 0, distance: 0, data:  {
                description : 'urgent',
                Receiver_name : 'selim',
                Receiver_num_Tel : '4454112',
                Distance :44,
                date:"16-05-15",
                cost:44,
                status: 0,
                starting_adresse : 'ksar hlel',
                destination_adresse :'monastir',
                starting_longitude  :10.10,
                starting_latitude :10.10,
                destination_longitude: 10.10,
                destination_latitude:10.10
            } }; }
    createParcel=  ()=>{
        let data = {
         description : this.state.description,
         Receiver_name : this.state.name_Destination,
         Receiver_num_Tel :  this.state.numTel_Destination,
         Distance : this.state.distance,
         date: "20-05-20",
         cost: this.state.frais,
         status: 0,
         starting_adresse : this.state.adresse_Depart,
         destination_adresse :this.state.adresse_Destination,
         starting_longitude  : this.state.long_Depart,
         starting_latitude : this.state.lat_Depart,
         destination_longitude: this.state.lat_Destination,
         destination_latitude: this.state.long_Destination
     }
   
     this.props.CreateParcel(this.state.data,this.props.navigation);
 }
    handleChange = (lat, long) => {
        this.setState({ lat_Depart: lat, long_Depart: long });
    }
    handleChangeDestination = (lat, long) => {
        this.setState({ lat_Destination: lat, long_Destination: long });
    }
    OverlayExample = () => {
        this.setState({ visible: false });
    }
    toggleOverlay = () => {
        this.setState({ visible: true });
    };
   
    render() {


        return (
            <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'column' }}>
                <ProgressSteps  >
                    <ProgressStep label="¨Point de départ"       >

                        <View style={styles.container}>
                            <TextInput style={styles.InputText}
                                placeholder='Nom et prenom'
                                value={this.state.name_Depart}
                                onChangeText={text => 
                                    this.setState({ name_Depart: (text) })}
                            />
                            <TextInput style={styles.InputText}
                                placeholder='Numéro de telephone'
                                value={this.state.numTel_Depart}
                                onChangeText={value =>
                                     this.setState({ numTel_Depart: (value) })}
                            />
                            <Input
                                disabled
                                placeholder={'localisation'}
                                value={'lat= ' + this.state.lat_Depart + ',' + 'long =' + this.state.long_Depart}
                                inputContainerStyle={{ borderBottomWidth: 0, }}
                                containerStyle={{
                                    borderWidth: 2,
                                    borderRadius: 20,
                                    borderColor: '#007aff',
                                    marginLeft: 5,
                                    height: 50,
                                    marginRight: 5,
                                    marginBottom: 15,
                                    paddingLeft: 15, width: '97%',
                                    backgroundColor: '#fff'
                                }}
                                rightIcon={
                                    <Icon.Button
                                        style={{ alignItems: 'center', alignSelf: 'center' }}
                                        backgroundColor='white'
                                        name='map-marker'
                                        size={28}
                                        color='blue'
                                        onPress={this.toggleOverlay}
                                    />
                                }
                            />
                            <TextInput style={styles.InputText}
                                placeholder='adresse'
                                value={this.state.adresse_Depart}
                                onChangeText={text => this.setState({ adresse_Depart: (text) })}


                            />
                            <TextInput style={styles.InputText}
                                placeholder='date'
                                value={this.state.date}
                                onChangeText={text => this.setState({ date: (text) })}

                            />
                            <Overlay
                                overlayStyle={{ width: '90%', height: '80%', flexDirection: 'column' }}
                                isVisible={this.state.visible}
                                onBackdropPress={this.OverlayExample}>
                                <GetAdresseFromMap close={this.OverlayExample} changeFunction={this.handleChange} />
                            </Overlay>
                        </View>
                    </ProgressStep>
                    <ProgressStep label="Point de destination">
                        <View style={styles.container}>
                            <TextInput style={styles.InputText}
                                placeholder='Nom et prenom'
                                value={this.state.name_Destination}
                                onChangeText={text => this.setState({ name_Destination: (text) })} />
                            <TextInput style={styles.InputText}
                                placeholder='Numéro de telephone'
                                value={this.state.numTel_Destination}
                                onChangeText={text => this.setState({ numTel_Destination: (text) })} />
                            <Input
                                disabled
                                placeholder={'localisation'}
                                value={'lat= ' + this.state.lat_Destination + ',' + 'long =' + this.state.long_Destination}
                                inputContainerStyle={{ borderBottomWidth: 0, }}
                                containerStyle={{
                                    borderWidth: 2,
                                    borderRadius: 20,
                                    borderColor: '#007aff',
                                    marginLeft: 5,
                                    height: 50,
                                    marginRight: 5,
                                    marginBottom: 15,
                                    paddingLeft: 15, width: '97%',
                                    backgroundColor: '#fff'
                                }}
                                rightIcon={
                                    <Icon.Button
                                        style={{ alignItems: 'center', alignSelf: 'center' }}
                                        backgroundColor='white'
                                        name='map-marker'
                                        size={28}
                                        color='blue'
                                        onPress={this.toggleOverlay} />} />
                            <TextInput style={styles.InputText}
                                placeholder='adresse'
                                value={this.state.adresse_Destination}
                                onChangeText={text => this.setState({ adresse_Destination: (text) })} />
                            <Overlay
                                overlayStyle={{ width: '90%', height: '80%', flexDirection: 'column' }}
                                isVisible={this.state.visible}
                                onBackdropPress={this.OverlayExample}>
                                <GetAdresseFromMap close={this.OverlayExample} changeFunction={this.handleChangeDestination} />
                            </Overlay>
                        </View>
                    </ProgressStep>
                    <ProgressStep label="validation" 
                     onSubmit={() =>this.createParcel()}>
                        <View style={styles.container}>
                            <TextInput style={styles.InputText}
                                placeholder='Description..'
                                value={this.state.description}
                                onChangeText={text => this.setState({ description: (text) })} />
                            <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between', padding: 10 }}>
                                <Text style={{ color: 'black', paddingLeft: 15 }}> Rapidity </Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <CheckBox 
                                     checked={this.state.checked ==0}
                                     onPress={() => this.setState({checked:0})}
                                    />
                                    <Icon
                                        backgroundColor='white'
                                        name='bicycle'
                                        size={30}
                                        color='#007aff' /></View>
                                <View style={{ flexDirection: 'row' }}>
                                    <CheckBox  
                                      checked={this.state.checked==1}
                                      onPress={() => this.setState({checked: 1})}
                                    />
                                    <Icon
                                        backgroundColor='white'
                                        name='car'
                                        size={30}
                                        color='#007aff' />
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch', padding: 10 }}>
                                <Text style={{ borderRadius: 20, padding: 15, borderColor: '#007aff', }}>Distance estimé</Text>
                                <TextInput
                                    style={{ width: '40%', borderWidth: 2, borderRadius: 20, padding: 15, borderColor: '#007aff', }}
                                    value={this.state.distance}
                                    onChangeText={text => this.setState({ distance: (parseInt(text)) })} />
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'stretch', padding: 10, }}>
                                <Text style={{
                                    borderRadius: 20,
                                    padding: 15,
                                    borderColor: '#007aff'
                                }}>frais de livraison inferieur a </Text>
                                <TextInput
                                    style={{ width: '40%', borderWidth: 2, borderRadius: 20, padding: 15, borderColor: '#007aff', }}
                                    value={this.state.frais}
                                    onChangeText={text => this.setState({ frais: (parseInt(text)) })} />

                            </View>
                        </View>
                    </ProgressStep>
                </ProgressSteps>
            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white'
    }, InputContainer: {
        width: '80%'
    },
    InputText: {
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#007aff',
        alignSelf: 'stretch',
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 15,
        paddingLeft: 15, width: '97%',
        backgroundColor: '#fff',
    }, btncontainer: {
        alignSelf: 'stretch',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        margin: 15
    }, btnStyle: {
        borderRadius: 50,
    }
}
);
export default connect(null, { CreateParcel  })(CreateParcels);
