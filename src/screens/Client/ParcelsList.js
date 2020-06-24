import { FlatList, Text, View, RefreshControl, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import React, { Component } from 'react';
import Item from '../../components/Client/Item';
import { Input, Overlay, ThemeProvider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { parcelReady, fetshParcels } from '../../redux/actions';
import { InputText, Buttons } from '../../components/Shared';
import networkCheck from '../../helpers/functions/networkCheck';
import { SEARCH ,WAITING, RESERVED , IN_PROGRESS, DELIVERED,CREATE_PARCEL } from '../../helpers/strings/strings';
import OneSignal from 'react-native-onesignal';
 
class ParcelsList extends Component {
    constructor() {
        super();
        this.state = {
            visible: false, Loading: true, status:  '',input:'',
            refreshing: null, currentPage: 1,

        }
        OneSignal.setExternalUserId("2");
        OneSignal.inFocusDisplaying(2);
        OneSignal.addEventListener('opened', this.ReceiveNotif );
    }
    ReceiveNotif=()=>{
        this.props.navigation.navigate('Home');
        this._refresh
    }
    parcelReady = async (id) => {
        await this.props.parcelReady(id);
        this._refresh();
    }
    OverlayExample = () => {
        this.setState({ visible: false });
    }
    toggleOverlay = () => {
        this.setState({ visible: true });
    };
 
    componentDidMount() {
  
        networkCheck()
        console.disableYellowBox = true;
        this.props.fetshParcels(this.state.status,this.state.input, this.state.currentPage);
    }
    _refresh = async () => {
        await  this.setState({refreshing: true, input:'',currentPage: 1,status:''},
            () => { this.props.fetshParcels('', '',this.state.currentPage) }
        );
        this.setState({ refreshing: false })
    }
    LoadMore = () => {
      
        if (this.state.currentPage < this.props.Parcels.Last_page) {
            this.setState({ currentPage: this.state.currentPage + 1 },
                () => { this.props.fetshParcels(this.state.status,this.state.input, this.state.currentPage) }
            );
        } else { this.setState({ Loading: false }) }
    }
    
    renderFooter = () => {
        return (
            this.props.Parcels.Loading ?
                <View>
                    <ActivityIndicator animating size='large' />
                </View> :this.props.Parcels.items.length == 0  ? <Text> vous n'avez aucun colis pour le moment  </Text>:null);
    }
    animation = new Animated.Value(0);
    toggleBtn = () => {
        const toValue = this.open ? 0 : 1;
        Animated.spring(this.animation, {
            toValue, friction: 5
        }).start();
        this.open = !this.open;
    }
 
    render() {
        //OneSignal.setExternalUserId(this.props.auth.user.id.toString());

        const ShowMessage = {
            transform: [
                { scale: this.animation },
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0, 1], 
                        duration: 300,
                        useNativeDriver: true,
                        outputRange: [0, -40]
                    })
                }
            ]
        }
        const rotation = {
            transform: [
                {
                    rotate: this.animation.interpolate({
                        inputRange: [0, 1],
                        useNativeDriver: true, duration: 300,
                        outputRange: ["0deg", "135deg"]
                    })
                }]
        };
        return (
            <View style={{ flex: 1, backgroundColor: '#EFFBFB' }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#EFFBFB' }}>
                    <Input
                 onSubmitEditing=   {() =>
                        this.setState({ currentPage: 1,status:'' },
            () => {   this.props.fetshParcels('', this.state.input,1)}
                         ) }  
                        placeholder={SEARCH}
                        onChangeText={text => this.setState({ input: (text) })}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
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
                        rightIcon={
                            <Icon.Button
 
                                backgroundColor='white'
                                name='search'
                                size={20}
                                color='grey'
                                onPress={() =>
                                    this.setState({ currentPage: 1,status:'' },
                        () => {   this.props.fetshParcels('', this.state.input,1)}
                                     ) }  
                            />
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
                        <Text style={{ alignSelf: 'center',paddingBottom:'5%' }}>filter selon le status :</Text>
                        <View style={{ flex: 1, flexDirection: 'column', padding: 3, }}>
                            <View style={{ flex: 1, flexDirection: 'row' , justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={() => { this.setState({currentPage: 1 , input:'', status:0,visible: false ,Loading:true }, this.props.fetshParcels(0,this.state.input,1)) }} >
                                    <Icon name="circle" color='red' size={25} />
                                </TouchableOpacity  >
                                <TouchableOpacity onPress={() => { this.setState({currentPage: 1 , input:'', status:3,visible: false ,Loading:true }, this.props.fetshParcels(3,this.state.input,1)) }}>
                                    <Icon style={{ paddingLeft: 15 }} name="circle" color='orange' size={25} />
                                </TouchableOpacity  >
                                <TouchableOpacity onPress={() => { this.setState({currentPage: 1 , input:'', status:1 ,visible: false ,Loading:true}, this.props.fetshParcels(1,this.state.input,1)) }} >
                                    <Icon style={{ paddingLeft: 15 }} name="circle" color='yellow' size={25} />
                                </TouchableOpacity  >
                                <TouchableOpacity onPress={() => { this.setState({currentPage: 1 , input:'', status:2,visible: false ,Loading:true}, this.props.fetshParcels(2,this.state.input,1)) }} >
                                    <Icon style={{ paddingLeft: 15 }} name="circle" color='green' size={25} />
                                </TouchableOpacity  >
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' , justifyContent: 'space-between' }}>
                                <Text>{WAITING} </Text>
                                <Text>{RESERVED}</Text>
                                <Text>{IN_PROGRESS} </Text>
                                     <Text>{DELIVERED}</Text>
                            </View>
                        </View>
                    </Overlay>
                </View>
                <FlatList
                    style={{ backgroundColor: '#EFFBFB', padding: 5 }}
                    data={this.props.Parcels.items}
                    renderItem={({ item }) => (
                        <Item nav={this.props.navigation} item={item} item_id={item.id.toString()} refresh={this._refresh} />
                    )}
                    keyExtractor={item => item.id.toString()}
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing}
                            onRefresh={this._refresh} />
                    }
                    ListFooterComponent={this.renderFooter}
                    onEndReached={this.LoadMore}
                    onEndReachedThreshold ={0.4}
                />
                <TouchableOpacity style={styles.InputText} onPress={this.toggleBtn}>
                    <Animated.View style={[rotation]} >
                        <Icon name='plus-circle' color='#DA0505' size={70} />
                    </Animated.View>
                </TouchableOpacity>
                <Animated.View style={[styles.InputText1, ShowMessage]} >
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('create parcel')}>
                        <InputText
                            disable={true}
                            value={CREATE_PARCEL}
                            secureTextEntry={false} color={'red'} />
                    </TouchableOpacity>
                </Animated.View>

            </View >
        );
    }
}
const styles = StyleSheet.create({
    
   InputText1: {
        position: 'absolute', bottom: '1%', right: '15%',
        backgroundColor: 'red', borderRadius: 50, height: '10%', width: '80%',
    },
    InputText: {
        position: 'absolute', zIndex: 1, bottom: "3%", right: "5%",
        backgroundColor: 'white', borderRadius: 100,
    }
});
const mapStateToProps = state => {
    return { Parcels: state.parcel,
        
        auth: state.auth };
};
export default connect(mapStateToProps, { parcelReady, fetshParcels })(ParcelsList);
