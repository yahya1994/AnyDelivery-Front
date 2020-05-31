import { FlatList, Text, View, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import ChatItem from '../components/ChatItem';
import { Input, Overlay, ThemeProvider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { parcelReady, fetshParcels } from '../redux/actions';
import axios from 'axios';
import networkCheck from '../helpers/functions/networkCheck';

class ConversationList extends Component {
    state = {
        visible: false, Loading: true, status: '',
        refreshing: null, currentPage: 1, data: []

    }
    FetshMessages = async () => {
        const response = await axios.get('http://6e49c2d55f30.ngrok.io/api/des');
        try {
              
            this.setState({ data: response.data })
        } catch (err) {
            return console.log(err);
        }
    }

   
    componentDidMount() {
   networkCheck()
        this.FetshMessages();
    }

    render() {
        console.log("***************")
         console.log(this.state.data['rec']);
        return (
            <View style={{ flex: 1, backgroundColor: '#EFFBFB' }}>
            
                    
                        
                       { this.state.data['rec'] != '' ? <FlatList
                            style={{ backgroundColor: '#EFFBFB', padding: 5 }}
                            data={this.state.data['rec']}
                            renderItem={({ item }) => (
                            <ChatItem  nav={this.props.navigation}  item={item} />
                            )}
                            keyExtractor={item => item.user_id.toString()}

                        /> : <Text >Vos  N'avez pas des enciens convesation </Text>}
                 

            </View>
        );
    }
}
const mapStateToProps = state => {
    return { Parcels: state.parcel };
};
export default connect(mapStateToProps, { parcelReady, fetshParcels })(ConversationList);
