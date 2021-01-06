import React, { Fragment, useState, useEffect } from 'react'
import { View, TouchableOpacity as TO, ScrollView, ImagePropTypes } from 'react-native'
import { Icon } from 'react-native-elements'
import { PieChart } from 'react-native-svg-charts'
import * as Stl from '../styles';
import * as S from './styles'
import { Circle, G, Line, Text } from "react-native-svg";

const Chart = ({ data }) => {

    // const [total,setTotal]= useState()
    // const [readOnly,setReadOnly]= useState()
    // const [timeOut,setTimeOut]= useState()
    // const [refuse,setRefuse]= useState()
    // const [active,setActive]= useState()



    return (
        <PieChart
            style={{ height: 150, width: 130 }}
            outerRadius={'75%'}
            innerRadius={0}
            data={data}
        // padAngle={40}
        >
            {/* <Labels /> */}
        </PieChart>
    )
}
// const Labels = ({ slices, height, width }) => {
//     return slices.map((slice, index) => {
//         const { labelCentroid, pieCentroid, data } = slice;
//         return (
//             <Text
//                 key={index}
//                 x={pieCentroid[0]}
//                 y={pieCentroid[1]}
//                 fill={'white'}
//                 textAnchor={'middle'}
//                 alignmentBaseline={'text-bottom'}
//                 fontSize={16}
//                 stroke={'black'}
//                 strokeWidth={0.2}
//             >
//                 {data.value == 0 ? '' : data.value}
//             </Text>
//         )
//     })
// }
export default Chart;