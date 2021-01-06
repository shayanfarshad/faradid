import React, { Fragment, useState } from 'react'
import { View, Text, TouchableOpacity as TO } from 'react-native'
import { Icon } from 'react-native-elements'

import * as Stl from '../styles';
import * as S from './styles'
import { useLinkProps } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';


// import console = require('console');

const MultiTag = ({ title, current, items, setCurrent, idSelector, NameSelector, pressCallBack }) => {
    const [boxState, openBox] = useState(false)
    // const [selected,setSelected]=useState([])
    function itemPress(item, index) {
        // var l = [...current,item];
        // l.push(item)
        // console.log('current', current)
        // var newData = new Array();
        // if (current == null) {
        //     console.log('khalie')
        // } else {
        //     for (var i = 0; i < current.length; i++) {
        //         if (current[i].name == item.name) {
        //             console.log('true')
        //         } else {
        //             console.log('false')
        //         }
        //     }
        // }

        if (!current.includes(item)) {
            console.log('item', item)
            console.log('current', current)
            //    newData.push(item)


            setCurrent(() => [...current, item])
        }
        // setCurrent(() => [...current, item])
        // openBox(false)
        // if (pressCallBack !== undefined) {
        //     pressCallBack(i)
        // }
    }
    function deleteTag(item, index) {
        var array = [...current]
        var ind = array.indexOf(index)
        if (index !== -1) {
            array.splice(index, 1);
            setCurrent(array)
        }

        // openBox(false)
        if (pressCallBack !== undefined) {
            pressCallBack(i)
        }
    }

    function handleContainer() {
        openBox(!boxState)
    }

    function renderItem(item, index) {
        return (
            <TO onPress={() => itemPress(item, index)} key={index} style={[S.ListItemStyle,
                // props.multiSelect ? 
                //     props.current.length > key ? 
                //         props.current[key].Id === item.Id ? S.ActiveListItem : null
                //     : null
                // :props.current.Id === item.Id ? S.ActiveListItem: null
            ]}>
                {console.log('itemsss', item)}
                <Text style={[Stl.font,Stl.Third
                    // props.multiSelect ? 
                    //     props.current.length > key ? 
                    //         props.current[key].Id === item.Id ? S.ActiveListItemTxt : null
                    //     : null
                    // :props.current.Id === item.Id ? S.ActiveListItemTxt: null
                ]}>{item.name}</Text>
                <Icon name='plus' type="font-awesome-5" size={12} />
            </TO>
        )
    }

    return (

        <View style={{ marginBottom: 10 }}>
            <Text style={Stl.font}>{title}:</Text>
            <View style={[S.SelectContainer]}>
                <View style={[S.SelectBoxRow, { justifyContent: 'space-between' }]}>
                    <View style={S.ViewContainer}>
                        {
                            current.length > 0 ? (
                                current.map((item, index) => {
                                    console.log('item', current)
                                    return (<View style={[S.tagView]} key={index}>
                                        <Text style={[Stl.font, S.inputTitle,Stl.Third]}>
                                            {
                                                item.name
                                            }
                                        </Text>
                                        <TO onPress={() => deleteTag()} style={{ paddingRight: 5 }}>
                                            <Icon name='times' type='font-awesome-5' size={12} />
                                        </TO>
                                    </View>)
                                })
                            ) : <Text style={[Stl.font, S.inputTitle]}>
                                    تعیین نشده
                        </Text>
                        }
                    </View>
                    <TO onPress={() => handleContainer()} hitSlop={{ left: 30, right: 30, top: 10, bottom: 10 }} style={{ width: '15%' }}>
                        <Icon
                            name={boxState ? 'caretup' : 'caretdown'}
                            type='antdesign'
                            color='#adabab'
                            size={14}
                            containerStyle={S.SelectBoxIcon}
                        />
                    </TO>
                </View>
                {
                    boxState ?
                        <View style={{ padding: 10 }}>
                            {console.log('items', items)}
                            {
                                items !== null ? items.length > 0 ? items.map((item, index) => {
                                    return renderItem(item, index)
                                }) : null : null
                            }
                        </View>
                        : null
                }
            </View>
        </View>
    )
}

export default MultiTag;

