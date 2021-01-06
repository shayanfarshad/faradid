import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../Home/sub/header';
// import moment from 'moment'
import { View, Text, StatusBar, SafeAreaView, ScrollView, Dimensions, TouchableOpacity as TO, StyleSheet, FlatList } from 'react-native'
import SelectBox from '../../components/Inputs/selectBox';
import { Overlay } from 'react-native-elements';
import PersianCalendarPicker from 'react-native-persian-calendar-picker';
import InputBox, { InputRow } from '../../components/Inputs/InputBox';
import { getAllStates, getAllTechnology, getRankingByState } from './_rank_srv';
// import * as S from '../../components/Chart/styles'
import * as Stl from '../../components/styles'
// import { BarChart, Grid, YAxis } from 'react-native-svg-charts'
// import { BarChart } from 'react-native-chart-kit'
// import { Text as TE } from 'react-native-svg'
// import * as scale from 'd3-scale'
// import { Fab, Button } from 'native-base';
import { Icon } from 'react-native-elements'
var moment = require('moment-jalaali')
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
const today = new Date(Date.now())
const todayDiff = today.getDay()-(-1)
const starter = new Date( today - todayDiff * 86400000)
const endPoint = new Date( starter.getTime() + (7-todayDiff)* 86400000)
// console.log('starter',starter)
const Ranking = ({ navigation }) => {
    const [categorey, setCategorey] = useState({ name: 'کاربران تجاری', id: 1 })
    const [date, setDate] = useState('')
    const [chartData, setChartData] = useState([])
    const [startDate, setStartDate] = useState(starter)
    const [endDate, setEndDate] = useState(endPoint)
    const [showStart, setShowStart] = useState('')
    const [showEnd, setShowEnd] = useState('')
    const [technology, setTechnology] = useState({ id: 1, name: "ADSL" })
    const [location, setLocation] = useState({ id: 6, name: "تهران", lat: 51.54, lng: 35.48 })
    const [isVisible, setIsVisible] = useState(true)
    const [selectedCategorey] = useState([
        { name: 'کاربران تجاری', id: 1 },
        { name: 'بازی', id: 2 },
        { name: 'تماس اینترنتی', id: 3 },
        { name: 'دانلود حجیم', id: 4 },
        { name: 'وبگردی', id: 5 },
        { name: 'دانلود', id: 6 },
        { name: 'آپلود', id: 7 }
    ])
    const [selectedTechnology, setSelectedTechnology] = useState([])
    const [selectedLocation, setSelectedLocation] = useState([])

    useEffect(() => {
        getAllStates().then((res) => {

            setSelectedLocation(res.data)
        })
        getAllTechnology().then((res) => {
            var newData = new Array();
            for(let i=0;i<res.data.length -2 ; i++){
                newData.push(res.data[i])
            }

            setSelectedTechnology(newData)
        })
    }, [])

    function onDateChange(date) {
        var mines = date._d.getDay() - (-1)
        if (mines < 7) {
            var start = new Date(date._d - mines * 86400000)

            // var startMiladi = moment(start).format('YYYY-MM-DD')
            setStartDate(start)
            // var startPersian = moment(start).format('jYYYY/jM/jD')
            // setShowStart(startPersian)
            var end = new Date(date._d - mines * 86400000 + 6 * 86400000)
            // var endMiladi = moment(end).format('YYYY-MM-DD')
            // var endPersian = moment(end).format('jYYYY/jM/jD')
            // setShowEnd(endPersian)
            setEndDate(end)

        } else if (mines === 7) {
            var start = new Date(date._d)
            //    var startMiladi = moment(start).format('YYYY-MM-DD')
            setStartDate(start)
            // console.log('start', date._d)
            // var startPersian = moment(start).format('jYYYY/jM/jD')
            // setShowStart(startPersian)
            var end = new Date(date._d.getTime() + (6 * 86400000))
            // console.log('end', end)
            // var endMiladi = moment(end).format('YYYY-MM-DD')
            // var endPersian = moment(end).format('jYYYY/jM/jD')
            // setShowEnd(endPersian)
            setEndDate(end)
        }

    }

    function searchFilter() {
        console.log('categorey.id', categorey.id)
        var date = moment(startDate).format('DD-MM-YYYY')
        console.log('date',date)
        getRankingByState(date, technology.id, location.id, categorey.id).then((res) => {
            // setChartData(res.data)
            console.log(res.data)
            var data = new Array()

            for (let i = 0; i < res.data.length; i++) {
                var item = new Object()
                item.value = res.data[i].emtiaz;
                item.label = res.data[i].operatorName;
                item.id = i;
                item.ranking = res.data[i].ranking;
                console.log('item', item)
                data.push(item)
            }

            setChartData(data)
        })
        setIsVisible(false)
    }

    function openModal() {
        setIsVisible(!isVisible)
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar translucent backgroundColor="transparent" />
            <Header />
            <Overlay
                isVisible={isVisible}
                // onBackdropPress={() => setIsVisible(false)}
                overlayStyle={{ width: 0.9*width, maxHeight: 0.9 * height }}
            >
                <ScrollView>
                    <SelectBox
                        current={categorey}
                        setCurrent={setCategorey}
                        items={selectedCategorey}
                        title='دسته بندی رنک'

                        NameSelector={"name"}
                    />
                    <SelectBox
                        current={location}
                        setCurrent={setLocation}
                        items={selectedLocation}
                        title='انتخاب موقعیت مکانی'

                        NameSelector={"name"}
                    />
                    <SelectBox
                        current={technology}
                        setCurrent={setTechnology}
                        items={selectedTechnology}
                        title='تکنولوژی'

                        NameSelector={"name"}
                    />
                    <InputRow label="تاریخ">
                        <InputBox
                            placeholder="تاریخ"
                            value={(startDate == '' ? 'شروع' : moment(startDate).format('jYYYY/jM/jD')) + ' تا ' + (endDate == '' ? 'پایان' : moment(endDate).format('jYYYY/jM/jD'))}
                            // editable={false}
                            // selection={false}
                            style={{ color: '#0055FF' }}

                        // onChangeText={(code) => { setSchoolCode(code) }}
                        />
                    </InputRow>
                    <PersianCalendarPicker
                        onDateChange={onDateChange}
                        isRTL
                        width={0.8*width}
                        allowRangeSelection
                        // minRangeDuration={7}
                        selectedStartDate={startDate}
                        selectedEndDate={endDate}
                        textStyle={{fontFamily: 'IRANSansWeb(FaNum)'}}
                        maxDate={Date.now()-1*86400000}
                    />
                    <TO onPress={searchFilter} style={styles.searchBtn}>
                        <Text style={[Stl.font, Stl.txtAl, { fontSize: 12, color: 'white' }]}>جستجو کن</Text>
                    </TO>
                </ScrollView>
            </Overlay>
            {chartData == [] ? (<Spinner />) : (
                <View style={{ backgroundColor: 'white', elevation: 3, flexDirection: 'column', paddingVertical: 16, justifyContent: 'flex-start' }}>
                    <FlatList
                        data={chartData}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ width: '100%', height: 20, flexDirection: 'row', marginBottom: 20, alignItems: 'flex-end', alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ width: '20%', height: 20, flexDirection: 'row', marginLeft: 10, justifyContent: 'center' }} >
                                        <Text style={[Stl.font, Stl.txtAl, { fontSize: 12, color: 'black' }]}>{item.label}</Text>
                                    </View>
                                    <View style={{ width: '80%' }}>
                                        <View style={{ backgroundColor:item.ranking == 1 ? '#28a745' : item.ranking == 2 ? '#ffc107' : '#dc3545', width: `${item.value-5}%`, height: 20, borderTopRightRadius: 10, borderBottomRightRadius: 10,paddingRight:20,justifyContent:'center' }}>
                                            <Text style={[Stl.font, Stl.txtAl, { fontSize: 10, color: 'white' }]}>{item.value}</Text>
                                        </View>
                                    </View>
                                </View>

                            )

                        }}
                    >

                    </FlatList>
                  
                </View>)}

            <TO onPress={openModal} style={styles.filter}>
                <Icon name='filter' type='font-awesome-5' color="white" />
            </TO>


        </View>
    )

}
// const chartConfig = {
//     backgroundGradientFrom: "#1E2923",
//     backgroundGradientFromOpacity: 0,
//     backgroundGradientTo: "#08130D",
//     backgroundGradientToOpacity: 0.5,
//     color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
//     strokeWidth: 2, // optional, default 3
//     barPercentage: 0.5,
//     useShadowColorFromDataset: false // optional
//   };
//   const
const styles = StyleSheet.create({
    searchBtn: {
        width: 100,
        height: 40,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0055FF',
        marginVertical: 5,
        marginHorizontal: 5
    },
    filter: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#007bff',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {

        },
        dispatch,
    );
};

const mapStateToProps = state => {
    return {
        chart: state.chartHandle
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
