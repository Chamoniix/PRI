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
  Navigator,
  Picker,
} from 'react-native';

var date;

import {dateM} from './AddSeance';
import {userId} from './UserLogin';
var listDate=[];
var mark;
var cpt = 0;
var dateMarked=[];

var seance_id;

var rowsPlanByUser = [];

export default class CalendarApp extends Component {
	constructor(props){
        super(props);
		this.state = {
			isLoading: true,
      selectedPlan:"",
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
			seance_id = res[0].seance_id;
			this.props.navigation.navigate('Seance');
		})
        .catch((error) => {
			this.props.navigation.navigate('AddSeance');
        });
	}

	GetDay(day) {
		date = day.dateString;
		this.CheckSeance(date);
	}

  componentDidMount(){
        return fetch('http://213.32.66.63/appliPP/getPlanByUser.php',
        {
            method: "POST",
            headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            body: JSON.stringify({
                    userid: userId,
                })
        })
        .then((response) => response.json())
        .then((res) => {
            for( var i=0; i<res.length; i++){
              rowsPlanByUser[i] = res[i].plan_nom;
            }
            this.setState({
                isLoading: false,
                selectedPlan: rowsPlanByUser[0],
                rowsPlanByUser: rowsPlanByUser,
            })
        })
        .catch((error) => {
            console.error(error);
        });
    }

	render() {

		if(dateM!=null){
			listDate.push(dateM);
			dateMarked[listDate[cpt]]={selected: true};
			cpt = cpt + 1;
		}

    if(this.state.isLoading){
      return(
          <View style={{flex: 1, paddingTop: 20}}>
              <ActivityIndicator />
          </View>
      );
    }

    let planItems = this.state.rowsPlanByUser.map( (s, i) => {
           return <Picker.Item key={i} value={s} label={s} />;
       });

       return (
    <ScrollView>
      <View>
        <Text style={styles.firstTitle}>Selectionnez votre plan ! :)</Text>
        <Picker
            selectedValue={this.state.selectedPlan}
            onValueChange={ (plan) => ( this.setState({selectedPlan:plan}) ) }>
          {planItems}
        </Picker>

        <Text style = {styles.text}>{this.state.user}</Text>
      </View>
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

export {date, seance_id};
