import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import { parcelReady, fetsh_DeliveryMan_Parcel } from '../redux/actions';
class QrScanner extends Component {
  onSuccess =async e => {
    let test = e.data == this.props.OperationID;
  await this.props.parcelReady(this.props.id,this.props.OperationID,e.data);
  await  this.props.QrCheck(test);
  await this.props.refresh();
  this.props.close();
   // console.log(test)
  }; 

  render() {
    console.log(this.props.id)
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        flashMode={RNCamera.Constants.FlashMode.off}
        containerStyle={{ flex: 1 }}
        cameraStyle={{ alignSelf: 'center', flex: 1 }}
        bottomContent={
          <TouchableOpacity onPress={()=>this.props.close()} style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>terminer </Text>
          </TouchableOpacity>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});
const mapStateToProps = state => {
  return { Parcels: state.parcel };
};
export default connect(mapStateToProps, {parcelReady, fetsh_DeliveryMan_Parcel })(QrScanner);
