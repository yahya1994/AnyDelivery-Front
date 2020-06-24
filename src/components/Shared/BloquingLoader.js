import React, { Component } from 'react';
import { View, ActivityIndicator, TouchableOpacity } from 'react-native';

const BloquingLoader = ({ visible }) => {

    return (
        <ActivityIndicator style={{ height: '100%',backgroundColor: '#00000009',position:'absolute', zIndex: 1, width: '100%' }}
           animating size='large' />
    );
};

export { BloquingLoader };