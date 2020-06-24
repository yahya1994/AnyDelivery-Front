import { FlatList, Text, View,  RefreshControl, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import ChatItem from '../../components/Shared/ChatItem';
import { connect } from 'react-redux';
import { fetshConversation } from '../../redux/actions';
import networkCheck from '../../helpers/functions/networkCheck'; 
import { NO_MESSAGE_ERROR } from '../../helpers/strings/strings';

class ConversationList extends Component {
    constructor() {
        super();
        this.state = {
            refreshing: null, 

        }

    }
    componentDidMount() {
        networkCheck();
        this.props.fetshConversation();
    }
    _refresh = async () => {
        await  this.setState({refreshing: true},
            () => { this.props.fetshConversation() }
        );
        this.setState({ refreshing: false })
    }
    render() {
        return ( 
            <View style={{ flex: 1, backgroundColor: '#EFFBFB' }}>
                { this.props.chat.Loading ?
                <View style={{paddingTop:'5%'}}>
                    <ActivityIndicator animating size='large' />
                </View> : null}
                {this.props.chat.data['rec'] != '' ?
                    <FlatList
                    
                        style={{ backgroundColor: '#EFFBFB', padding: 5 }}
                        data={this.props.chat.data['rec']}
                        renderItem={({ item }) => (
                            <ChatItem nav={this.props.navigation} item={item} />
                        )}
                        refreshControl={
                            <RefreshControl refreshing={this.state.refreshing}
                                onRefresh={this._refresh} />
                        }    
                        keyExtractor={item => item.user_id.toString()}
                    /> : <Text >{NO_MESSAGE_ERROR} </Text>}
            </View>
        );
    }
}
const mapStateToProps = state => {
    return { chat: state.chat };
};
export default connect(mapStateToProps, { fetshConversation })(ConversationList);
