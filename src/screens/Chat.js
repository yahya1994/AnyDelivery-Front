import React from 'react';
import Pusher from 'pusher-js/react-native';
import { View, Text, Button, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import networkCheck from '../helpers/functions/networkCheck';

class Chat extends React.Component {


    constructor() {
        super();
        this.state = {
            data: [],
            message: [
                {
                    _id: null,
                    text: null,
                    createdAt: null,
                    user: {
                        _id: null,
                        name: null,
                        avatar: null,
                    },
                },
            ],
            user: []
        };
    }

    onSend = (messages) => {
        // alert(JSON.stringify(messages['0'].text));
        //console.log('==================='+messages)
        this.setState(previousState => ({
            message: GiftedChat.append(previousState.message, messages)
        }))
    }
    Send = async (messages) => {
        axios.post('http://6e49c2d55f30.ngrok.io/api/message',
            { 
            content: messages['0'].text, 
            user_id: this.props.auth.user.id, 
            parcel_id: this.props.route.params.idReceiver 
            })
            .then((response) => {
                console.log('succes : ' + response)
                console.log('successssssssssssssssssssssssss : ')
            }) 
    }
    FetshMessages = async () => {
        const response = await axios.get(`http://6e49c2d55f30.ngrok.io/api/message?id=${this.props.route.params.idReceiver}`);
        try {
            console.log(response.data);
            for (let dd of response.data) {
                this.setState(prevState => ({
                    message: [...prevState.message, {
                        _id: dd.id,
                        text: dd.content,
                        createdAt: dd.created_at,
                        user: {
                            _id: dd.user_id,
                            name: 'React Native',
                            avatar: 'https://placeimg.com/140/140/any',
                        },
                    }]

                }))
            }
        }
        catch (err) {
            return console.log(err);
        }
    }
    componentDidMount() {
   networkCheck()
        this.FetshMessages();
        let rec = this.props.route.params.idReceiver;
        Pusher.logToConsole = true;
        var pusher = new Pusher('0c956035633c2f990d85', {
            cluster: 'eu', forceTLS: true
        });
        let this2 = this
        var channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function (data) {
           // alert(JSON.stringify(data));
            let mess = this2.state.message;
            /*   this2.setState({  message: mess})*/
          if (data.message.parcel_id === rec ){
            mess.push(data.message);
            this2.setState(prevState => ({
                message: [...prevState.message, {
                    _id: data.message.id,
                    text: data.message.content,
                    createdAt: new Date(),
                    user: {
                        _id: data.message.user_id,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                }]
            }))}else {null}
        });
    }
    render() {
        return (
            <GiftedChat
                messages={this.state.message}
                inverted={false}
                scrollToBottomOffset={0}
                scrollToBottom={true}
                showAvatarForEveryMessage={true}
                onSend={messages => this.Send(messages)}
                user={{
                    _id: this.props.auth.user.id,
                }}
            />
        );
    }

}

const mapStateToProps = state => {
    return { auth: state.auth };
};
export default connect(mapStateToProps)(Chat);

