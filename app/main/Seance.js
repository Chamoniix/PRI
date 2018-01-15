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
  TextInput,
} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Navigation from './Navigation';
// dimensions of the screen
var w = Dimensions.get('window').width;
var h = Dimensions.get('window').height;
// valeur du nombre de serie par exo
var ser = new Array(8);
// valeur du nbr de repetition par exo
var rep = new Array(8);
// initialisation a zero
rep[1]=0;
rep[2]=0;
rep[3]=0;
rep[4]=0;
rep[5]=0;

var seanceId = 41;
//import {seanceId} from './AddSeance';
export default class Seance extends Component<{}> {
	
   gotToChoixZoneCorps = (value) => {
	this.props.navigation.navigate('ChoixZoneCorps');
  }
  
  AddSeanceExo(seanceId, nbrR, nbrS){
       this.setState({
            isLoading: true,
        });
        return fetch('http://213.32.66.63/appliPP/addSeanceExo.php',
        {
            method: "POST", 
            headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            body: JSON.stringify({
                    sId: seanceId,
					nRep: nbrR,
					nSerie: nbrS,
                })
        })
		.then((res)=> {
			err = res;
		})
        .catch((error) => {
            console.error(error);
        });
    }
   
  test = () => {
	var k = 1;
	while(rep[k]!=0){
	this.AddSeanceExo(seanceId, rep[k], ser[k]);
		k = k + 1;
	}
	this.props.navigation.navigate('CalendarApp');
  }
  
  render() {
	const ele = (value) => (
		<TouchableOpacity onPress={this.gotToChoixZoneCorps.bind(this,value)}>
			<View >
			  <Text>Choisir un exercice</Text>
			</View>
		</TouchableOpacity>
	);
	
	const serie = (value) => (
		<View >
		  <TextInput
			editable = {true}
			maxLength = {40}
			keyboardType = 'numeric'
			onChangeText={(text) => {ser[value]=text}}
		  />
		</View>
	);
	
	const repet = (value) => (
		<View >
		  <TextInput
			editable = {true}
			maxLength = {40}
			keyboardType = 'numeric'
			onChangeText={(text) => {rep[value]=text}}
		  />
		</View>
	);
	
	const tableHead = ['', 'Atelier', 'Nombre de serie', 'Nombre de repetion'];
    const tableData = [
      ['1', ele(1), serie(1), repet(1)],
      ['2', ele(2), serie(2), repet(2)],
      ['3', ele(3), serie(3), repet(3)],
      ['4', ele(4), serie(4), repet(4)],
      ['5', ele(5), serie(5), repet(5)],
    ];
    return (
      <ScrollView>
		<Table style={styles.table}>
          <Row data={tableHead} style={styles.head} textStyle={styles.headText}/>
          <Rows data={tableData} style={styles.row} textStyle={styles.text}/>
        </Table>
		<Button title="Sauvegarder" style={styles.bouton} onPress={this.test.bind(this)}/>
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

