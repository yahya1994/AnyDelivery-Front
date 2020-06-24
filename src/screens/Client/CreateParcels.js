import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text ,Alert} from 'react-native';
import { Input, CheckBox, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import DatePicker from 'react-native-datepicker';
import GetAdresseFromMap from '../Shared/GetAdresseFromMap';
import { CreateParcel } from '../../redux/actions';
import { connect } from 'react-redux';
import {InputText} from '../../components/Shared';
import { getDistance } from 'geolib';
import   {   VALIDATION,DESTINATION_POINT, DATE,PICK_UP_POINT,FULL_NAME,PHONE_NUMBER ,ADRESSE}  from '../../helpers/strings/strings';
import { validateName, validateAdresse, validateNumTel, validateLocation,validateCost } from '../../helpers/functions/InputValidation';
import { BloquingLoader } from '../../components/Shared/BloquingLoader';

class CreateParcels extends Component {
    constructor() {
        super();
        this.state = {
            visible: false, checked: null,
            lat_Depart: 0, date: '', long_Depart: 0, name_Depart: '',disable:false,
            description: '', numTel_Depart: 0, adresse_Depart: ''
            , lat_Destination: 0, long_Destination: 0, errors: true,
            name_Receiver: '', name_Destination: '', numTel_Destination: "",
            adresse_Destination: '', frais: 0, distance: 0, data: {
                description: 'urgent',
                Receiver_name: 'selim',
                Receiver_num_Tel: '4454112',
                Distance: 44,
                date: "16-05-15",
                cost: 44,
                status: 0,
                starting_adresse: 'ksar hlel',
                destination_adresse: 'monastir',
                starting_longitude: 10.10,
                starting_latitude: 10.10,
                destination_longitude: 10.10,
                destination_latitude: 10.10
            }
        };
    }
    createParcel = () => {
        let data = {
            description: this.state.description,
            Receiver_name: this.state.name_Destination,
            Receiver_num_Tel: this.state.numTel_Destination,
            Distance: this.state.distance,
            date: this.state.date,
            cost: this.state.frais,
            status: 0,
            starting_adresse: this.state.adresse_Depart,
            destination_adresse: this.state.adresse_Destination,
            starting_longitude: this.state.long_Depart,
            starting_latitude: this.state.lat_Depart,
            destination_longitude: this.state.long_Destination,
            destination_latitude: this.state.lat_Destination
        }
        console.log(data);
        this.setState({disable:!this.state.disable})
        this.props.CreateParcel(data, this.props.navigation);
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
        console.log('ggggg' + this.state.lat_Depart, this.state.long_Depart)
        return (
            <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'column' }}>
                <ProgressSteps   >
                    <ProgressStep label={PICK_UP_POINT} nextBtnTextStyle={{ fontSize: 40 }}
                    
                     nextBtnDisabled={validateAdresse(this.state.adresse_Depart) || 
                        validateLocation(this.state.lat_Depart)  ||(this.state.date =='') == true }	    nextBtnText={<Icon style={{ alignItems: 'center', alignSelf: 'center' }}
                            backgroundColor='white'
                            name='chevron-circle-right'
                            size={50}
                        />} >
                        <View style={styles.container}>
                            <InputText style={styles.InputText}
                          
                                placeholder={FULL_NAME}
                                value={this.props.auth.user.name}
                                onChangeText={text =>
                                    this.setState({ name_Depart: (text) })} />
                            <InputText style={styles.InputText}
                                placeholder={PHONE_NUMBER}
                                value={'+216 ' + this.props.auth.user.phone_number}
                                onChangeText={value =>
                                    this.setState({ numTel_Depart: (value) })} />
                            <Input
                                disabled
                                errorStyle={{ color: 'red' }}
                                errorMessage={validateLocation(this.state.lat_Depart)}
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
                                } />
                            <InputText style={styles.InputText}
                                placeholder={ADRESSE}
                                errorMessage={validateAdresse(this.state.adresse_Depart)}
                                value={this.state.adresse_Depart}
                                onChangeText={text => this.setState({ adresse_Depart: (text) })} />
                            <DatePicker
                            
                                mode="date"
                                date={this.state.date}
                                placeholder={DATE}
                                format="YY-MM-DD"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                style={{
                                    borderWidth: 2, width: '90%',
                                    borderRadius: 20,
                                    borderColor: '#007aff',
                                    alignSelf: 'stretch',
                                    marginLeft: 5,
                                    marginRight: 5,
                                    marginBottom: 15,
                                    paddingLeft: 15, width: '97%',
                                    backgroundColor: '#fff'
                                }}
                                customStyles={{
                                    dateInput: {
                                        marginLeft: 1, borderColor: 'white'  }
                                }}
                                onDateChange={(date) => { this.setState({ date: date }) }} />
                            <Overlay
                                overlayStyle={{ width: '90%', height: '80%', flexDirection: 'column' }}
                                isVisible={this.state.visible}
                                onBackdropPress={this.OverlayExample}>
                                <GetAdresseFromMap close={this.OverlayExample} changeFunction={this.handleChange} />
                            </Overlay>
                        </View>
                    </ProgressStep>
                    <ProgressStep label={DESTINATION_POINT}
                      nextBtnDisabled={
                        validateAdresse(this.state.adresse_Destination)|| 
                        validateLocation(this.state.long_Destination) ||
                        validateName(this.state.name_Destination)||
                        validateNumTel(this.state.numTel_Destination)
                        == true }	
                        nextBtnTextStyle={{ fontSize: 40 }}
                        nextBtnText={<Icon style={{ alignItems: 'center', alignSelf: 'center' }}
                            backgroundColor='white'
                            name='chevron-circle-right'
                            size={50} />}
                        previousBtnTextStyle={{ fontSize: 40 }}
                        previousBtnText={<Icon style={{ alignItems: 'center', alignSelf: 'center' }}
                            backgroundColor='white'
                            name='chevron-circle-left'
                            size={50} />}
                        onNext={() =>
                             this.setState({
                                distance: getDistance(
                                    { latitude: this.state.lat_Destination, longitude: this.state.long_Destination },
                                    { latitude: this.state.lat_Depart, longitude: this.state.long_Depart }
                                )/1000
                            })
                        } >
                        <View style={styles.container}>
                            <InputText style={styles.InputText}
                                placeholder={FULL_NAME}
                                errorMessage={validateName(this.state.name_Destination)}
                                value={this.state.name_Destination}
                                onChangeText={text => this.setState({ name_Destination: (text) })} />
                            <InputText style={styles.InputText}
                                placeholder={PHONE_NUMBER}
                                errorMessage={validateNumTel(this.state.numTel_Destination)}
                                value={this.state.numTel_Destination}
                                onChangeText={text => this.setState({ numTel_Destination: (text) })} />
                            <Input
                                disabled

                                errorMessage={validateLocation(this.state.long_Destination)}
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
                            <InputText style={styles.InputText}
                                placeholder={ADRESSE}
                                errorMessage={validateAdresse(this.state.adresse_Destination)}
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
                    <ProgressStep label={VALIDATION} finishBtnText={'valider'}
                        finishBtnTextStyle={{ color: "red" }}
                        previousBtnTextStyle={{ fontSize: 40 }}
                        previousBtnText={<Icon style={{ alignItems: 'center', alignSelf: 'center' }}
                            backgroundColor='white'
                            name='chevron-circle-left'
                            size={50} />}
        
                            nextBtnDisabled	={ validateCost(this.state.frais)|| this.state.disable||
                                validateName(this.state.description) ||(this.state.checked =!null) == false }
                            onSubmit={   () => this.createParcel()  }
                               
                                    >
                                        {this.props.parcel.Loading == true ? <BloquingLoader />:null}
                        <View style={styles.container}>
                            <InputText style={styles.InputText}
                            errorMessage={validateName(this.state.description)}
                                placeholder='Description..'
                                value={this.state.description}
                                onChangeText={text => this.setState({ description: (text) })} />
                            <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between', padding: 10 }}>
                                <Text style={{ color: 'black', paddingLeft: 15 }}> Rapidity </Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <CheckBox
                                        checked={this.state.checked == 0}
                                        onPress={() => this.setState({ checked: 0 })} />
                                    <Icon
                                        backgroundColor='white'
                                        name='bicycle'
                                        size={30}
                                        color='#007aff' /></View>
                                <View style={{ flexDirection: 'row' }}>
                                    <CheckBox
                                        checked={this.state.checked == 1}
                                        onPress={() => this.setState({ checked: 1 })} />
                                    <Icon
                                        backgroundColor='white'
                                        name='car'
                                        size={30}
                                        color='#007aff' />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch', padding: 10 }}>
                                <Text
                                    style={{ borderRadius: 20, padding: 15, borderColor: '#007aff', }}>Distance estimé</Text>
                                <TextInput 
                            
                                style={{ width: '40%', borderWidth: 2, borderRadius: 20, padding: 15, borderColor: '#007aff', }}    >
                                    {this.state.distance} Km </TextInput>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'stretch', padding: 10, }}>
                                <Text style={{
                                    borderRadius: 20,
                                    padding: 15,
                                    borderColor: '#007aff'
                                }}>frais de livraison inferieur a </Text>
                                <View style={{width:"40%"}}>
                                <InputText
                            errorMessage={validateCost(this.state.frais)}
                            style={{ width: '40%', borderWidth: 2, borderRadius: 20, padding: 15, borderColor: '#007aff', }}
                                    value={this.state.frais}
                                    onChangeText={text => this.setState({ frais: (parseInt(text)) })} />
                            </View>
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
    } ,
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
    }  
}
);
const mapStateToProps = state => {
    return { auth: state.auth,parcel:state.parcel };
};
export default connect(mapStateToProps, { CreateParcel })(CreateParcels);
