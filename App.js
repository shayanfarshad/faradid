/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { Linking, Image, View, Alert, TouchableOpacity as TO, PermissionsAndroid,Text } from 'react-native';
import { P } from './components/typo';
import * as Stl from './components/styles';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './store/store';
import { Root } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
import Man from './assets/img/man.png'
import { NavigationContainer, useNavigation, NavigationAction } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import * as S from './components/styles'
import Logo from './assets/img/qlogo.png'

//routes
import IntroScreen from './screens/Intro';
// import RulesScreen from './screens/Rules';
import LoginScreen from './screens/Login';
import HomeScreen from './screens/Home';
import Ranking from './screens/Rank'
import ImagePicker from 'react-native-image-picker';

import AppAlert from './utils';
import GridPage from './screens/Home/sub/GridPage';
import { changeAvatar } from './screens/Home/_home_srv';
import Report from './screens/Report';
import DeviceInfo from 'react-native-device-info';
// import PushPole from 'pushpole-react-native'

//
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const navigationRef = React.createRef();


function DrawerScreen(props) {
  return (
    <Drawer.Navigator drawerPosition="right" drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Rank" component={Ranking} options={{ headerShown: false }} />
      <Drawer.Screen name="Report" component={Report} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}
const version = DeviceInfo.getVersion();
const options = {
  title: 'انتخاب تصویر پروفایل',
  // customButtons: [{name: 'delImg', title: 'حذف تصویر'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
const App = () => {
  console.disableYellowBox = true;
  // PushPole.initialize(true);
  console.log('version', version)
  return (
    <Root>
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            screenOptions={{
              headerTitleStyle: {
                fontFamily: Stl.font.fontFamily,
                fontWeight: 'normal',
              },
              // headerBackTitleStyle:{
              //   fontFamily: Stl.font.fontFamily,
              //   fontWeight: 'normal',
              // },
              headerBackTitle: 'بازگشت'
            }}
          >
            <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Grid" component={GridPage} options={{ headerTitle: 'گزارش', headerStyle: { backgroundColor: '#007bff' }, headerTitleStyle: { color: 'white' } }} />
            <Stack.Screen name="DrawerScreen" component={DrawerScreen} options={{ headerShown: false, title: '' }} />




          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </Root>
  );
};


export default App;

function CustomDrawerContent(props) {
  const navigation = useNavigation()
  const [userImage, setUserImage] = useState(null)
  useEffect(() => {
    AsyncStorage.getItem('avatar').then((res) => {
      setUserImage('data:image/jpeg;base64,' + res)
    })
  }, [])
  function picker() {

    console.log("You can use the camera");
    ImagePicker.showImagePicker(options, res => {
      if (res.didCancel) {
        // console.log('User cancelled image picker');
      } else if (res.error) {
        // console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        if (res.customButton === 'delImg') {
          console.log(res)
        }
        // console.log('User tapped custom button: ', res.customButton);
      } else {
        // const source = {uri: res.uri};
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + res.data };

        // temp.first = res.data
        //  var temp =  res.uri
        setUserImage(res.uri)
        var form = new FormData()
        form.append('file', {
          uri: Platform.OS === "android" ? res.path : res.path.replace("file://", ""),
          type: 'image/jpeg',
          name: res.fileName
        })
        // form.append('file',res.uri)
        console.log('file', form)
        changeAvatar(form).then((res) => console.log('res', res))
      }
      console.log('userImage', res)

    })
  }
  return (
    <DrawerContentScrollView {...props} style={{flex:1}}>
      {/* <DrawerItemList {...props} /> */}
      <View style={{ flexDirection: 'row-reverse', paddingHorizontal: 20, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#eee', marginBottom: 10, paddingBottom: 10 }}>
        <Image source={Logo} style={{ width: 50, height: 50 }} />
        <P style={{ maxWidth: 140, paddingRight: 10 }}>سامانه ارزیابی کیفیت اینترنت کشور</P>
      </View>
      <View style={{ paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
        <View>
          {userImage == null ? <Image source={require('./assets/img/man.png')} style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 5, borderColor: '#e3e3e3' }} /> : <Image source={{ uri: userImage }} resizeMode="cover" style={{ width: 100, height: 100, borderRadius: 50 }} />}

        </View>
        <View style={{ width: 100, flexDirection: 'row-reverse', justifyContent: 'space-around', alignItems: 'center', marginTop: -20 }}>
          <TO onPress={() => picker()} style={[S.editBtn]}>
            <Icon name='pen' type='font-awesome-5' color='#6e6e6e' size={18} />
          </TO>
          <TO style={[S.editBtn]}>
            <Icon name='trash-alt' type='font-awesome-5' solid color='#753835' size={18} />
          </TO>
        </View>

      </View>
      {/* <DrawerItem
          style={{flexDirection: 'row-reverse', right: 0}}
          labelStyle={[Stl.font,{lineHeight:20}]}
          label="مشخصات مدارس"
          onPress={() => {AppAlert('info', 'به زودی...')}}
      /> */}
      <DrawerItem
        style={{ flexDirection: 'row-reverse', right: 0 }}
        labelStyle={[Stl.font, { lineHeight: 20 }]}
        label="صفحه اصلی"
        onPress={() => { navigation.navigate('Home') }}
      />
      <DrawerItem
        style={{ flexDirection: 'row-reverse', right: 0 }}
        labelStyle={[Stl.font, { lineHeight: 20 }]}
        label="رنکینگ"
        onPress={() => { navigation.navigate('Rank') }}
      />
      <DrawerItem
        style={{ flexDirection: 'row-reverse', right: 0 }}
        labelStyle={[Stl.font, { lineHeight: 20 }]}
        label="گزارشات"
        onPress={() => { navigation.navigate('Report') }}
      />
      <DrawerItem
        style={{ flexDirection: 'row-reverse', right: 0 }}
        labelStyle={[Stl.font, { lineHeight: 20 }]}
        label="خروج"
        onPress={() => {
          Alert.alert(
            "خروج",
            "آیا از خروج از اپ مطمئن هستید؟",
            [
              {
                text: "انصراف",
                onPress: () => { },
                style: "cancel"
              },
              {
                text: "بله", onPress: () => {
                  AsyncStorage.clear();
                  navigation.replace('Login')
                }
              }
            ],
            { cancelable: false }
          );
        }}
      />
      <View>
        <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 12 }]}>نسخه {version}</Text>
      </View>
    </DrawerContentScrollView>
  );
}