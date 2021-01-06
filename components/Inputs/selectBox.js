import React, { Fragment, useState } from 'react'
import { View, Text, TouchableOpacity as TO } from 'react-native'
import { Icon } from 'react-native-elements'

import * as Stl from '../styles';
import * as S from './styles'

import {  Tabs, Tab } from 'native-base';

// import console = require('console');

const SelectBox = ({ title, current, items, setCurrent, idSelector,tab1Name,tab2Name, NameSelector, pressCallBack, column, data1, data2 }) => {
    const [boxState, openBox] = useState(false)

    function itemPress(i) {
        setCurrent(i)
        openBox(false)
        if (pressCallBack !== undefined) {
            pressCallBack(i)
        }
    }

    function handleContainer() {
        openBox(!boxState)
    }

    function renderItem(item, key) {
        return (
            <TO onPress={() => itemPress(item)} key={key} style={[S.ListItemStyle,
                // props.multiSelect ? 
                //     props.current.length > key ? 
                //         props.current[key].Id === item.Id ? S.ActiveListItem : null
                //     : null
                // :props.current.Id === item.Id ? S.ActiveListItem: null
            ]}>
                <Text style={[Stl.font,
                    // props.multiSelect ? 
                    //     props.current.length > key ? 
                    //         props.current[key].Id === item.Id ? S.ActiveListItemTxt : null
                    //     : null
                    // :props.current.Id === item.Id ? S.ActiveListItemTxt: null
                ]}>{item[NameSelector]}</Text>
            </TO>
        )
    }

    return (
        <View style={{ marginBottom: 10 }}>
            <Text style={Stl.font}>{title}:</Text>
            <TO style={[S.SelectContainer]} onPress={() => handleContainer()}>
                <View style={S.SelectBoxRow}>
                    <Text style={[Stl.font, Stl.Third, S.SelecBoxTitle, S.inputTitle]}>
                        {
                            typeof (current) !== 'undefined' && current !== null && current[NameSelector] !== undefined ? current[NameSelector] : 'تعیین نشده'
                        }
                    </Text>
                    <Icon
                        name={boxState ? 'caretup' : 'caretdown'}
                        type='antdesign'
                        color='#adabab'
                        size={14}
                        containerStyle={S.SelectBoxIcon}
                    />
                </View>
                {
                    boxState ?
                        <View style={{ padding: 10 }}>
                            {column == 2 ? (<Tabs tabBarUnderlineStyle={{backgroundColor:'#0055FF'}}>
                                <Tab activeTextStyle={{color:'black'}} tabStyle={{backgroundColor:'#F8F8F8'}} activeTabStyle={{backgroundColor:'#F8F8F8'}} heading={tab1Name}>
                                    {
                                        data1 !== null ? data1.length > 0 ? data1.map((i, k) => {
                                            return renderItem(i, k)
                                        }) : null : null
                                    }
                                </Tab>
                                <Tab activeTextStyle={{color:'black'}} tabStyle={{backgroundColor:'#F8F8F8'}} activeTabStyle={{backgroundColor:'#F8F8F8'}} heading={tab2Name}>
                                    {
                                        data2 !== null ? data2.length > 0 ? data2.map((i, k) => {
                                            return renderItem(i, k)
                                        }) : null : null
                                    }
                                </Tab>
                            </Tabs>) : (
                                    items !== null ? items.length > 0 ? items.map((i, k) => {
                                        return renderItem(i, k)
                                    }) : null : null
                                )}
                            {/* {
                            items !== null ? items.length > 0 ? items.map((i,k)=>{
                                return renderItem(i,k)
                            }) : null : null
                        } */}
                        </View>
                        : null
                }
            </TO>
        </View>
    )
}

export default SelectBox;

