'use strict';
import { Platform, Dimensions } from 'react-native'

var React = require('react-native');
var { StyleSheet } = React;
const width = Dimensions.get('window').width
export const txtAl = Platform.select({
  ios: 'right',
  android: 'left'
});

module.exports = StyleSheet.create({
  pieView: {
    width: 320,
    marginHorizontal: 10,
    marginVertical: 10,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  chart: {
    // flex: 0.2,
    height: 50,
    width: '96%',
    marginHorizontal: '2%',
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#e4e4e4'
  },
  pieContent: {
    width: '100%',
    height: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 5, marginRight: 5
  },
  itemLabel: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  chartOption: {
    flex: 0.5,
    // borderWidth:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  chartOptionBtn: {
    justifyContent: 'center',
    width: '22%',
    height: '100%',
    alignItems: 'center'
  },
  gridTable: {
    backgroundColor: 'white',
    flex:1,
    // flexDirection: 'row',
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    paddingTop: 20,
    paddingHorizontal: 10
  },
  colTable: {
    flexDirection: 'row-reverse',
    height: 50,
    alignItems:'center',
    backgroundColor: '#FCFDFE',
    borderWidth:0.5,
    borderColor:'#BDC3C7',
    // borderBottomWidth:0
  },
  colItem: {
    // width: 'auto',
    height:30,
    marginRight:5,
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderLeftWidth: 0.5,
    borderColor: 'rgba(0,0,0,.24)'
  },
  rowTable:{
    flexDirection:'row-reverse',
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#F5F7F7',
    borderWidth:0.5,
    borderColor:'#D9DCDE'
  },
  rowItem:{
    // width:100,
    // paddingHorizontal:20,
    // borderWidth:1,
    borderRadius:5,
    marginRight:5,
    justifyContent:'center',
    alignItems:'center'
  },
  sortBtn:{
    width:80,
    height:30,
    borderRadius:16,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    borderWidth:2,
    borderColor:'#0055FF',
    marginLeft:10

  }
});