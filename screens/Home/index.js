import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, Dimensions, BackHandler, StatusBar, TouchableOpacity as TO, Switch, Linking, StyleSheet, RefreshControl } from 'react-native';
import { Tooltip, Text, Divider } from 'react-native-elements';
import Header from './sub/header';
import SchoolList from './sub/headList';
const wh = Dimensions.get('window').height;
import AppAlert from '../../utils';
import * as S from '../../components/Chart/styles'
import { getThinClients, getRaspberryTci, getRaspberryTic, getModems, getProblem, getModemExcelFile, getThinClientGrid, getTciGrid, getTicGrid, getModemGrid, getServiceActivity, getTicketIssue, getAllDeactiveService } from './_home_srv';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { setSchoolMainData, setSchoolModirData } from '../School/redux/actions';
import Chart from '../../components/Chart';
import { set } from 'react-native-reanimated';
import { Icon } from 'react-native-elements'
import { PieChart } from 'react-native-chart-kit';
import { Left, Spinner } from 'native-base';
// import * as S from '../../../components/Chart/styles'
import * as Stl from '../../components/styles'
import {
    setThinClientData, setRaspberryTciData, setRaspberryTicData, setModemsData, setThinGrid,
    setTciGrid,
    setTicGrid,

    setModemGrid
} from './redux/action';
import PushNotification from "react-native-push-notification"

import DeviceInfo from 'react-native-device-info';
import * as SignalR from '@microsoft/signalr'
import { saveDeviceInfo } from './_home_srv';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import AsyncStorage from '@react-native-community/async-storage';
// import RNFetchBlob, { PolyfillFileReader } from 'rn-fetch-blob'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { PermissionsAndroid, Alert } from "react-native";
// import { URL as URL2 } from 'react-native-url-polyfill';
import Svg from 'react-native-svg';
import moment from 'moment';

