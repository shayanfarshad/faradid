
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, Dimensions, BackHandler, StatusBar, TouchableOpacity as TO, Switch, Linking, FlatList } from 'react-native';
import { Tooltip, Text, Icon } from 'react-native-elements';
import * as S from '../../../components/Chart/styles'
import * as Stl from '../../../components/styles'
import Header from '../sub/header';
import InputBox, { InputRow } from '../../../components/Inputs/InputBox';
import { set } from 'react-native-reanimated';

const height = Dimensions.get('window').height
const GridPage = ({ navigation, route, type, chart }) => {
    const [data, setData] = useState([])
    const [defaultData, setDefaultData] = useState([])
    const [search, setSearch] = useState('')
    // const navigation = useNavigation();
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const backAction = () => { navigation.goBack(); return true };

            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );

            return () => backHandler.remove();
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        // console.log('type grid',route.params.type)
        var deactive = route.params.data;
        var data = route.params.type;
        var newArray = [];
        switch (data) {
            case 'modem/poor':
                filterItem('Internet PoorConnection', chart.modemGrid)
                break;
            case 'modem/thinUn':
                filterItem('ThinClient Unavailable', chart.modemGrid)
                break;
            case 'modem/intUn':
                filterItem('Internet Unavailable', chart.modemGrid)
                break;
            case 'modem/unavailable':
                filterItem('Modem Unavailable', chart.modemGrid)
                break;
            case 'modem/active':
                filterItem('Active', chart.modemGrid)
                break;
            case 'thin/read':
                filterItem('ReadOnly', chart.thinGrid)
                break;
            case 'thin/time':
                filterItem('TimeOut', chart.thinGrid)
                break;
            case 'thin/refuse':
                filterItem('Refuse', chart.thinGrid)
                break;
            case 'thin/active':
                filterItem('Active', chart.thinGrid)
                break;
            case 'tci/read':
                filterItem('ReadOnly', chart.tciGrid)
                break;
            case 'tci/time':
                filterItem('TimeOut', chart.tciGrid)
                break;
            case 'tci/refuse':
                filterItem('Refuse', chart.tciGrid)
                break;
            case 'tci/active':
                filterItem('Active', chart.tciGrid)
                break;
            case 'tic/read':
                filterItem('ReadOnly', chart.ticGrid)
                break;
            case 'tic/time':
                filterItem('TimeOut', chart.ticGrid)
                break;
            case 'tic/refuse':
                filterItem('Refuse', chart.ticGrid)
                break;
            case 'tic/active':
                filterItem('Active', chart.ticGrid)
                break;
            case 'deactive':
                setData(deactive)
            default:
                break;
        }
    }, [type])
    function filterItem(type, grid) {
        let array = [...grid]
        var newData = array.filter((item) => {
            // console.log('item', item)
            if (item.status === type) {
                return true;
            }
            return false;
        });
        console.log(newData)
        setData(newData)
        setDefaultData(newData)
    }

    function sortData(type) {
        switch (type) {
            case 'operator':
                console.log('operator')
                var array = [...data]
                var newArray = array.sort((a, b) => a.providerName.localeCompare(b.providerName))
                setData(newArray)
                break;
            case 'regulatory':
                var array = [...data]
                var newArray = array.sort((a, b) => a.regulatoryName.localeCompare(b.regulatoryName))
                setData(newArray)
                break;
            case 'city':
                var array = [...data]
                var newArray = array.sort((a, b) => a.cityName.localeCompare(b.cityName))
                setData(newArray)
                break;
            case 'state':
                var array = [...data]
                var newArray = array.sort((a, b) => a.stateName.localeCompare(b.stateName))
                setData(newArray)
                break;

            default:
                break;
        }
    }


    function findItem() {
        var array = [...data];
        console.log(search)
        const newData = array.filter(e => e.providerName.search(search) > -1 || e.regulatoryName.search(search) > -1 || e.cityName.search(search) > -1 || e.stateName.search(search) > -1)
        console.log(newData)
        setData(newData)


        // console.log(newData)

        // console.log(el)
    }
    function handleKeyDown(e) {
        console.log(e)
        if (e.nativeEvent.key == 'Backspace') {
            console.log('delete')
            setData(defaultData)
        }
    }
    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <StatusBar translucent backgroundColor="transparent" />
            {/* <View style={{height:50}}> */}
            {console.log('type', route.params.type)}
            {/* </View> */}
            <View style={{ height: height * 0.1, paddingHorizontal: 10 }}>
                {/* <Text style={[Stl.font, Stl.txtAl, Stl.Primary,{marginLeft:10}]}>جستجو :</Text> */}
                <InputRow>
                    <InputBox
                        placeholder="جستجو"
                        value={search}
                        onChangeText={(name) => { setSearch(name) }}
                        // onKeyPress={(key)=>}
                        onSubmitEditing={findItem}
                        onKeyPress={(e) => handleKeyDown(e)}
                    />
                </InputRow>
            </View>
            <ScrollView horizontal={true} style={{ scaleX: -1 }} contentContainerStyle={{ height: height * 0.8, paddingBottom: 20, flexDirection: 'row-reverse' }}  >
                <View style={[S.gridTable, { scaleX: -1, marginTop: 5 }]}>
                    <View style={S.colTable}>
                        {route.params.type === 'deactive' ? (<></>) : (<View style={[S.colItem, { width: 150 }]}>
                            <Text style={[Stl.font, Stl.txtAl, Stl.Primary]}>علت مشکل</Text>
                        </View>)}

                        <TO onPress={() => sortData('operator')} style={[S.colItem, { width: 100 }]}>
                            <Text style={[Stl.font, Stl.txtAl, Stl.Primary]}>نام اپراتور</Text>
                        </TO>

                        <View style={[S.colItem, { width: 80 }]}>
                            <Text style={[Stl.font, Stl.txtAl, Stl.Primary]}>کد مرکز</Text>
                        </View>

                        <TO onPress={() => sortData('regulatory')} style={[S.colItem, { width: 100 }]}>
                            <Text style={[Stl.font, Stl.txtAl, Stl.Primary]}>نام مرکز</Text>
                        </TO>

                        <TO onPress={() => sortData('city')} style={[S.colItem, { width: 100 }]}>
                            <Text style={[Stl.font, Stl.txtAl, Stl.Primary]}>نام شهر</Text>
                        </TO>

                        <TO onPress={() => sortData('state')} style={[S.colItem, { width: 100 }]}>
                            <Text style={[Stl.font, Stl.txtAl, Stl.Primary]}>نام استان</Text>
                        </TO>

                    </View>
                    <FlatList
                        data={data}
                        // inverted
                        style={{ marginBottom: 20 }}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => {
                            return (
                                <View style={S.rowTable}>
                                    {route.params.type === 'deactive' ? (<></>) : (<View style={[S.rowItem, { width: 150, backgroundColor: item.color }]}>
                                        <Text style={[Stl.font, Stl.txtAl, Stl.Label, { color: 'white' }]}>{item.status}</Text>
                                    </View>)}
                                    <View style={[S.rowItem, { width: 100 }]}>
                                        <Text style={[Stl.font, Stl.txtAl, Stl.Primary, Stl.Label]}>{item.providerName}</Text>
                                    </View>
                                    <View style={[S.rowItem, { width: 80 }]}>
                                        <Text style={[Stl.font, Stl.txtAl, Stl.Primary, Stl.Label]}>{item.regulatoryId}</Text>
                                    </View>
                                    <View style={[S.rowItem, { width: 100 }]}>
                                        <Text style={[Stl.font, Stl.txtAl, Stl.Primary, Stl.Label]}>{item.regulatoryName}</Text>
                                    </View>
                                    <View style={[S.rowItem, { width: 100 }]}>
                                        <Text style={[Stl.font, Stl.txtAl, Stl.Primary, Stl.Label]}>{item.cityName}</Text>
                                    </View>
                                    <View style={[S.rowItem, { width: 100 }]}>
                                        <Text style={[Stl.font, Stl.txtAl, Stl.Primary, Stl.Label]}>{item.stateName}</Text>
                                    </View>
                                </View>
                            )
                        }}

                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}



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

export default connect(mapStateToProps, mapDispatchToProps)(GridPage);