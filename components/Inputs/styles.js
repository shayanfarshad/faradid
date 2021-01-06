'use strict';

var React = require('react-native');
import { Platform } from 'react-native'
var { StyleSheet } = React;
const leftRight = Platform.select({
    ios: 'right',
    android: 'right'
});

module.exports = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingLeft: 0,
        paddingVertical: 5,
    },
    inputTitle: {
        fontSize: 16,
        textAlign: 'right',
        paddingVertical: 0
    },
    inputLeftIcon: {
        fontSize: 14
    },
    InputRow: {
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        borderColor: '#D0CCE4',
        borderWidth: 1,
        backgroundColor: '#F8F8F8',
        borderRadius: 25,
        marginVertical: 5
    },
    SelectContainer: {
        paddingHorizontal: 15,
        paddingLeft: 0,
        paddingVertical: 5,
        borderColor: '#D0CCE4',
        borderWidth: 1,
        backgroundColor: '#F8F8F8',
        borderRadius: 25,
        marginVertical: 5,
    },
    SelectBoxRow: {
        flexDirection: 'row-reverse',
        // flex: 1,
        // backgroundColor:'white',
        // justifyContent:'center',
        paddingHorizontal: 10,
        paddingVertical: 2,
        alignItems: 'center'
    },
    SelecBoxTitle: {
        flex: 0.9,
    },
    SelectBoxIcon: {
        flex: 0.1,
    },
    ListItemStyle: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginVertical: 5,
        paddingVertical: 5,
        color: 'gray',
        paddingHorizontal: 2,
        borderBottomWidth: 0,
    },
    ActiveListItem: {
        backgroundColor: '#803b96',
        borderRadius: 10,
    },
    ActiveListItemTxt: {
        color: '#fff'
    },
    tagView: {
        backgroundColor: 'white',
        borderRadius: 15,
        paddingHorizontal: "3%",
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginLeft: 4,
        marginBottom: 5
        // width:'auto',
        // borderWidth:1,
    },
    ViewContainer: {
        width: '85%',
        flexWrap: 'wrap',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    deleteBtn: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        backgroundColor: 'white',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
