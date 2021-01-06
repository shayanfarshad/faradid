'use strict';
import { Platform } from 'react-native'

var React = require('react-native');
var { StyleSheet } = React;

export const txtAl = Platform.select({
    ios: 'right',
    android: 'left'
});

module.exports = StyleSheet.create({
    font: {
        fontFamily: 'IRANSansWeb(FaNum)',
        textAlign: 'right'
    },
    h1: {
        fontSize: 24
    },
    h2: {
        fontSize: 22
    },
    h3: {
        fontSize: 20
    },
    h4: {
        fontSize: 18
    },
    h5: {
        fontSize: 16
    },
    Label: {
        fontSize: 12
    },
    Paragraph: {
        fontSize: 14
    },
    BgPrimary: {
        backgroundColor: '#007bff'
    },
    BgLight: {
        backgroundColor: '#fff'
    },
    BgSecondary: {
        backgroundColor: 'rgba(241,171,73,0.5)'
    },
    BgGray: {
        backgroundColor: '#919C9D'
    },
    BgGreen: {
        backgroundColor: '#36D631'
    },
    Primary: {
        color: '#919C9D'
    },
    Secondary: {
        color: 'rgba(241,171,73,0.5)'
    },
    Third: {
        color: '#0055FF'
    },
    Light: {
        color: '#676666'
    },
    editBtn: {
        // position: 'absolute',
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
        // zIndex : 2
    }
});