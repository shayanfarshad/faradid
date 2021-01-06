import React from 'react';
import {View,StyleSheet} from 'react-native';


export default function CurvedBox(props){
    return(
        <View style={[s.container, s.shadow, {...props.style}]}>
            {props.children}
        </View>
    )
}   

const s = StyleSheet.create({
    container:{
        borderRadius: 20,
        backgroundColor: '#fff',
        width: "80%",
        padding: 10,
        paddingHorizontal: 15
    },
    shadow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})