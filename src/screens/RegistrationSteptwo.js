import React, { Component } from 'react'; 
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { View, TextInput, StyleSheet, Image } from 'react-native';
import { Input, Button ,ThemeProvider} from 'react-native-elements';
import {InputText} from '../components/Shared';

const options = {
    title: 'ajouter une photo ',
    takePhotoButtonTitle: 'prendre une photo  ',
    chooseFromLibraryButtonTitle: 'Importer une photo',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
const theme = {
    Button: {
      titleStyle: {
        color: 'white',  
        alignSelf: 'center',
      },buttonStyle:{
        borderRadius:50,
        alignSelf: 'stretch',
        width:300,
        backgroundColor:'#007aff'
      } 
    },
  };
class RegistrationSteptwo extends Component {
    constructor() {
        super();
        this.state = {
            Image: null, fileName: {
                fileName: 'fileName'
            }, size: { fileSize: 0 }
        };
    }
     getImage = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

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
                const fileName = { fileName: response.fileName };
                const FileSize = { fileSize: response.fileSize };

                this.setState({
                    Image: source,
                    fileName: fileName,
                    size: FileSize
                });
            }
        }); 

    }
    render() {
        console.log(this.state.size['fileSize'])
        return (
            <View style={styles.container}>
                <InputText   
                    placeholder='Numero de Cin'  
                /><Input
                    disabled
                    inputContainerStyle={{borderBottomWidth: 0   }}
                    placeholder={this.state.fileName['fileName']}
                        containerStyle={{   borderWidth: 2, 
                        borderRadius: 20,
                        borderColor: '#007aff',
                        marginLeft: 5,
                        height:55,
                        marginRight: 5,
                        marginBottom: 15,
                        paddingLeft: 15,width:'97%',
                        backgroundColor: '#fff'}} 
                    rightIcon={
                        <Icon.Button
                            backgroundColor='white'
                            name='upload'
                            size={24}
                            color='red'
                            onPress={this.getImage}
                        />
                    }
                />
                <Image source={this.state.Image}
                    style={{ height: 150, width: 150  
                     }}
                />
                <View style={styles.btncontainer}>
               <ThemeProvider theme={theme}>   
                 <Button 
                       raised
                        title="Creer votre Compte"
                        loading={false}
                        onPress={() => console.log(this.props.route.params.ss)}
                    /></ThemeProvider>
                </View>
            </View>


        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1, paddingTop: Platform.OS === 'ios' ? 90 : 90,
        justifyContent: 'flex-start',
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
        width:'95%',
        backgroundColor: '#fff',
    }, btncontainer: {
        alignSelf: 'stretch',
        justifyContent: 'flex-end',
        alignItems: 'center',

    }, btnStyle: { 
         

    }
});
export default RegistrationSteptwo;
