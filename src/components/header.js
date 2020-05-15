import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Button } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const Header = () => {
    return (

        <View style={{ flex: 1, width: '100%', }}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#30ACE4', '#007aff', '#30ACE4']}
                style={{ flex: 1 }} >

            </LinearGradient>
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
export default Header;
