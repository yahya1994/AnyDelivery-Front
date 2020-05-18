 

import { FlatList, Text, View, RefreshControl,TouchableOpacity, ActivityIndicator} from 'react-native';
import React, { Component } from 'react';
import Item from '../../components/DeliveryMan/Item';
import { Input, Overlay, ThemeProvider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import {    fetsh_DeliveryMan_Parcel} from '../../redux/actions';
import TakenParcel from '../../components/DeliveryMan/TakenParcel';

class TakenParcelList extends Component {
    state = {
        visible: false,Loading:true,status:'',
        refreshing:null,currentPage:1
     
    }
    OverlayExample = () => {
        this.setState({ visible: false });
    }
    toggleOverlay = () => {
        this.setState({ visible: true });
    };
  
    componentDidMount(){
          this.props.fetsh_DeliveryMan_Parcel(this.state.status,this.state.currentPage);
    }
    _refresh  =async ()=> {
        this.setState({ refreshing : true , currentPage:1 });
        await this.props.fetsh_DeliveryMan_Parcel(this.state.status,this.state.currentPage) 
      this.setState({refreshing : false })
   
    }
     LoadMore = ()=>{
         if (this.state.currentPage <this.props.Parcels.Last_page)
         {
          this.setState({currentPage : this.state.currentPage+1},
         ()=>{this.props.fetsh_DeliveryMan_Parcel(this.state.status,this.state.currentPage)}
            );
        } else{this.setState({Loading: false})}
     }
     renderFooter=()=>{
         return (
             this.state.Loading ?
             <View>
             <ActivityIndicator animating size='large'/>
             </View> :null);
     }
    render() {

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
                        <TouchableOpacity onPress={  ()=>{this.setState({currentPage:1},this.props.fetsh_DeliveryMan_Parcel(0,1))}} >
                            <Icon  name="circle" color='red' size={25} />
                            </TouchableOpacity  >
                            <Text>en attente </Text>

                            <TouchableOpacity onPress={  ()=>{this.setState({currentPage:1},this.props.fetsh_DeliveryMan_Parcel(2,this.state.currentPage))}}>
                            <Icon   style={{ paddingLeft: 15 }} name="circle" color='green' size={25} />
                            </TouchableOpacity  >
                            
                            <Text>livré </Text>
                            <TouchableOpacity  onPress={  ()=>{this.setState({currentPage:1},this.props.fetsh_DeliveryMan_Parcel(1,1))}} >
                            <Icon   style={{ paddingLeft: 15 }} name="circle" color='yellow' size={25} />
                            </TouchableOpacity  >
                           
                            <Text>en cours </Text>
                        </View>

                    </Overlay>
                </View>
                <FlatList
                    style={{ backgroundColor: '#EFFBFB', padding: 5 }}
                    data={this.props.Parcels.item}
                    renderItem={({ item }) => (
                        <TakenParcel nav={this.props.navigation} item={item} />
                    )}
                    keyExtractor={item => item.id.toString()}
                    refreshControl={
                        <RefreshControl refreshing = {this.state.refreshing}
                        onRefresh={this._refresh} />
                    }
              
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
export default connect(mapStateToProps, {    fetsh_DeliveryMan_Parcel })(TakenParcelList);
