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
import { getAllStates, getAllTechnology, getRankingByState, getAllParameter, getAllOperator, getReportByState } from './_report_srv';
// import * as S from '../../components/Chart/styles'
import * as Stl from '../../components/styles'
import { Container, Content, List, ListItem, Tabs, Tab } from 'native-base';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'
import { Circle, G, Line, Rect, Text as TE } from 'react-native-svg'
// import { BarChart } from 'react-native-chart-kit'
// import { Text as TE } from 'react-native-svg'
import * as shape from 'd3-shape'
// import { Fab, Button } from 'native-base';
import { Icon } from 'react-native-elements'
import MultiTag from '../../components/Inputs/multiTags';
// import { Decorator } from './component/Decorator'
var moment = require('moment-jalaali')
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
// console.log('starter',starter)

const Report = ({ navigation }) => {
    const [categorey, setCategorey] = useState({id: 14, name: "RTT"})
    const [myDate, setMyDate] = useState(['', ''])
    const [dateClick, setDateClick] = useState(true)
    const [chartData, setChartData] = useState([])
    const [technology, setTechnology] = useState([{id: 1, name: "ADSL"}])
    const [location, setLocation] = useState([{id: 6, name: "تهران", lat: 51.54, lng: 35.48}])
    const [isVisible, setIsVisible] = useState(true)
    // const [parameter, setParameter] = useState('')
    const [selectedTechnology, setSelectedTechnology] = useState([])
    const [selectedOperator, setSelectedOperator] = useState([])
    const [operator, setOperator] = useState([{code: 201, name: "آسیاتک", techId: 1, techName: "ADSL"}])
    const [selectedLocation, setSelectedLocation] = useState([])
    const [qoeData, setQoeData] = useState('')
    const [qosData, setQosData] = useState('')
    const [xAxisData, setXAxisData] = useState([])
    const [yAxisData, setYAxisData] = useState([])
    const [tooltipX, setToolTipX] = useState()
    const [tooltipY, setToolTipY] = useState()
    const [BColor, setBorderColor] = useState('')
    useEffect(() => {
        getAllStates().then((res) => {

            setSelectedLocation(res.data)
        })
        getAllTechnology().then((res) => {
            var newData = new Array();
            for (let i = 0; i < res.data.length - 2; i++) {
                newData.push(res.data[i])
            }

            setSelectedTechnology(newData)
        })
        getAllParameter().then((res) => {
            var qoe = new Array();
            var qos = new Array();
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].isQos == 0) {
                    qoe.push(res.data[i])

                } else {
                    qos.push(res.data[i])

                }
            }
            setQoeData(qoe)
            setQosData(qos)
        })
        getAllOperator().then((res) => {

            setSelectedOperator(res.data)
        })
    }, [])

    function onDateChange(date) {
        // var day = moment(date._d).format('jYYYY-jMM-jDD');
        var dateArr = myDate
        if (dateClick) {
            dateArr[0] = date
            setMyDate(dateArr)
            setDateClick(false)
        } else {
            dateArr[1] = date
            setMyDate(dateArr)
            setDateClick(true)
        }
        console.log(myDate)
    }

    function searchFilter() {

        var fromDate = moment(myDate[0]).format('YYYY-MM-DD-00:00:00')
        var toDate = moment(myDate[1]).format('YYYY-MM-DD-23:59:59')

        var operatorIds = new Array();
        var stateId = new Array();
        for (let i = 0; i < operator.length; i++) {
            operatorIds.push(operator[i].code)
        }
        for (let i = 0; i < location.length; i++) {
            stateId.push(location[i].id)
        }

        var data = {
            "stateIds": stateId.toString(),
            "fromDate": fromDate,
            "toDate": toDate,
            "providerIds": operatorIds.toString(),
            "paramIds": categorey.id.toString()
        }
        getReportByState(data).then((res) => {
            // setChartData(res.data)
            console.log('main data', res.data)
            var newArray = new Array()
            for (let i = 0; i < res.data.datasets.length; i++) {
                var obj = new Object()
                obj.data = res.data.datasets[i].data;
                obj.label = res.data.datasets[i].label;
                obj.backgroundColor = res.data.datasets[i].backgroundColor;
                obj.svg = { stroke: res.data.datasets[i].borderColor }
                var data = res.data.datasets[i].data;
                var BColor = res.data.datasets[i].borderColor
                newArray.push(obj)
                setBorderColor(BColor)
                setChartData(newArray)
                setYAxisData(data)
            }
            console.log('new', newArray)
            setXAxisData(res.data.labels)
            // setChartData(data)


        })
        setIsVisible(false)
    }

    function openModal() {
        setIsVisible(!isVisible)
    }
    // const Decorator = ({ x, y, data }) => {
    //     return data.map((value, index) => (
    //         <Circle
    //             key={index}
    //             onPress={() => { setToolTipX(index); setToolTipY(value) }}
    //             cx={x(index)}
    //             cy={y(value)}
    //             r={8}
    //             stroke={'rgb(134, 65, 244)'}
    //             fill={'white'}
    //         />
    //     ))
    // }

    // const Tooltip = ({ x, y, data }) => (
    //     <G
    //         x={x(tooltipX) - (75 / 2)}
    //         key={'tooltip'}
    //         onPress={() => console.log('tooltip clicked')}
    //     >
    //         <G y={90}>
    //             <Rect
    //                 height={40}
    //                 width={75}
    //                 stroke={'grey'}
    //                 fill={'white'}
    //                 ry={10}
    //                 rx={10}
    //             />
    //             <TE
    //                 x={75 / 2}
    //                 dy={20}
    //                 alignmentBaseline={'middle'}
    //                 textAnchor={'middle'}
    //                 stroke={BColor}
    //             >
    //                 {`${data[tooltipX]}`}
    //             </TE>
    //         </G>
    //         <G x={75 / 2}>
    //             <Line
    //                 y1={90 + 40}
    //                 y2={y(data[tooltipX])}
    //                 stroke={'grey'}
    //                 strokeWidth={2}
    //             />
    //             <Circle
    //                 cy={y(data[tooltipX])}
    //                 r={8}
    //                 stroke={'rgb(134, 65, 244)'}
    //                 strokeWidth={2}
    //                 fill={'white'}
    //             />
    //         </G>
    //     </G>)
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar translucent backgroundColor="transparent" />
            <Header />
            <Overlay
                isVisible={isVisible}
                // onBackdropPress={() => setIsVisible(false)}
                overlayStyle={{ width: 0.9 * width, maxHeight: 0.9 * height }}
            >
                <ScrollView>

                    <SelectBox
                        current={categorey}
                        setCurrent={setCategorey}
                        items={qosData}
                        title='شاخص'
                        column={2}
                        data1={qoeData}
                        data2={qosData}
                        tab1Name="QOE"
                        tab2Name="QOS"
                        NameSelector={"name"}
                    />
                    <MultiTag
                        current={location}
                        setCurrent={setLocation}
                        items={selectedLocation}
                        title='انتخاب موقعیت مکانی'
                        NameSelector={"name"}
                    />

                    <MultiTag
                        current={technology}
                        setCurrent={setTechnology}
                        items={selectedTechnology}
                        title='تکنولوژی'
                        NameSelector={"name"}
                    />
                    <MultiTag
                        current={operator}
                        setCurrent={setOperator}
                        items={selectedOperator}
                        title='اپراتور'
                        NameSelector={"name"}
                    />
                    <InputRow label="تاریخ">
                        <InputBox
                            placeholder="تاریخ"
                            value={(myDate[0] == '' ? 'شروع' : moment(myDate[0]).format('jYYYY-jMM-jDD') + ' تا ' + (myDate[1] == '' ? 'پایان' : moment(myDate[1]).format('jDD-jMM-jYYYY')))}
                            // editable={false}
                            // selection={false}
                            style={{ color: '#0055FF' }}

                        // onChangeText={(code) => { setSchoolCode(code) }}
                        />
                    </InputRow>
                    <PersianCalendarPicker
                        onDateChange={onDateChange}
                        isRTL
                        width={0.8 * width}
                        allowRangeSelection
                        // minRangeDuration={7}
                        selectedStartDate={myDate[0]}
                        selectedEndDate={myDate[1]}
                        textStyle={{ fontFamily: 'IRANSansWeb(FaNum)' }}
                        maxDate={Date.now()}
                    />
                    <TO onPress={searchFilter} style={styles.searchBtn}>
                        <Text style={[Stl.font, Stl.txtAl, { fontSize: 12, color: 'white' }]}>جستجو کن</Text>
                    </TO>
                </ScrollView>
            </Overlay>
            {yAxisData == [] ? (<Spinner />) : (

                <ScrollView horizontal={true} >
                    {/* {console.log('xAxis',xAxisData)} */}
                    <View style={{ height: 450, padding: 10, flexDirection: 'row', width: width }}>
                        <YAxis
                            data={yAxisData}
                            // min={Math.floor(Math.min(...yAxisData))}
                            // max={Math.ceil(Math.max(...yAxisData))}
                            style={{ marginBottom: xAxisHeight }}
                            contentInset={verticalContentInset}
                            svg={axesSvg}
                        />
                        {console.log('param', categorey)}
                        <View style={{ flex: 1, marginLeft: 10 }}>

                            <LineChart
                                style={{ flex: 1 }}
                                data={chartData}
                                contentInset={verticalContentInset}

                                // svg={{
                                //     stroke: BColor, strokeWidth: 2,
                                // }}
                                curve={shape.curveLinear}
                            >
                                <Grid />
                                {/* <Decorator /> */}
                                {/* {tooltipX == null ? (<View></View>) : (<Tooltip />)} */}
                                {/* <Tooltip /> */}
                            </LineChart>

                            <XAxis
                                style={{ marginHorizontal: -10, height: xAxisHeight, paddingVertical: 10 }}
                                data={xAxisData}
                                formatLabel={(value, index) => xAxisData[index]}

                                contentInset={{ left: 20, right: 20 }}
                                svg={{
                                    fontSize: 8, fill: 'grey', rotation: -45, originY: 25,
                                    y: 7,
                                }}
                            />
                            {/* <Text style={[Stl.font, { fontSize: 12, color: 'black' }]}> {xAxisData[tooltipX]} = {tooltipY}</Text> */}
                        </View>

                    </View>

                </ScrollView>)}
            <View>
                <FlatList
                    data={chartData}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        let color = item.backgroundColor
                        var ret = color.replace(',0.3', '');
                        // console.log(ret)
                        // let word = 'a';
                        // let position = 3;
                        // var output = [color.slice(0, position), word, color.slice(position)].join('');
                        // console.log('out', output)
                        return (
                            <View style={{width:100,height:40,flexDirection:'row',marginLeft:10}}>
                                <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: ret }}></View>
                                <Text>{item.label}</Text>
                            </View>
                        )
                    }}
                />
            </View>
            <TO onPress={openModal} style={styles.filter}>
                <Icon name='filter' type='font-awesome-5' color="white" />
            </TO>


        </View>
    )

}

const axesSvg = { fontSize: 10, fill: 'grey' };
const verticalContentInset = { top: 5, bottom: 5 }
const xAxisHeight = 30
// const YAxisData = [1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5]
// const data = [6.5, 4, 5, 1.5]
// const XAxisData = ['20-4', '25-4', '20-4', '30-4', '5-5', '5-5', '5-5']

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



export default connect(mapStateToProps, mapDispatchToProps)(Report);
