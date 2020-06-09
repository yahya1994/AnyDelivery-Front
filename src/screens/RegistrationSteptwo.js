import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import { Input, Button, ThemeProvider } from 'react-native-elements';
import { InputText, Buttons } from '../components/Shared';
import networkCheck from '../helpers/functions/networkCheck';
import { Registration } from '../redux/actions';
import { connect } from 'react-redux';
const options = {
    title: 'ajouter une photo ',
    takePhotoButtonTitle: 'prendre une photo  ',
    chooseFromLibraryButtonTitle: 'Importer une photo',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

class RegistrationSteptwo extends Component {
    constructor() {
        super();
        this.state = {
            Image: null, file: null, adresse: '',type:'', CIN: 0, fileName: {
                fileName: 'photo de CIN'
            }, size: { fileSize: 0 }
        };
    }
    registration = () => {
        //  let src =  "file://".concat(this.state.file['uri']);
        /*        let data = {
                    email: this.props.route.params.email,
                    name: this.props.route.params.name,
                    password: this.props.route.params.password, 
                    role: 1,
                    cin:this.state.CIN,
                    phone_number:  this.props.route.params.phone_number,
                    adresse: this.state.adresse,
                  //  identity_card_image: 'file:///C:/Users/rbinfo/Desktop/livreur.jpg',
                    price_km: 0,
                    rapidity: 0,
                    Accepted: 1,
                }*/

        var data = new FormData();
    /*    data.append('identity_card_image', {
            uri:  this.state.file.uri.toString() ,
            type: 'image/jpeg',
            name: 'image.jpeg'
          })*/
        let image = {
            uri:   this.state.Image.uri.toString() ,
            type: this.state.type.type,
            name: this.state.fileName["fileName"],
        };
         data.append('email', "monji@gmail.com") ;
         data.append('name',  "monji");
         data.append('password', "monji");
         data.append('role', 1);
         data.append('cin', 24242);
         data.append('phone_number', '4444');
         data.append('adresse', 'teboulba');
         data.append('identity_card_image', image);
         data.append('price_km', 0);
         data.append('rapidity', 0);
         data.append('Accepted',1);

       /* let name = "monji";
        let password = "monji";
        let role = '1';
        let cin = 124242;
        let phone_number = '4444';
        let adresse = 'teboulba';
        let identity_card_image = data;
        let price_km = 0;
        let rapidity = 0;
        let Accepted = '1';*/
        console.log(image);
        console.log (this.state.Image.uri)
       this.props.Registration(data, this.props.navigation);
    }
    componentDidMount() {
        networkCheck()
    }
    getImage = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response.type);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.takePhotoButtonTitle) {
                console.log('User tapped custom button: ', response.takePhotoButtonTitle);
            } else if (response.chooseFromLibraryButtonTitle) {
                console.log('chooseFromLibraryButtonTitle', response.chooseFromLibraryButtonTitle);
            } else {
                const source = { uri: response.uri };
                const file = { uri: response.path };
                const fileName = { fileName: response.fileName };
                const FileSize = { fileSize: response.fileSize };
                const type = { type: response.type };

                this.setState({
                    Image: source,
                    fileName: fileName,
                    size: FileSize,
                    type:type,
                    file: file
                });
            }
        });

    }
    render() {
        return (
            <View style={styles.container}>
                <InputText placeholder='adresse' onChangeText={text =>
                    this.setState({ adresse: (text) })} />
                <InputText placeholder='Numero de Cin' onChangeText={text =>
                    this.setState({ CIN: (parseInt(text)) })} />
                <Input
                    disabled
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    placeholder={this.state.fileName['fileName']}
                    containerStyle={{
                        borderWidth: 2,
                        borderRadius: 20,
                        borderColor: '#007aff',
                        marginLeft: 5,
                        height: 55,
                        marginRight: 5,
                        marginBottom: 15,
                        paddingLeft: 15, width: '97%',
                        backgroundColor: '#fff'
                    }}
                    rightIcon={
                        <Icon.Button
                            backgroundColor='white'
                            name='upload'
                            size={24}
                            color='red'
                            onPress={this.getImage} />}
                />
                <Image source={this.state.Image}
                    style={{
                        height: 150, width: 250
                    }}
                />
                <Buttons
                    width='70%'
                    title="Creer votre Compte"
                    loading={this.props.auth.loading}
                    onPress={() => this.registration()}
                />

            </View>


        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1, paddingTop: Platform.OS === 'ios' ? 90 : 90,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white'
    }, InputContainer: {
        width: '100%'
    }, TxTContainer: {
        width: 300,
        alignSelf: 'stretch',
    },
    InputText: {
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#007aff',
        alignSelf: 'stretch',
        marginLeft: 5,
        marginLeft: 5,
        marginBottom: 50,
        width: '95%',
        backgroundColor: '#fff',
    }, btncontainer: {
        alignSelf: 'stretch',
        justifyContent: 'flex-end',
        alignItems: 'center',

    }, btnStyle: {


    }
});
const mapStateToProps = state => {
    return { auth: state.auth };
};
export default connect(mapStateToProps, { Registration })(RegistrationSteptwo);
