import React, { Component } from 'react';
import { Calendar} from 'react-native-calendars';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';



export default class CalendarApp extends Component<{}> {
	
  render() {
    return (
	
      <View style={styles.container}>
	      <Calendar
          // Initially visible month. Default = Date()
          current={'2017-11-14'}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
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
    backgroundColor: '#F5FCFF',
  },
});