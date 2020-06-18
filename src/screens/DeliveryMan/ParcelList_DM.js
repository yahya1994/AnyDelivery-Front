

import { FlatList, Text, View, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import Item from '../../components/DeliveryMan/Item';
import { Input, Overlay, ThemeProvider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { ChoseParcel, fetshParcels_DeliveryMan } from '../../redux/actions';
import networkCheck from '../../helpers/functions/networkCheck';
import { SEARCH } from '../../helpers/strings/strings';

class ParcelsList_DM extends Component {
    state = {
        visible: false, Loading: true, status: '',
        refreshing: null, currentPage: 1,input:'',

    }
    OverlayExample = () => {
        this.setState({ visible: false });
    }
    toggleOverlay = () => {
        this.setState({ visible: true });
    };
    choseParcel = async (id) => {
        await this.props.ChoseParcel(id);
        this._refresh();
    }
    componentDidMount() {
        networkCheck()
        this.props.fetshParcels_DeliveryMan(this.state.status, this.state.currentPage);
    }
    _refresh = async () => {
        this.setState({ refreshing: true, currentPage: 1 });
        await this.props.fetshParcels_DeliveryMan(this.state.status, this.state.currentPage)
        this.setState({ refreshing: false })

    }
    LoadMore = () => {
        if (this.state.currentPage < this.props.Parcels.Last_page) {
            this.setState({ currentPage: this.state.currentPage + 1 },
                () => { this.props.fetshParcels_DeliveryMan(this.state.status, this.state.currentPage) }
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
    render() {

        return (
            <View style={{ flex: 1, backgroundColor: '#EFFBFB' }}>
                
                <View style={{ flexDirection: 'row', backgroundColor: '#EFFBFB' }}>
                    <Input
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
                            width: '95%',
                            backgroundColor: '#fff'
                        }}
                        rightIcon={
                            <Icon.Button
 
                            backgroundColor='white'
                            name='search'
                            size={22}
                            color='grey'
                            onPress={() =>
                                this.setState({ currentPage: 1 },
                    () => {   this.props.fetshParcels_DeliveryMan( this.state.input,1)}
                                 ) }  
                        />
                    }
                    /> 
                    
                </View>
                <FlatList
                    style={{ backgroundColor: '#EFFBFB', padding: 5 }}
                    data={this.props.Parcels.items}
                    renderItem={({ item }) => (
                        <Item nav={this.props.navigation} item={item} choseParcel={this.choseParcel} status={this.state.status} />
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
    return { Parcels: state.parcel };
};
export default connect(mapStateToProps, { ChoseParcel, fetshParcels_DeliveryMan })(ParcelsList_DM);
