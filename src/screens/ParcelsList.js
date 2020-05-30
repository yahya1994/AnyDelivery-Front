import { FlatList, Text, View, RefreshControl, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import React, { Component } from 'react';
import Item from '../components/Item';
import { Input, Overlay, ThemeProvider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { parcelReady, fetshParcels } from '../redux/actions';
import { InputText,Buttons } from '../components/Shared';

class ParcelsList extends Component {
    constructor() {
        super();
        this.state = {
            visible: false, Loading: true, status: '',
            refreshing: null, currentPage: 1

        }

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
        console.disableYellowBox = true;

        this.props.fetshParcels(this.state.status, this.state.currentPage);
    }
    _refresh = async () => {
        this.setState({ refreshing: true, currentPage: 1 });
        await this.props.fetshParcels(this.state.status, this.state.currentPage)
        this.setState({ refreshing: false })

    }
    LoadMore = () => {
        if (this.state.currentPage < this.props.Parcels.Last_page) {
            this.setState({ currentPage: this.state.currentPage + 1 },
                () => { this.props.fetshParcels(this.state.status, this.state.currentPage) }
            );
        } else { this.setState({ Loading: false }) }
    }
    renderFooter = () => {
        return (
            this.state.Loading ?
                <View>
                    <ActivityIndicator animating size='large' />
                </View> : null);
    }
    animation = new Animated.Value(0);

    toggleBtn = () => {
        const toValue = this.open ? 0 : 1;
        Animated.spring(this.animation, {
            toValue, friction: 5
        }).start();
        this.open = !this.open;
    }

            /*     <Animated.View style={[  ShowMessage]} >
               <Buttons title='+ create' width={"100%"} 
               onPress={() => this.props.navigation.navigate('create parcel')}/>
                </Animated.View>*/
    render() {
        const ShowMessage = {
            transform: [
                { scale: this.animation },
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0, 1], useNativeDriver: true,  
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
                        placeholder={'rechercher..'}
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
                        leftIcon={
                            <Icon.Button

                                backgroundColor='white'
                                name='search'
                                size={20}
                                color='grey'
                                onPress={() => this.props.navigation.push('getAdresseFromMap')}
                            />
                        }
                    /><Icon style={{ alignItems: 'center', alignSelf: 'center' }}
                        backgroundColor='white'
                        name='filter'
                        size={30}
                        color='blue'
                        onPress={this.toggleOverlay}
                    />
                    <Overlay
                        overlayStyle={{ width: '90%', height: '18%', borderRadius: 80, flexDirection: 'column' }}
                        isVisible={this.state.visible}
                        onBackdropPress={this.OverlayExample}>
                        <Text style={{ alignSelf: 'center' }}>filter selon le status :</Text>
                        <View style={{ flex: 1, flexDirection: 'row', padding: 20, justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => { this.setState({ currentPage: 1 }, this.props.fetshParcels(0, 1)) }} >
                                <Icon name="circle" color='red' size={25} />
                            </TouchableOpacity  >
                            <Text>en attente </Text>

                            <TouchableOpacity onPress={() => { this.setState({ currentPage: 1 }, this.props.fetshParcels(3, 1)) }}>
                                <Icon style={{ paddingLeft: 15 }} name="circle" color='green' size={25} />
                            </TouchableOpacity  >

                            <Text>livré </Text>
                            <TouchableOpacity onPress={() => { this.setState({ currentPage: 1 }, this.props.fetshParcels(1, 1)) }} >

                                <Icon style={{ paddingLeft: 15 }} name="circle" color='yellow' size={25} />

                            </TouchableOpacity  >

                            <Text>en cours </Text>
                        </View>

                    </Overlay>
                </View>
                <FlatList
                    style={{ backgroundColor: '#EFFBFB', padding: 5 }}
                    data={this.props.Parcels.items}
                    renderItem={({ item }) => (
                        <Item nav={this.props.navigation} item={item} refresh={this._refresh} />
                    )}
                    keyExtractor={item => item.id.toString()}
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing}
                            onRefresh={this._refresh} />
                    }

                    ListFooterComponent={this.renderFooter}
                    onEndReached={this.LoadMore}
                />

              
              
            <TouchableOpacity style={styles.InputText} onPress={this.toggleBtn}>
                <Animated.View style={[rotation]} >
                    <Icon name='plus-circle' color='#DA0505' size={70} />
                </Animated.View>
            </TouchableOpacity>
            
            <Animated.View     style={[ styles.InputText1, ShowMessage]} >
                <TouchableOpacity    
                onPress={() => this.props.navigation.navigate('create parcel')}> 
                    <InputText
                    disable={true}
                        value={" +  Créer une nouvelle colis "}
                        secureTextEntry={false} color={'red'} />
                 </TouchableOpacity>
                </Animated.View>

            </View >
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: '100%',  
        alignItems: 'center',zIndex:0
    },
    map: {
        height: "95%",
        width: "100%",
        paddingBottom: 5

    }, InputText1: {
        position: 'absolute', bottom: '1%', right: '15%',
        backgroundColor: 'red',borderRadius:50, height: '10%', width: '80%',
    },
    InputText: {
        position: 'absolute', zIndex:1,bottom: "3%", right: "5%",
        backgroundColor: 'white', borderRadius: 100,
    }
});
const mapStateToProps = state => {
    return { Parcels: state.parcel };
};
export default connect(mapStateToProps, { parcelReady, fetshParcels })(ParcelsList);