const height = Dimensions.get('window').height
const base = 'http://192.168.1.39/api';
function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}
const HomeScreen = ({ navigation, chart, setThinClientData, setRaspberryTciData, setRaspberryTicData, setModemsData, setThinGrid,
    setTciGrid,
    setTicGrid,
    setModemGrid }) => {
    console.disableYellowBox = true;
    const [macAdd, setMacAdd] = useState('')
    const [ipAdd, setIpAdd] = useState('')
    const [deviceType, setDeviceType] = useState()
    const [deviceUid, setDeviceUid] = useState('')

    const [refreshing, setRefreshing] = useState(false)
    const [data, setData] = useState([])
    const [thinClient, setThinClient] = useState([])
    const [thinActive, setThinActive] = useState('')
    const [thinRead, setThinRead] = useState('')
    const [thinRefuse, setThinRefuse] = useState([])
    const [thinTimeOut, setThinTimeOut] = useState([])
    const [thinLoad, setThinLoad] = useState(true)
    const [isThinPercent, setIsThinPercent] = useState(false)
    const [thinGrid, setThinClientGrid] = useState([])

    const [raspberryTci, setRaspberryTci] = useState([])
    const [tciActive, setTciActive] = useState()
    const [tciRefuse, setTciRefuse] = useState()
    const [tciTimeOut, setTciTimeOut] = useState()
    const [tciRead, setTciRead] = useState()
    const [tciLoad, setTciLoad] = useState(true)
    const [isTciPercent, setIsTciPercent] = useState(false)
    const [tciGrid, setRasTciGrid] = useState([])


    const [raspberryTic, setRaspberryTic] = useState([])
    const [ticActive, setTicActive] = useState()
    const [ticRefuse, setTicRefuse] = useState()
    const [ticTimeOut, setTicTimeOut] = useState()
    const [ticRead, setTicRead] = useState()
    const [ticLoad, setTicLoad] = useState(true)
    const [isTicPercent, setIsTicPercent] = useState(false)
    const [ticGrid, setRasTicGrid] = useState([])


    const [modems, setModems] = useState([])
    const [modemActive, setModemActive] = useState()
    const [poorConnection, setPoorConnection] = useState()
    const [thinUnavailable, setThinUnavailable] = useState()
    const [internetUnavailable, setInternetUnavailable] = useState()
    const [modemUnavailable, setModemUnavailable] = useState()
    const [modemLoad, setModemLoad] = useState(true)
    const [isModemPercent, setIsModemPercent] = useState(false)
    const [modemGrid, setModemsGrid] = useState([])

    const [serviceData, setServiceData] = useState({})
    const [ticketData, setTicketData] = useState({})
    const [problemData, setProblemData] = useState({})
    // const [totalService, setTotalService] = useState(null)
    // const [activeProgress, setActiveProgress] = useState(null)
    // const [activeNumber, setActiveNumber] = useState(null)
    // const [inActiveProgress, setInActiveProgress] = useState(null)
    // const [inActiveNumber, setInActiveNumber] = useState(null)
    // const [fixedProgress, setFixedProgress] = useState(null)
    // const [fixedNumber, setFixedNumber] = useState(null)
    // const [notFixedProgress, setNotFixedProgress] = useState(null)
    // const [notFixedNumber, setNotFixedNumber] = useState(null)
    // const [totalProblem, setTotalProblem] = useState(null)
    // const [totalTicket, setTotalTicket] = useState(null)
    // const [openTicket, setOpenTicket] = useState(null)
    // const [closeTicket, setCloseTicket] = useState(null)

    useEffect(() => {
        var token = 'Bearer ' + AsyncStorage.getItem('userToken');
        let connection = new SignalR.HubConnectionBuilder().withUrl(`http://shabakehafzar.net:5080/api/IoTHub`, { accessTokenFactory: () => token }).build();
        connection.keepAliveIntervalInMilliseconds = 30000;
        connection.serverTimeoutInMilliseconds = 100000;
        connection.on('IoTReceive', function (message) {
            // console.log('push message',message)
            //   PushNotificationIOS.requestPermissions();
            PushNotification.localNotification({
                //    /* iOS only properties */
                //     alertAction: "view", // (optional) default: view
                //     category: "", // (optional) default: empty string
                title: 'فرادید', // (optional)
                message: message, // (required)
                // playSound: true, // (optional) default: true
                // soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
                // number: 1, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
                // repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.

            });
        });

        connection.start().then(e => { console.log("ok") }).catch(err => console.log(err));
    }, [])

    function goToGrid(type,data) {
        navigation.navigate('Grid', {
            type: type,
            data: data
        })
        // console.log('type', type)
    }

    const onRefresh = React.useCallback(() => {
        var yesterday = Date.now() - 86400000;
        var end = moment(new Date(yesterday)).format('DD-MM-YYYY')
        var start = moment(new Date(yesterday - 604800000)).format('DD-MM-YYYY')
        setRefreshing(true);
        getServiceActivity(start, end).then((res) => {
            // console.log('service active',res)
            setServiceData(res.data)
            // setActiveProgress(res.data.activeServicePercent)
            // setInActiveProgress(res.data.inActiveServicePercent)
            // setActiveNumber(res.data.activeService)
            // setInActiveNumber(res.data.inActiveService)
            // setTotalService(res.data.totalService)
        })
        getProblem(start, end).then((res) => {
            setProblemData(res.data)
            // setFixedProgress(res.data.fixProblemPercent)
            // setFixedNumber(res.data.fixProblem)
            // setNotFixedNumber(res.data.hasProblem)
            // setNotFixedProgress(res.data.hasProblemPercent)
            // setTotalProblem(res.data.total)
        })
        getTicketIssue().then((res => {
            setTicketData(res.data)
            // setTotalTicket(res.data.totalIssue)
            // setOpenTicket(res.data.openIssue)
            // setCloseTicket(res.data.closeIssue)
        }))
        getClient()
        getTci()
        getTic()
        getModem()
        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            const backAction = () => {
                return true;
            };

            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );

            return () => backHandler.remove();
        });

        return unsubscribe;
    }, [navigation]);

    function getClient() {
        setThinLoad(true)
        getThinClients().then(res => {
            var newdata = []

            for (let i = 0; i < res.data.length - 1; i++) {
                var obj = {}
                var svg = {}
                svg.fill = res.data[i].color
                obj.label = res.data[i].label;
                obj.svg = svg;
                obj.value = res.data[i].value;
                obj.key = i;

                newdata.push(obj)
                setThinClient(newdata)


            }
            setThinLoad(false)
            setThinClientData(newdata)
            setThinActive((((res.data[3].value) / (res.data[4].value)) * 100).toPrecision(3))
            setThinRead((((res.data[0].value) / (res.data[4].value)) * 100).toPrecision(3))
            setThinRefuse((((res.data[2].value) / (res.data[4].value)) * 100).toPrecision(3))
            setThinTimeOut((((res.data[1].value) / (res.data[4].value)) * 100).toPrecision(3))
        })
    }
    function getTci() {
        setTciLoad(true)
        getRaspberryTci().then(res => {
            var newdata = []

            for (let i = 0; i < res.data.length - 1; i++) {
                var obj = {}
                var svg = {}
                svg.fill = res.data[i].color
                obj.label = res.data[i].label;
                obj.svg = svg;
                obj.value = res.data[i].value;
                obj.key = i;

                newdata.push(obj)
                setRaspberryTci(newdata)

            }
            setTciLoad(false)
            setRaspberryTciData(newdata)
            setTciActive((((res.data[3].value) / (res.data[4].value)) * 100).toPrecision(3))
            setTciRefuse((((res.data[1].value) / (res.data[4].value)) * 100).toPrecision(3))
            setTciRead((((res.data[2].value) / (res.data[4].value)) * 100).toPrecision(3))
            setTciTimeOut((((res.data[0].value) / (res.data[4].value)) * 100).toPrecision(3))
        })
    }

    function getTic() {
        setTicLoad(true)
        getRaspberryTic().then(res => {
            var newdata = []

            for (let i = 0; i < res.data.length - 1; i++) {
                var obj = {}
                var svg = {}
                svg.fill = res.data[i].color
                obj.label = res.data[i].label;
                obj.svg = svg;
                obj.value = res.data[i].value;
                obj.key = i;

                newdata.push(obj)
                setRaspberryTic(newdata)

            }
            setTicLoad(false)

            setRaspberryTicData(newdata)
            setTicActive((((res.data[3].value) / (res.data[4].value)) * 100).toPrecision(3))
            setTicRead((((res.data[2].value) / (res.data[4].value)) * 100).toPrecision(3))
            setTicRefuse((((res.data[1].value) / (res.data[4].value)) * 100).toPrecision(3))
            setTicTimeOut((((res.data[0].value) / (res.data[4].value)) * 100).toPrecision(3))
        })
    }

    function getModem() {
        setModemLoad(true)
        getModems().then(res => {
            var newdata = []

            for (let i = 0; i < res.data.length - 3; i++) {
                var obj = {}
                var svg = {}
                svg.fill = res.data[i].color
                obj.label = res.data[i].label;
                obj.svg = svg;
                obj.value = res.data[i].value;
                obj.key = i;

                newdata.push(obj)

                setModems(newdata)

            }
            setModemLoad(false)
            setModemsData(newdata)
            setPoorConnection((((res.data[5].value) / (res.data[8].value)) * 100).toPrecision(3))
            setThinUnavailable((((res.data[4].value) / (res.data[8].value)) * 100).toPrecision(3))
            setInternetUnavailable((((res.data[3].value) / (res.data[8].value)) * 100).toPrecision(3))
            setModemUnavailable((((res.data[2].value) / (res.data[8].value)) * 100).toPrecision(3))
            setModemActive((((res.data[0].value) / (res.data[8].value)) * 100).toPrecision(3))
        })
    }

    useEffect(() => {
        var yesterday = Date.now() - 86400000;
        var end = moment(new Date(yesterday)).format('DD-MM-YYYY')
        var start = moment(new Date(yesterday - 604800000)).format('DD-MM-YYYY')
        getServiceActivity(start, end).then((res) => {
            console.log('service active', res)
            setServiceData(res.data)
            // setActiveProgress(res.data.activeServicePercent)
            // setInActiveProgress(res.data.inActiveServicePercent)
            // setActiveNumber(res.data.activeService)
            // setInActiveNumber(res.data.inActiveService)
            // setTotalService(res.data.totalService)
        })
        getProblem(start, end).then((res) => {
            setProblemData(res.data)
            // setFixedProgress(res.data.fixProblemPercent)
            // setFixedNumber(res.data.fixProblem)
            // setNotFixedNumber(res.data.hasProblem)
            // setNotFixedProgress(res.data.hasProblemPercent)
            // setTotalProblem(res.data.total)
        })
        getTicketIssue().then((res => {
            setTicketData(res.data)
            // setTotalTicket(res.data.totalIssue)
            // setOpenTicket(res.data.openIssue)
            // setCloseTicket(res.data.closeIssue)
        }))
        getThinClientGrid().then((res) => {
            // console.log('thinGrid', res)
            setThinClientGrid(res.data)
            setThinGrid(res.data)
        })
        getTciGrid().then((res) => {
            // console.log('TciGrid', res)
            setRasTciGrid(res.data)
            setTciGrid(res.data)
        })
        getTicGrid().then((res) => {
            // console.log('TicGrid', res)
            setRasTicGrid(res.data)
            setTicGrid(res.data)
        })
        getModemGrid().then((res) => {
            // console.log('ModemGrid', res)
            setModemsGrid(res.data)
            setModemGrid(res.data)
        })
        getClient()
        getTci()
        getTic()
        getModem()
    }, []);

    function toggleSwitch(type) {
        switch (type) {
            case 'thin':
                setIsThinPercent(!isThinPercent)
                break;
            case 'tci':
                setIsTciPercent(!isTciPercent)

                break;
            case 'tic':
                setIsTicPercent(!isTicPercent)

                break;
            case 'modem':
                setIsModemPercent(!isModemPercent)

                break;
            default:
                break;
        }
        setIsThinPercent(!isThinPercent)
    }

    function showDeactive() {
        var end = moment(new Date()).format('DD-MM-YYYY')
        var start = moment(new Date().getTime() - 604800000).format('DD-MM-YYYY')
        // console.log('end',end)
        var data = new Object();
        data.cityId = -1
        data.enddate = end 
        data.providerId = -1
        data.requlatoryId = -1
        data.startdate = start
        data.stateId = -1
        data.techId = -1
        getAllDeactiveService(data).then(res => {
            goToGrid('deactive',res.data)
        })
    }
    return (
        <SafeAreaView>
            <StatusBar translucent backgroundColor="transparent" />
            <Header />
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <View style={styles.div}>
                    <Divider style={styles.divider} />
                    <View style={{ width: '25%', justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Text style={[Stl.font, Stl.txtAl, Stl.Third]}>گزارش کلی</Text>
                    </View>
                </View>
                <View style={[S.pieView, { width: '95%', marginHorizontal: '2.5%', height: height - 380, justifyContent: 'space-around' }]}>
                    <View>
                        <View style={styles.div}>
                            <Divider style={[styles.divider, { width: '65%' }]} />
                            <View style={{ width: '30%', justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Text style={[Stl.font, Stl.txtAl, Stl.Light, {
                                    fontSize: 12
                                }]}>وضعیت سرویس ها</Text>
                            </View>
                        </View>
                        <View style={styles.progressView}>
                            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 12 }]}>تعداد کل : </Text>
                                <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 12 }]}>{serviceData.totalService}</Text>
                            </View>
                            <View style={styles.circleProgress}>
                                {serviceData == null ? (<Spinner color='#007bff' />) : (<AnimatedCircularProgress
                                    size={70}
                                    width={5}
                                    fill={serviceData.activeServicePercent == null ? 0 : serviceData.activeServicePercent}
                                    duration={0}
                                    tintColor="#45b37c"
                                    onAnimationComplete={() => console.log('onAnimationComplete')}
                                    backgroundColor="#a7aaa9">
                                    {
                                        (fill) => (
                                            <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 12 }]}>
                                                {fill}%
                                            </Text>
                                        )
                                    }
                                </AnimatedCircularProgress>)}

                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 12 }]}>فعال</Text>
                                    <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 12 }]}>{serviceData.activeService}</Text>
                                </View>
                            </View>
                            <View style={styles.circleProgress}>
                                {serviceData == null ? (<Spinner color='#007bff' />) : (<AnimatedCircularProgress
                                    size={70}
                                    width={5}
                                    fill={serviceData.inActiveServicePercent == null ? 0 : serviceData.inActiveServicePercent}
                                    duration={0}
                                    tintColor="#dc3545"
                                    onAnimationComplete={() => console.log('onAnimationComplete')}
                                    backgroundColor="#a7aaa9">
                                    {
                                        (fill) => (
                                            <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 12 }]}>
                                                {fill}%
                                            </Text>
                                        )
                                    }
                                </AnimatedCircularProgress>)}

                                <TO onPress={showDeactive} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 12 }]}>غیرفعال</Text>
                                    <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 12 }]}>{serviceData.inActiveService}</Text>
                                </TO>
                            </View>
                        </View>

                    </View>
                    <View>
                        <View style={styles.div}>
                            <Divider style={[styles.divider, { width: '65%' }]} />
                            <View style={{ width: '30%', justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 12 }]}>گزارش مشکلات</Text>
                            </View>
                        </View>
                        <View style={styles.progressView}>
                            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 12 }]}>تعداد کل : </Text>
                                <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 12 }]}>{problemData.total}</Text>
                            </View>
                            <View style={styles.circleProgress}>
                                {problemData == null ? (<Spinner color='#007bff' />) : (<AnimatedCircularProgress
                                    size={70}
                                    width={5}
                                    fill={problemData.fixProblemPercent}
                                    duration={0}
                                    tintColor="#45b37c"
                                    onAnimationComplete={() => console.log('onAnimationComplete')}
                                    backgroundColor="#a7aaa9">
                                    {
                                        (fill) => (
                                            <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 12 }]}>
                                                {fill}%
                                            </Text>
                                        )
                                    }
                                </AnimatedCircularProgress>)}

                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 12 }]}>رفع شده</Text>
                                    <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 12 }]}>{problemData.fixProblem}</Text>
                                </View>
                            </View>
                            <View style={styles.circleProgress}>
                                {problemData == null ? (<Spinner color='#007bff' />) : (<AnimatedCircularProgress
                                    size={70}
                                    width={5}
                                    fill={problemData.hasProblemPercent}
                                    duration={0}
                                    tintColor="#dc3545"
                                    onAnimationComplete={() => console.log('onAnimationComplete')}
                                    backgroundColor="#a7aaa9">
                                    {
                                        (fill) => (
                                            <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 12 }]}>
                                                {fill}%
                                            </Text>
                                        )
                                    }
                                </AnimatedCircularProgress>)}

                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 12 }]}>رفع نشده</Text>
                                    <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 12 }]}>{problemData.hasProblem}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.div}>
                            <Divider style={[styles.divider, { width: '65%' }]} />
                            <View style={{ width: '30%', justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 12 }]}>گزارش تیکت ها</Text>
                            </View>
                        </View>
                        <View style={styles.progressView}>
                            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>

                                <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 12 }]}>تعداد کل : </Text>
                                <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 12 }]}>{ticketData.totalIssue}</Text>
                            </View>

                            <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 12 }]}>انجام شده</Text>
                                <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 12 }]}>{ticketData.closeIssue}</Text>
                            </View>


                            <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 12 }]}>درحال انجام</Text>
                                <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 12 }]}>{ticketData.openIssue}</Text>
                            </View>
                        </View>
                    </View>

                </View>
                <View style={styles.div}>
                    <Divider style={styles.divider} />
                    <View style={{ width: '25%', justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Text style={[Stl.font, Stl.txtAl, Stl.Third, { fontSize: 13 }]}>گزارش لحظه ای</Text>
                    </View>
                </View>
                <ScrollView horizontal={true} contentContainerStyle={{ flexDirection: 'row-reverse' }}  >
                    <View style={S.pieView}>
                        <View style={S.chart}>
                            <View style={S.chartOption}>
                                <TO style={S.chartOptionBtn}>
                                    <Icon name='ellipsis-v' type='font-awesome-5' size={18} />
                                </TO>
                                <TO onPress={getClient} style={S.chartOptionBtn}>
                                    <Icon name='sync-alt' type='font-awesome-5' size={18} />
                                </TO>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={isThinPercent ? "#007bff" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => toggleSwitch('thin')}
                                    value={isThinPercent}
                                />
                                <Text style={[Stl.font, Stl.txtAl, { fontSize: 12 }]}>{isThinPercent ? 'Number' : 'Percent'}</Text>
                            </View>
                            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Text style={[Stl.font, Stl.txtAl, { fontSize: 12 }]}>ThinClients</Text>
                            </View>

                        </View>
                        {thinLoad ? (<Spinner color='#054ff1' />) : (<View style={S.pieContent}>

                            <View style={{ width: 160, paddingRight: 10 }}>
                                <TO style={S.itemLabel}>
                                    <View style={[S.circle, { backgroundColor: '#FF2C56' }]}></View>
                                    <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 11 }]}>ReadOnly : {isThinPercent ? thinClient[0].value : thinRead + '%'}</Text>
                                </TO>
                                <TO style={S.itemLabel} onPress={() => goToGrid('thin/time')}>
                                    <View style={[S.circle, { backgroundColor: '#ffd600' }]}></View>
                                    <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 11 }]}>TimeOut : {isThinPercent ? thinClient[1].value : thinTimeOut + '%'}</Text>
                                </TO>
                                <TO style={S.itemLabel} onPress={() => goToGrid('thin/refuse')}>
                                    <View style={[S.circle, { backgroundColor: '#017AFF' }]}></View>
                                    <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 11 }]}>Refuse : {isThinPercent ? thinClient[2].value : thinRefuse + '%'}</Text>
                                </TO>
                                <TO style={S.itemLabel} onPress={() => goToGrid('thin/active')}>
                                    <View style={[S.circle, { backgroundColor: '#30C986' }]}></View>
                                    <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 11 }]}>Active : {isThinPercent ? thinClient[3].value : thinActive + '%'}</Text>
                                </TO>
                            </View>
                            <Chart data={thinClient} />

                        </View>)}

                    </View>

                    <View style={S.pieView}>
                        <View style={S.chart}>
                            <View style={S.chartOption}>
                                <TO style={S.chartOptionBtn}>
                                    <Icon name='ellipsis-v' type='font-awesome-5' size={18} />
                                </TO>
                                <TO onPress={getTci} style={S.chartOptionBtn}>
                                    <Icon name='sync-alt' type='font-awesome-5' size={18} />
                                </TO>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={isTciPercent ? "#007bff" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => toggleSwitch('tci')}
                                    value={isTciPercent}
                                />
                                <Text style={[Stl.font, Stl.txtAl, { fontSize: 12 }]}>{isTciPercent ? 'Number' : 'Percent'}</Text>
                            </View>
                            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Text style={[Stl.font, Stl.txtAl, { fontSize: 12 }]}>RaspberryTCIs</Text>
                            </View>

                        </View>
                        {tciLoad ? (<Spinner color='#054ff1' />) : (<View style={S.pieContent}>

                            <View style={{ width: 160, paddingRight: 10 }}>
                                <TO style={S.itemLabel} onPress={() => goToGrid('tci/read')}>
                                    <View style={[S.circle, { backgroundColor: '#FF2C56' }]}></View>
                                    <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 11 }]}>ReadOnly : {isTciPercent ? raspberryTci[2].value : tciRead + '%'} </Text>
                                </TO>
                                <TO style={S.itemLabel} onPress={() => goToGrid('tci/time')}>
                                    <View style={[S.circle, { backgroundColor: '#ffd600' }]}></View>
                                    <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 11 }]}>TimeOut : {isTciPercent ? raspberryTci[0].value : tciTimeOut + '%'} </Text>
                                </TO>
                                <TO style={S.itemLabel} onPress={() => goToGrid('tci/refuse')}>
                                    <View style={[S.circle, { backgroundColor: '#017AFF' }]}></View>
                                    <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 11 }]}>Refuse : {isTciPercent ? raspberryTci[1].value : tciRefuse + '%'} </Text>
                                </TO>
                                <TO style={S.itemLabel} onPress={() => goToGrid('tci/active')}>
                                    <View style={[S.circle, { backgroundColor: '#30C986' }]}></View>
                                    <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 11 }]}>Active : {isTciPercent ? raspberryTci[3].value : tciActive + '%'} </Text>
                                </TO>
                            </View>
                            <Chart data={raspberryTci} />
                        </View>)}
                    </View>
                    <View style={S.pieView}>
                        <View style={S.chart}>
                            <View style={S.chartOption}>
                                <TO style={S.chartOptionBtn}>
                                    <Icon name='ellipsis-v' type='font-awesome-5' size={18} />
                                </TO>
                                <TO onPress={getTic} style={S.chartOptionBtn}>
                                    <Icon name='sync-alt' type='font-awesome-5' size={18} />
                                </TO>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={isTicPercent ? "#007bff" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => toggleSwitch('tic')}
                                    value={isTicPercent}
                                />
                                <Text style={[Stl.font, Stl.txtAl, { fontSize: 12 }]}>{isTicPercent ? 'Number' : 'Percent'}</Text>
                            </View>
                            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Text style={[Stl.font, Stl.txtAl, { fontSize: 12 }]}>RaspberryTICs</Text>
                            </View>

                        </View>
                        {ticLoad ? (<Spinner color='#054ff1' />) : (<View style={S.pieContent}>

                            <View style={{ width: 160, paddingRight: 10 }}>
                                <TO style={S.itemLabel} onPress={() => goToGrid('tic/read')}>
                                    <View style={[S.circle, { backgroundColor: '#FF2C56' }]}></View>
                                    <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 11 }]}>ReadOnly : {isTicPercent ? raspberryTic[2].value : ticRead + '%'}</Text>
                                </TO>
                                <TO style={S.itemLabel} onPress={() => goToGrid('tic/time')}>
                                    <View style={[S.circle, { backgroundColor: '#ffd600' }]}></View>
                                    <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 11 }]}>TimeOut : {isTicPercent ? raspberryTic[0].value : ticTimeOut + '%'}</Text>
                                </TO>
                                <TO style={S.itemLabel} onPress={() => goToGrid('tic/refuse')}>
                                    <View style={[S.circle, { backgroundColor: '#017AFF' }]}></View>
                                    <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 11 }]}>Refuse : {isTicPercent ? raspberryTic[1].value : ticRefuse + '%'}</Text>
                                </TO>
                                <TO style={S.itemLabel} onPress={() => goToGrid('tic/active')}>
                                    <View style={[S.circle, { backgroundColor: '#30C986' }]}></View>
                                    <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 11 }]}>Active : {isTicPercent ? raspberryTic[3].value : ticActive + '%'}</Text>
                                </TO>
                            </View>
                            <Chart data={raspberryTic} />
                        </View>)}
                    </View>
                    <View style={S.pieView}>
                        <View style={S.chart}>
                            <View style={S.chartOption}>
                                <TO style={S.chartOptionBtn}>
                                    <Icon name='ellipsis-v' type='font-awesome-5' size={18} />
                                </TO>
                                <TO onPress={getModem} style={S.chartOptionBtn}>
                                    <Icon name='sync-alt' type='font-awesome-5' size={18} />
                                </TO>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={isModemPercent ? "#007bff" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => toggleSwitch('modem')}
                                    value={isModemPercent}
                                />
                                <Text style={[Stl.font, Stl.txtAl, { fontSize: 12 }]}>{isModemPercent ? 'Number' : 'Percent'}</Text>
                            </View>
                            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Text style={[Stl.font, Stl.txtAl, { fontSize: 12 }]}>Modems</Text>
                            </View>

                        </View>
                        {modemLoad ? (<Spinner color='#054ff1' />) : (<View style={S.pieContent}>

                            <View style={{ width: 190, paddingLeft: 5 }}>
                                <TO style={S.itemLabel} onPress={() => goToGrid('modem/poor')}>
                                    <View style={[S.circle, { backgroundColor: '#fc9003' }]}></View>
                                    <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 11 }]}>Internet PoorConnection : {isModemPercent ? modems[5].value : poorConnection + '%'}</Text>
                                </TO>
                                <TO style={S.itemLabel} onPress={() => goToGrid('modem/thinUn')}>
                                    <View style={[S.circle, { backgroundColor: '#7a0977' }]}></View>
                                    <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 11 }]}>ThinClient Unavailable : {isModemPercent ? modems[4].value : thinUnavailable + '%'}</Text>
                                </TO>
                                <TO style={S.itemLabel} onPress={() => goToGrid('modem/intUn')}>
                                    <View style={[S.circle, { backgroundColor: '#FF2C56' }]}></View>
                                    <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 11 }]}>Internet Unavailable : {isModemPercent ? modems[3].value : internetUnavailable + '%'}</Text>
                                </TO>
                                <TO style={S.itemLabel} onPress={() => goToGrid('modem/unavailable')}>
                                    <View style={[S.circle, { backgroundColor: '#ffd600' }]}></View>
                                    <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 11 }]}>Modem Unavailable : {isModemPercent ? modems[2].value : modemUnavailable + '%'}</Text>
                                </TO>
                                <TO style={S.itemLabel} onPress={() => goToGrid('modem/active')}>
                                    <View style={[S.circle, { backgroundColor: '#30C986' }]}></View>
                                    <Text style={[Stl.font, Stl.txtAl, Stl.Light, { fontSize: 11 }]}>Active : {isModemPercent ? modems[0].value : modemActive + '%'}</Text>
                                </TO>
                            </View>
                            <Chart data={modems} />
                        </View>)}
                    </View>
                </ScrollView>
            </ScrollView>
        </SafeAreaView >
    )
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setThinClientData
            , setRaspberryTciData
            , setRaspberryTicData
            , setModemsData,
            setThinGrid,
            setTciGrid,
            setTicGrid,
            setModemGrid,
        },
        dispatch,
    );
};

const mapStateToProps = state => {
    return {
        chart: state.chartHandle
    };
};


const styles = StyleSheet.create({
    div: {
        flexDirection: 'row',
        marginHorizontal: '2%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    divider: {
        backgroundColor: '#919C9D',
        width: '70%',
        marginHorizontal: '2.5%',
        height: 1
    },
    circleProgress: {
        flex: 0.4,
        flexDirection: 'row-reverse',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    progressView: {
        width: '95%',
        flexDirection: 'row-reverse',
        marginHorizontal: '2.5%'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
