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



export default class CalendarApp extends Component {
	constructor(props){
        super(props);
		this.state = {
			isLoading: true
		};
	}
	
	GetDay(day) {
		date = day.dateString;
		this.props.navigation.navigate('AddSeance');
	}
	
	render() {
		/*if(this.state.isLoading){
			return(
				<View style={{flex: 1, paddingTop: 20}}>
					<ActivityIndicator />
				</View>
			);
		}*/
		
    return (
		<ScrollView>
		<Text style={styles.firstTitle}>Pour creer vos séances, cliquez sur un jour du calendrier</Text>
	    <Calendar
			onDayPress={this.GetDay.bind(this)}
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