import { View, Alert, TextInput } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Buttons,InputText} from '../../components/Shared';
import { CreateReport } from '../../redux/actions';
import {validateName } from '../../helpers/functions/InputValidation';
import LinearGradient from 'react-native-linear-gradient';
 
class Report extends Component {
    state = {
      description: '',title:'' 
    }
    CreateReport = (id) => {
        let data = {
            description: this.state.description,
            title: this.state.title,   }
        console.log('=='+data);
        if (data.description != '' || data.title != '' ) {
        this.props.CreateReport(id,data,this.props.auth.user.role, this.props.navigation);
        } else {
            Alert.alert(
                "erreur",
                "vérifer vos champs",
                [{ text: "OK",   cancelable: false }], 
                { cancelable: false });
        }
    }
    render() {
      
        console.log('fffffffffff'+this.props.route.params.ParcelId)
        return (
            <View style={{ backgroundColor: '#EFFBFB',paddingTop:'5%' , flexDirection: 'row', flex: 1 }} >
                <LinearGradient colors={['white', '#30ACE4', '#30ACE4', '#007aff']} style={{ flex: 1 }}>
              
                  <View style={{ height:'95%' ,justifyContent:'space-around',borderRadius:10, width: "95%", alignSelf: 'center', borderWidth: 1, backgroundColor: 'white', borderColor: '#007aff' }} >
                <InputText
                       
                        onChangeText={text => this.setState({  title: (text) })}
                    errorMessage={validateName(this.state.title)}
                        
                    />
                    <TextInput
                    errorMessage={validateName(this.state.description)}

                        multiline={true}
                        onChangeText={text => this.setState({ description: (text) })}
                        numberOfLines={8}
                        style={{ height: '60%', borderWidth: 2,borderRadius:30, borderColor: '#007aff', margin: 5, backgroundColor: 'white' }}
                    />
                   <Buttons width={'97%'} title='Créer' loading={this.props.Report.Loading} onPress={() => this.CreateReport(this.props.route.params.ParcelId)} />
                </View>
                </LinearGradient  >

            </View>
        );
    }
}
const mapStateToProps = state => {
    return { Report: state.Report ,auth:state.auth};
};
export default connect(mapStateToProps,{CreateReport})(Report);
