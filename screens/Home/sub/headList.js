import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Cover from '../../../components/Cover';
import {Label, H1} from '../../../components/typo';
import sch from '../../../assets/img/sch.png'
import Accordion from '../../../components/Accordion';
import Btn,{BtnRow} from '../../../components/Buttons';
import { useNavigation } from '@react-navigation/native';

const SchoolList = ({list}) =>{
    const navigation = useNavigation();
    const [openAcc, setOpenAcc] = useState(null);

    function renderStatus(status){
        var color = '#ffc107';
        var txt = "در انتظار ویرایش";
        switch (status) {
            case 1:
                color = '#adb5bd';
                txt = "در انتظار تایید موقعیت";
                break
            case 2:
                color = '#495057';
                txt = "در انتظار تایید اطلاعات";
                break
            case 3:
                color = '#212529';
                txt = "در انتظار تایید اطلاعات و موقعیت";
                break
            case 4:
                color = '#28a745';
                txt = "تایید نهایی";
                break
            case 5:
                color = '#dc3545';
                txt = "رد شده";
                break
        
            default:
                color = '#ffc107';
                txt = "در انتظار ویرایش";
                break;
        }
        return <Label style={[s.tLeft, {color: color}]}>{txt}</Label>
    }

    return(
        <>
            <Cover style={{marginBottom: 30}}>
                <View style={{flexDirection: 'row-reverse', paddingVertical: 10, alignItems: 'center'}}>
                    <View style={{flex:0.2}}>
                        <Image source={sch} style={{width:60,height:60}} />
                    </View>
                    <View style={{flex:0.5}}>
                        <Label style={{maxWidth: 90, alignSelf: 'flex-end', marginRight: 15}}>مجموع مدارس ثبت شده کل کشور</Label>
                    </View>
                    <View style={{flex:0.3}}>
                        <H1 style={{textAlign: 'center'}}>
                            {list !== null ? list.length : '0'}
                        </H1>
                        <Label style={{textAlign: 'center'}}>مدرسه</Label>
                    </View>
                </View>
            </Cover>
            {
                list !== null ? list.length > 0 ?
                list.map((item,index)=>{
                    return <Cover style={{marginBottom: 10}} key={index}>
                        <Accordion
                            open={openAcc === index ? true : false}
                            onPress={()=>{
                                if(openAcc !== index){
                                    setOpenAcc(index)
                                }else{
                                    setOpenAcc(null)
                                }
                            }}
                            rightEl={
                                <Label>{item.Name}</Label>
                            }
                            children={
                                <View style={{paddingHorizontal: 15}}>
                                    <View style={s.tblRow}>
                                        <View style={{flex: 0.3}}>
                                            <Label>استان</Label>
                                        </View>
                                        <View style={{flex: 0.7}}>
                                            <Label style={s.tLeft}>{item.Ostan_Name}</Label>
                                        </View>
                                    </View>
                                    <View style={s.tblRow}>
                                        <View style={{flex: 0.3}}>
                                            <Label>محل استقرار</Label>
                                        </View>
                                        <View style={{flex: 0.7}}>
                                            <Label style={s.tLeft}>{item.IsCity}</Label>
                                        </View>
                                    </View>
                                    <View style={s.tblRow}>
                                        <View style={{flex: 0.3}}>
                                            <Label>وضعیت</Label>
                                        </View>
                                        <View style={{flex: 0.7}}>
                                            {renderStatus(item.Status)}
                                        </View>
                                    </View>
                                    <BtnRow>
                                        <Btn title="ویرایش مشخصات"  TCenter onPress={()=>{navigation.navigate('SchoolOnMap',{mainCode: item.MainCode})}} BtnStyle={{backgroundColor: '#eee'}} TextStyle={{fontSize: 14}}/>
                                    </BtnRow>
                                </View>
                            }
                        />
                    </Cover>
                })
                : null : null
            }
        </>
    )
}

export default SchoolList;


const s = StyleSheet.create({
    tblRow:{
        flexDirection: 'row-reverse',
        marginBottom: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        paddingBottom: 5
    },
    tLeft:{
        textAlign: 'left'
    }
})