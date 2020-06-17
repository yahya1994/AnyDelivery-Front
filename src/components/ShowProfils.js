import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { parcelReady, ChoseParcel } from '../redux/actions';

class ShowProfils extends Component {
    chose = async () => {
        await this.props.ChoseParcel(this.props.item, this.props.profil.id);
        await this.props.close();
        this.props.refresh();
    }
    render() {

        return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 15 }}>
                <Image
                    source={require('../assets/img/me.jpg')}
                    style={{ borderRadius: 80, paddingTop: 20, height: '100%', width: '20%' }}  />
                <Text >{this.props.profil.name}</Text>
                <TouchableOpacity onPress={() => this.chose()}>
                    <Icon name="check-circle" color='green' size={35} />
                </TouchableOpacity>
            </View>


        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        marginTop: 10, borderRadius: 25,
        flexDirection: 'row',
        backgroundColor: 'white',
    }, VcontainerStyle: {
        borderColor: 'black',
        borderRadius: 15,
        marginTop: 15,
    },
    circle: {
        fontSize: 10,
        borderRadius: 100, margin: 3, paddingTop: 10,
        width: '13%', height: '10%'
    }
};
const mapStateToProps = state => {
    return { auth: state.auth };
};
export default connect(mapStateToProps, { parcelReady, ChoseParcel })(ShowProfils);
