import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ImageBackground, StyleSheet, Image } from 'react-native';
import * as Progress from 'react-native-progress';
import { H4 } from '../../components/typo'
// import {getSchoolsList} from '../Home/_home_srv';
import introLogo from '../../assets/img/qlogo.png'
import Bg from '../../assets/img/bg.jpg';
import AsyncStorage from '@react-native-community/async-storage';
import { authorize } from '../Login/_login_srv';
import AppAlert from '../../utils';

function IntroScreen({ navigation }) {
    const [state, setState] = useState(0)
    useEffect(() => {
        if (state !== 1) {
            setTimeout(() => {
                setState(state + 0.25)
            }, 1000);
        } else {
            AsyncStorage.getItem('userToken').then((token) => {
                if (token == null) {
                    console.log('value', token)
                    setTimeout(() => {
                        navigation.replace('Login')
                    }, 2000);
                } else {
                    console.log('token', token)
                    authorize().then(res => {
                        if (res.status === 200) {
                            setTimeout(() => {
                                navigation.replace('DrawerScreen')
                            }, 2000);
                        } else {
                            AppAlert('alert', 'کاربری منقضی شده است دوباره وارد شوید')
                            setTimeout(() => {
                                navigation.replace('Login')
                            }, 2000);
                        }
                    })
                }
            })

        }
    }, [state]);
    return (
        <ImageBackground source={Bg} style={s.bgContainer} resizeMode="cover">
            <View style={s.container}>
                <View style={s.imgBg}>
                    <Image source={introLogo} resizeMode="contain" style={s.logo} />
                </View>
                <H4 style={{
                    color: '#fff', textShadowColor: 'rgba(0, 0, 0, 0.95)',
                    textShadowOffset: { width: -1, height: 5 },
                    textShadowRadius: 10
                }}>سامانه ارزشیابی کیفیت اینترنت کشور</H4>
                <Progress.Bar progress={state} width={200} style={s.progress} borderRadius={0} unfilledColor={'rgba(0,53,128,1)'} color={'white'} borderWidth={0} />
            </View>
        </ImageBackground>
    )
}

export default IntroScreen;


const s = StyleSheet.create({
    bgContainer: {
        width: '100%',
        height: '100%'
    },
    container: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center'
    },
    imgBg: {
        width: 200,
        height: 200,
        backgroundColor: 'rgba(255,255,255,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20000,
        marginBottom: 40
    },
    logo: {
        width: 200,
        height: 200
    },
    progress: {
        top: 40
    }
})