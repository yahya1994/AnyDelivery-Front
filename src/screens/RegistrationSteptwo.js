import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import { Input, Button, ThemeProvider } from 'react-native-elements';
import { InputText, Buttons } from '../components/Shared';
import networkCheck from '../helpers/functions/networkCheck';
import { Registration } from '../redux/actions';
import { connect } from 'react-redux';
import { validateNumCin, validateAdresse, validateImage } from '../helpers/functions/InputValidation';

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
            Image: null,
            type: '',
            Image2: null,
            type2: '',
            fileName2: { fileName: 'photo de CIN' },
            adresse: '',
            CIN: 0,
            fileName: { fileName: 'photo de CIN' },
            size: { fileSize: 0 },
            size2: { fileSize: 0 }
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
            uri: this.state.Image.uri.toString(),
            type: this.state.type.type,
            name: this.state.fileName["fileName"],
        };
        data.append('email', "monji@gmail.com");
        data.append('name', "monji");
        data.append('password', "monji");
        data.append('cin', 24242);
        data.append('phone_number', '4444');
        data.append('adresse', 'teboulba');
        data.append('identity_card_image', image);
        data.append('price_km', 0);
        data.append('rapidity', 0);
        data.append('Accepted', 1);
        let image2 = {
            uri: this.state.Image2.uri.toString(),
            type: this.state.type2.type,
            name: this.state.fileName2["fileName"],
        }
        if (this.props.route.params.role == 2) {
            data.append('driver_license_image', image2);
            data.append('role', 2);
        } else {
            data.append('role', 1);
        }
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
        console.log(image2);
        console.log(this.state.Image.uri)
        console.log(this.state.Image2.uri)
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
                    type: type,
                });
            }
        });

    }
    getImage2 = () => {
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
                    Image2: source,
                    fileName2: fileName,
                    size2: FileSize,
                    type2: type,
                });
            }
        });
    }
    
  
    render() {
        console.log(this.state.size['fileSize'])
        return (
            <View style={styles.container}>
                <InputText placeholder='adresse' onChangeText={text =>
                    this.setState({ adresse: (text) })}
                    errorMessage={validateAdresse(this.state.adresse)}
                />
                <InputText placeholder='Numero de Cin' onChangeText={text =>
                    this.setState({ CIN: (parseInt(text)) })}
                    errorMessage={validateNumCin(this.state.CIN)}
                />
                <Input
                    errorMessage={validateImage(this.state.size['fileSize'])}
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
                        marginBottom: 5,
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
                {validateImage(this.state.size['fileSize']) == false ? <Image source={this.state.Image}
                    style={{
                        height: 120, width: 250, borderRadius: 20
                    }}
                /> : null}
                {this.props.route.params.role === 2 ? <Input
                    disabled
                    errorMessage={validateImage(this.state.size2['fileSize'])}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    placeholder={this.state.fileName2['fileName']}
                    containerStyle={{
                        borderWidth: 2,
                        borderRadius: 20,
                        borderColor: '#007aff',
                        marginLeft: 5,
                        height: 55,
                        marginRight: 5,
                        marginBottom: 5,
                        paddingLeft: 15, width: '97%',
                        backgroundColor: '#fff'
                    }}
                    rightIcon={
                        <Icon.Button
                            backgroundColor='white'
                            name='upload'
                            size={24}
                            color='red'
                            onPress={this.getImage2} />}
                /> : null}
              {validateImage(this.state.size2['fileSize']) == false ? <Image source={this.state.Image2}
                    style={{
                        height: 120, width: 250, borderRadius: 20
                    }}
                /> : null}
                <Buttons
                    disabled={validateNumCin || validateAdresse || validateImage}
                    width='80%'
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
        flex: 1, paddingTop: Platform.OS === 'ios' ? 90 : '15%',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white'
    }, InputContainer: {
        width: '100%'
    },
});
const mapStateToProps = state => {
    return { auth: state.auth };
};
export default connect(mapStateToProps, { Registration })(RegistrationSteptwo);
