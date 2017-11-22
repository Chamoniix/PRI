import React, { Component } from 'react';
import { Calendar} from 'react-native-calendars';
import {
  Platform,
  Alert,
  StyleSheet,
  Text,
  View,
  Button,
  Navigator,
  TouchableHighlight,
} from 'react-native';
import Seance from './Seance';

export default class CalendarApp extends Component<{}> {
	
  render() {
	  const { navigate } = this.props.navigation;
    return (
	
      <View style={styles.container}>
	    <Calendar
		  // Specify style for calendar container element. Default = {}
		  style={{
			height: 350
		  }}
		  // Specify theme properties to override specific styles for calendar parts. Default = {}
		  theme={{
			selectedDayBackgroundColor: '#650205',
			selectedDayTextColor: 'white',
			todayTextColor: '#650205',
			
		  }}
          // Initially visible month. Default = Date()
          current={'2017-11-14'}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
		  markedDates={{
			'2017-11-16': {selected: true},
			'2017-11-17': {selected: true},
			'2017-12-18': {selected: true}
		  }}
		  onDayPress={() => navigate('Seance')}
		   
        />
		
      </View>
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
});