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
  ActivityIndicator,
  TouchableHighlight,
  ListView,
  ScrollView,
} from 'react-native';
import AddSeance from './AddSeance';

export default class CalendarApp extends Component<{}> {
	constructor(props){
        super(props);
			this.state = {
				isLoading: true
			}
		}
	GetItem(date){
		Alert.alert(date);
	}
	componentDidMount(){
	return fetch('http://213.32.66.63/appliPP/getDate.php')
	.then((response) => response.json())
	.then((res) => {
		let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.setState({
			isLoading: false,
			dataSource: ds.cloneWithRows(res),
		})
	})
	.catch((error) => {
		console.error(error);
	});
	}
	ListViewItemSeparator = () => {
        return (
            <View style={{height: .5, width: "100%", backgroundColor: "#000",}}/>
        );
}
	
  render() {
	  const { navigate } = this.props.navigation;
	  if(this.state.isLoading){
            return(
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
		}
		
    return (
		<ScrollView>
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
          current={Date()}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
		  markedDates={{
			'2017-11-16': {selected: true},
			'2017-11-17': {selected: true},
			'2017-12-18': {selected: true}
		  }}
		  onDayPress={() => navigate('AddSeance')}
		   
        />
		<View style={{flex: 2, paddingTop: 20}}>
		<ListView
			dataSource={this.state.dataSource}
			renderRow={(rowData) => <Text>{rowData.date_seance}</Text>}
		/>
		</View>
      </View>
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
});