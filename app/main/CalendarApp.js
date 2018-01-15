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
  picket,
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
    return (
		<ScrollView>
    /*
    <View>
        <Picker selectedValue = {this.state.user} onValueChange = {this.updateUser}>
           <Picker.Item label = "Steve" value = "steve" />
           <Picker.Item label = "Ellen" value = "ellen" />
           <Picker.Item label = "Maria" value = "maria" />
        </Picker>
        <Text style = {styles.text}>{this.state.user}</Text>
     </View>
     */
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
