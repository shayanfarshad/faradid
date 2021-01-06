import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ImageBackground, StyleSheet, Image, TouchableOpacity as TO, Keyboard, TouchableWithoutFeedback as TWF } from 'react-native';
import * as Stl from '../../components/styles';
import Bg from '../../assets/img/bg.jpg';
import { H4, SubLine, P } from '../../components/typo'
import CurvedBox from '../../components/curvedBox';
import InputBox, { InputRow } from '../../components/Inputs/InputBox';
import Btn, { BtnRow } from '../../components/Buttons';
import CountDown from 'react-native-countdown-component';
import { Icon } from 'react-native-elements'
import AppAlert from '../../utils';
import AsyncStorage from '@react-native-community/async-storage'
import { getCaptcha, authorize, login } from './_login_srv';

function LoginScreen({ navigation }) {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    // const [publicKey, setPublicKey] = useState(null);


    function signin() {

        if (userName !== null && password !== null) {
            var data = new Object()
            data.userName = userName;
            data.password = password;
            login(data).then(res => {
                console.log('res login',res)
                if (res.status === 200) {
                    AsyncStorage.setItem('userToken', res.data.accessToken)
                    AsyncStorage.setItem('avatar',res.data.avatar)
                    navigation.replace('DrawerScreen')
                }
            }).catch(err => {
                console.log('err',err)
                AppAlert('err', 'اشتباه است')
            })
        } else {
            alert('نام کاربری یا رمز عبور اشتباه است')
        }

    }

    // function ConfirmCode(){
    //     if(verifCode !== ''){
//     login(mobile, verifCode).then(res => {
//         // console.log(res)
//         if (res.status === 200) {
//             AsyncStorage.setItem('userToken', res.data)
//             navigation.replace('DrawerScreen')
//         }
//     }).catch(err => {
//         AppAlert('err', err.response.data)
//     })
// }else {
    //         AppAlert('info', 'لطفا کد تایید را وارد کنید')
    //     }
    // }

    // const fetchCaptcha = ()=>{
    //     getCaptcha().then(res=>{
    //         if(res.status === 200){
    //             setCaptcha(res.data.image)
    //             setPublicKey(res.data.publicKey)
    //         }
    //     })
    // }


    return (
        <ImageBackground source={Bg} style={s.bgContainer} resizeMode="cover">
            <TWF onPress={Keyboard.dismiss}>
                <View style={s.container}>
                    <CurvedBox>
                        <H4>ورود به سامانه</H4>
                        <SubLine />

                        <>
                            <InputRow LeftIcon IconName="mobile" IconFamily="entypo" hint="نام کاربری خود را وارد کنید">
                                <InputBox
                                    placeholder="نام کاربری"
                                    value={userName}
                                    onChangeText={(num) => { setUserName(num) }}
                                />
                            </InputRow>
                            <InputRow LeftIcon IconName="ios-key" IconFamily="ionicon" hint="رمز عبور خود را وارد کنید">
                                <InputBox
                                    placeholder="رمز عبور"
                                    value={password}
                                    onChangeText={(code) => { setPassword(code) }}
                                />
                            </InputRow>

                            <BtnRow>
                                <Btn BtnStyle={{ backgroundColor: '#00073c' }} title="ورود" Primary TCenter onPress={() => signin()} />
                            </BtnRow>
                        </>

                    </CurvedBox>
                </View>
            </TWF>
        </ImageBackground>
    )
}

export default LoginScreen;


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
})