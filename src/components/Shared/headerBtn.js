import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Button } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const HeaderBtn = () => {
    return (

        <View style={{ flex: 1, width: '40%', }}>
<Button title='dd'></Button>            
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'row', width: '100%', height: '100%'

    },
    textStyle: {
        color: '#fff',
        fontSize: 25,
        padding: 5,
    },
    btnStyle: {
        alignSelf: 'stretch',
        flex: 1, width: '100%'
    },
});
export default HeaderBtn;
