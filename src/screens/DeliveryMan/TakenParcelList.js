

import { FlatList, Text, View, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import Item from '../../components/DeliveryMan/Item';
import { Input, Overlay, ThemeProvider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { parcelDone, fetsh_DeliveryMan_Parcel } from '../../redux/actions';
import TakenParcel from '../../components/DeliveryMan/TakenParcel';
import networkCheck from '../../helpers/functions/networkCheck';
import { SEARCH, WAITING, RESERVED, IN_PROGRESS, DELIVERED,SEARCH_BY } from '../../helpers/strings/strings';
import OneSignal from 'react-native-onesignal';

class TakenParcelList extends Component {
    constructor() {
    super();
     
    this.state = {
        visible: false, Loading: true, status: '',
        refreshing: null, currentPage: 1,input:''

    }
    OneSignal.inFocusDisplaying(2);
    OneSignal.addEventListener('opened', this.ReceiveNotif );
}
ReceiveNotif = () => {
    this.props.navigation.navigate('UserParcel');
   this.props.fetsh_DeliveryMan_Parcel(this.state.status,this.state.input, this.state.currentPage);
}
    OverlayExample = () => {
        this.setState({ visible: false });
    }
    toggleOverlay = () => {
        this.setState({ visible: true });
    };
 
    componentDidMount() {
        networkCheck()
        this.props.fetsh_DeliveryMan_Parcel(this.state.status,this.state.input, this.state.currentPage);
    }
    _refresh =   () => {
           this.setState({refreshing: true, input:'',currentPage: 1,status:''},
        () => { this.props.fetsh_DeliveryMan_Parcel('', '',this.state.currentPage) }
    );
    this.setState({ refreshing: false })
    }
    LoadMore = () => {
        if (this.state.currentPage < this.props.Parcels.Last_page) {
            this.setState({ currentPage: this.state.currentPage + 1 },
                () => { this.props.fetsh_DeliveryMan_Parcel(this.state.status,this.state.input, this.state.currentPage) }
            );
        } else { this.setState({ Loading: false }) }
    }
    renderFooter = () => {
        return (
            this.props.Parcels.Loading ?
                <View>
                    <ActivityIndicator animating size='large' />
                    </View> : this.props.Parcels.item.length == 0 ? <Text> vous n'avez aucun colis pour le moment  </Text>:null);

    }
    render() {

        return (
            <View style={{ flex: 1, backgroundColor: '#EFFBFB' }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#EFFBFB' }}>
                    <Input
                        placeholder={SEARCH}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        onChangeText={text => this.setState({ input: (text) })}
                        containerStyle={{
                            borderWidth: 2,
                            borderRadius: 20,
                            borderColor: '#007aff',
                            marginLeft: 5,
                            height: 48,
                            marginRight: 5,
                            marginTop: 5,
                            width: '85%',
                            backgroundColor: '#fff'
                        }}
                        leftIcon={
                            <Icon.Button
 
                                backgroundColor='white'
                                name='search'
                                size={20}
                                color='grey'
                                onPress={() =>
                                    this.setState({ currentPage: 1,status:'' },
                        () => {   this.props.fetsh_DeliveryMan_Parcel('', this.state.input,1)}
                                     ) }  
                            />
                        }
                        rightIcon={
                            this.state.input != '' ?
                            <Icon.Button
 
                                backgroundColor='white'
                                name='close'
                                size={20}
                                color='grey'
                                onPress={() =>
                                    this.setState({ currentPage: 1,status:'',input:'' },
                        () => {   this.props.fetsh_DeliveryMan_Parcel('', this.state.input,1)}
                                     ) }  
                            />:null
                        }
                    /><Icon style={{ alignItems: 'center', alignSelf: 'center' }}
                        backgroundColor='white'
                        name='filter'
                        size={30}
                        color='#007aff'
                        onPress={this.toggleOverlay}
                    />
                    <Overlay
                        overlayStyle={{ width: '90%', height: '25%', borderRadius: 40, flexDirection: 'column' }}
                        isVisible={this.state.visible}
                        onBackdropPress={this.OverlayExample}>
                        <Text style={{ alignSelf: 'center',paddingBottom:'5%' }}>{SEARCH_BY}</Text>
                        <View style={{ flex: 1, flexDirection: 'column', padding: 3, }}>
                            <View style={{ flex: 1, flexDirection: 'row' , justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={() => { this.setState({currentPage: 1 , input:'', status:'' }, this.props.fetsh_DeliveryMan_Parcel('',this.state.input,1)) }} >
                                    <Icon name="circle" color='grey' size={25} />
                                </TouchableOpacity  >
                                <TouchableOpacity onPress={() => { this.setState({currentPage: 1 , input:'', status:3 }, this.props.fetsh_DeliveryMan_Parcel(3,this.state.input,1)) }}>
                                    <Icon style={{ paddingLeft: 15 }} name="circle" color='orange' size={25} />
                                </TouchableOpacity  >
                                <TouchableOpacity onPress={() => { this.setState({currentPage: 1 , input:'', status:1 }, this.props.fetsh_DeliveryMan_Parcel(1,this.state.input,1)) }} >
                                    <Icon style={{ paddingLeft: 15 }} name="circle" color='yellow' size={25} />
                                </TouchableOpacity  >
                                <TouchableOpacity onPress={() => { this.setState({currentPage: 1 , input:'', status:2}, this.props.fetsh_DeliveryMan_Parcel(2,this.state.input,1)) }} >
                                    <Icon style={{ paddingLeft: 15 }} name="circle" color='green' size={25} />
                                </TouchableOpacity  >
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' , justifyContent: 'space-between' }}>
                            <Text>
                                    tous{'\n'}
                                    {this.state.status === '' ? <Icon style={{ paddingLeft: 15 }} name="check-circle" color='#007aff' size={25} /> : null}

                                </Text>
                                <Text>{RESERVED}{'\n'}
                                    {this.state.status == 3 ? <Icon style={{ paddingLeft: 15 }} name="check-circle" color='#007aff' size={25} /> : null}

                                </Text>
                                <Text>{IN_PROGRESS} {'\n'}
                                    {this.state.status == 1 ? <Icon style={{ paddingLeft: 15 }} name="check-circle" color='#007aff' size={25} /> : null}
                                </Text>
                                <Text>{DELIVERED}{'\n'}
                                    {this.state.status == 2 ? <Icon style={{ paddingLeft: 15 }} name="check-circle" color='#007aff' size={25} /> : null}
                                </Text>
                            </View>
                        </View>
                    </Overlay>
                </View>
                <FlatList
                    style={{ backgroundColor: '#EFFBFB', padding: 5 }}
                    data={this.props.Parcels.item}
                    renderItem={({ item }) => (
                        <TakenParcel nav={this.props.navigation} refresh={this._refresh} item={item} />
                    )}
                    keyExtractor={item => item.id.toString()}
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing}
                            onRefresh={this._refresh} />
                    }
                    onEndReachedThreshold ={0.4}
                    ListFooterComponent={this.renderFooter}
                   onEndReached={this.LoadMore}
                />
            </View>
        );
    }
}
const mapStateToProps = state => {
    return { Parcels: state.parcel ,Auth:state.auth};
};
export default connect(mapStateToProps, { fetsh_DeliveryMan_Parcel })(TakenParcelList);
