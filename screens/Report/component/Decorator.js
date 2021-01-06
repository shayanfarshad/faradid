import React from 'react'
import { Grid, LineChart, XAxis, YAxis, Circle, G, Line, Rect } from 'react-native-svg-charts'

function Decorator( x, y, data ){
    return data.map((value, index) => (
        <Circle
            key={index}
            cx={x(index)}
            cy={y(value)}
            r={4}
            stroke={'rgb(134, 65, 244)'}
            fill={'white'}
        />
    ))
}

// function renderItem(item, key) {
//     return (
//         <TO onPress={() => itemPress(item)} key={key} style={[S.ListItemStyle,
//             // props.multiSelect ? 
//             //     props.current.length > key ? 
//             //         props.current[key].Id === item.Id ? S.ActiveListItem : null
//             //     : null
//             // :props.current.Id === item.Id ? S.ActiveListItem: null
//         ]}>
//             <Text style={[Stl.font,
//                 // props.multiSelect ? 
//                 //     props.current.length > key ? 
//                 //         props.current[key].Id === item.Id ? S.ActiveListItemTxt : null
//                 //     : null
//                 // :props.current.Id === item.Id ? S.ActiveListItemTxt: null
//             ]}>{item[NameSelector]}</Text>
//         </TO>
//     )
// }

export default Decorator;