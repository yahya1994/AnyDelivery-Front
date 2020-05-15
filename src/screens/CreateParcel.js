import React, { Component } from 'react';
import { View, TextInput, StyleSheet    ,Text} from 'react-native';
import { Input, CheckBox ,Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import GetAdresseFromMap from './GetAdresseFromMap'; 


const theme = {
    Button: {
      titleStyle: {
        color: 'white',  
        alignSelf: 'center',
      },buttonStyle:{
        borderRadius:50,
        width:150,
        backgroundColor:'#007aff'
      } 
    },
  };
class CreateParcel  extends Component {
    constructor() {
        super();
        this.state = {
            s: 'sssssss',lat:null,long:null  ,numTel:'',name:'',adresse:'',visible: false,
        };
    }
    handleChange= async( lat,long) =>{
     await   this.setState({ lat: lat,long : long}); 
     this.props.handleChange(this.state.lat,this.state.lat);
    }
    OverlayExample = () => {
        this.setState({ visible: false });
    }
    toggleOverlay = () => {
        this.setState({ visible: true });
    };
    handleChangeName =   (event) => {
         this.setState({ name: event.target.value }).then(()=>(this.props.handleChangeName(this.state.name)));
     
      }
      handleChangenumTel = (event) => {
        this.setState({ numTel: event.target.value });
      }
     handleChangeLat = (event) => {
        this.setState({ lat: event.target.value });
      }
      handleChangeLong = (event) => {
        this.setState({ long: event.target.value });
      } 
        render() {
       // this.props.parent(this.state.lat,this.state.lat,this.state.name,this.state.numTel,this.state.adresse,this.state.date);     
  
        return (
            <View style={styles.container}>
                       <TextInput style={styles.InputText}
                    placeholder='Nom et prenom'
                    value={this.state.name}
                    onChangeText= {text => this.setState({ name: (text) })    } 
                />
                <TextInput style={styles.InputText}
                    placeholder='Numéro de telephone'
                    value={this.state.numTel}
                    onChangeText={text => this.setState({ numTel: (text) })}
                />
                  <Input
                    disabled
                    placeholder={'localisation'} 
                    value={'lat= '+this.state.lat+','+'long ='+this.state.long}
                     inputContainerStyle={{borderBottomWidth: 0 ,   }}
                     containerStyle={{   borderWidth: 2, 
                        borderRadius: 20,
                        borderColor: '#007aff',
                        marginLeft: 5,
                        height:50,
                        marginRight: 5,
                        marginBottom: 15,
                        paddingLeft: 15,width:'97%',
                        backgroundColor: '#fff'}} 
                    rightIcon={
                        <Icon.Button
                            style={{alignItems:'center',alignSelf:'center'}}
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
                    value={this.state.adresse}
                    onChangeText={text => this.setState({ adresse: (text) })}
             

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
                        <GetAdresseFromMap close={this.OverlayExample} changeFunction={this.handleChange}/>
                    </Overlay>
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
        paddingLeft: 15,width:'97%',
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
export default CreateParcel;
