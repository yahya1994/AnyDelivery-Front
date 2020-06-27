import React from 'react';
import Pusher from 'pusher-js/react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';
import { connect } from 'react-redux';
import networkCheck from '../../helpers/functions/networkCheck';
import { ANYDELIVERY_BASE_URL } from '../../helpers/constants/constants';
import Icon from 'react-native-vector-icons/FontAwesome';

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


componentWillUnmount(){
    var pusher = new Pusher('be69eb45b105d1920b80', {
        cluster: 'eu' , forceTLS: true
    }); 
    pusher.disconnect();
 
}

    Send = async (message) => {
     
        axios.post(ANYDELIVERY_BASE_URL + '/message',
            {
                content: message['0'].text,
                user_id: this.props.auth.user.id,
                parcel_id: this.props.route.params.idReceiver
            })
            .then((response) => {
                console.log('succes : ' + response)

            })
    }
    FetshMessages = async () => {
        const response = await axios.get(ANYDELIVERY_BASE_URL + `/message?id=${this.props.route.params.idReceiver}`);
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
        var pusher = new Pusher('be69eb45b105d1920b80', {
            cluster: 'eu', forceTLS: true
        });
        let this2 = this
        var channel = pusher.subscribe('my-channel');
        channel.bind('my-event1', function (data) {
            // alert(JSON.stringify(data));
            let mess = this2.state.message;
           if (data.message.parcel_id === rec) {
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
                }))
            } else { null }
        });
    }
    render() {
        return (
            <GiftedChat
                messages={this.state.message}
                inverted={false}
                scrollToBottomOffset={0}
                scrollToBottom={true}
                label={
                <Icon style={{ alignItems: 'center', alignSelf: 'center' }}
                        backgroundColor='white'
                        name='paper-plane'
                        size={25}
                        color='#007aff'
                     
                    />}
                showAvatarForEveryMessage={true}
                onSend={messages => this.Send(messages)
                }
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


