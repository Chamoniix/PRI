import React, { Component } from 'react';
import {Calendar} from 'react-native-calendars';
import {
  AppRegistry,
  Platform,
  Alert,
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  TouchableHighlight,
  ListView,
  ScrollView,
} from 'react-native';

var date; 

import {dateM} from './AddSeance';

var listDate=[];
var mark;
var cpt = 0;
var dateMarked=[];

var seanceDate = false;
var seance_id;

export default class CalendarApp extends Component {
	constructor(props){
        super(props);
		this.state = {
			isLoading: true
		};
	}
	CheckSeance(date){
		this.setState({
            isLoading: true,
        });
        return fetch('http://213.32.66.63/appliPP/getSeance.php',
        {
            method: "POST", 
            headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            body: JSON.stringify({
					dateS: date,
					
                })
        })
        .then((response) => response.json())
		.then((res)=> {
			seanceDate = true;
			seance_id = res[0].seance_id;
			this.props.navigation.navigate('Seance');
			//Alert.alert(res[0].seance_id);
		})
        .catch((error) => {
			seanceDate = false;
			this.props.navigation.navigate('AddSeance');
           // console.error(error);
        });
	}
	GetDay(day) {
		date = day.dateString;
		this.CheckSeance(date);
		/*if(seanceDate===true){
		}else{
		}*/
	}
	
	exerciceChoosen = (rowData) => {
		idExercice = rowData.seance_id;
        Alert.alert("Exercice Choisi : " + idExercice);
			
        //this.props.navigation.navigate('Seance');
	}
	
	render() {
		//const listD = listD.push(dateM);
		/*if(this.state.isLoading){
			return(
				<View style={{flex: 1, paddingTop: 20}}>
					<ActivityIndicator />
				</View>
			);
		}*/
		if(dateM!=null){
			listDate.push(dateM);
			
			//Alert.alert("cpt = "+cpt + "list date" + listDate[cpt]);
			dateMarked[listDate[cpt]]={selected: true};
			cpt = cpt + 1;
		}
    return (
		<ScrollView>
		<Text style={styles.firstTitle}>Pour creer vos séances, cliquez sur un jour du calendrier</Text>
	    <Calendar
			onDayPress={this.GetDay.bind(this)}
			markedDates={dateMarked}
        />
	  </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
	  paddingTop :50,
	  paddingBottom : 130,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(204, 204, 204)',
  },
  
  firstTitle: {
	  fontSize: 20,
	  padding :10,
    textAlign:'center',
   // backgroundColor: 'rgb(204, 204, 204)',
  },
});
export {date};