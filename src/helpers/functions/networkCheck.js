import * as React from 'react';

import NetInfo from "@react-native-community/netinfo";
import { Overlay } from 'react-native-elements';
import { Alert, View } from 'react-native';


const networkCheck = () => {
    return (
        NetInfo.fetch().then(state => {
            if (state.isConnected === false) {
                Alert.alert(
                    "Erreur",
                    "Aucune connexion internet",
                    [

                        { text: "OK", onPress: () => console.log("OK Pressed"), style: 'destructive' }
                    ],
                    { cancelable: false }
                );
            }
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
        })
   
  );
}
export default networkCheck;
