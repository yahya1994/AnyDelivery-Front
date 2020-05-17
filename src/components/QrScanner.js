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

class QrScanner extends Component {
  onSuccess =async e => {
    let test = e.data == this.props.OperationID;
  await  this.props.QrCheck(test);
  this.props.close();
    console.log(test)
  };

  render() {
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
export default QrScanner;