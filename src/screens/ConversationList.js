import { FlatList, Text, View,   ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import ChatItem from '../components/ChatItem';
import { connect } from 'react-redux';
import { fetshConversation } from '../redux/actions';
import networkCheck from '../helpers/functions/networkCheck'; 

class ConversationList extends Component {
    componentDidMount() {
        networkCheck();
        this.props.fetshConversation();
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
                        
                        keyExtractor={item => item.user_id.toString()}
                    /> : <Text >Vos  N'avez pas des enciens convesation </Text>}
            </View>
        );
    }
}
const mapStateToProps = state => {
    return { chat: state.chat };
};
export default connect(mapStateToProps, { fetshConversation })(ConversationList);
