import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Navigation from './Navigation';
// dimensions of the screen
var w = Dimensions.get('window').width;
var h = Dimensions.get('window').height;

export default class Seance extends Component<{}> {
   gotToChoixZoneCorps = (value) => {
	this.props.navigation.navigate('ChoixZoneCorps');
  }
  render() {
	const ele = (value) => (
		<TouchableOpacity onPress={this.gotToChoixZoneCorps.bind(this,value)}>
			<View >
			  <Text>Choisir un exercice</Text>
			</View>
		</TouchableOpacity>
	);
	
	  const tableHead = ['', 'Atelier', 'Nombre de seance', 'Nombre de repetion'];
    const tableData = [
      ['1',  ele('1'), '', ''],
      ['2', ele('2'), '', ''],
      ['3',ele('3'), '', ''],
      ['4', ele('4'), '', ''],
      ['5', ele('5'), '', ''],
    ];
    return (
      <ScrollView>
		<Table style={styles.table}>
          <Row data={tableHead} style={styles.head} textStyle={styles.headText}/>
          <Rows data={tableData} style={styles.row} textStyle={styles.text}/>
        </Table>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  table:{
	  
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  head: { 
	width : w, 
	height: w/5, 
	backgroundColor: 'rgb(140,140,140)'
  },
  headText: { 
	textAlign:'center',
	fontSize : 15,
	color : 'white',
  },
  text: { 
	textAlign:'center',
	fontSize : 20,
	color : 'black',
  },
  row: { 
	width : w, 
	height: w/5, 
	backgroundColor: 'rgb(208,208,208)'
	},
  bouton: {
	  paddingTop:10,
	  paddingBottom:10,
  }
});

