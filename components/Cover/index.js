import React from 'react'
import {View, StyleSheet} from 'react-native';
import * as Stl from '../styles';

export default function Cover(props){
    return(
        <View style={[s.Container, props.active ? s.active : {}, props.style ? props.style : {},
            props.fail === true ? s.fail : {}, props.success === true ? s.success : {}
        ]}>
            {props.children}
        </View>
    )
}

const s = StyleSheet.create({
    Container:{
        backgroundColor: '#ffffff',
        shadowColor: "rgba(0,0,0,0.12)",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 12,
        shadowRadius: 5.84,
        elevation: 5,
        borderRadius: 10,
        paddingVertical: 5,
        marginBottom: 10,
    },
    active:{
        borderWidth: 0.5,
        borderColor: Stl.Primary.color
    },
    fail:{
        borderWidth:1,
        // borderColor: Stl.red.color
    },
    success:{
        borderWidth: 1,
        // borderColor: Stl.green.color
    }
})