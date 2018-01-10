import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  TouchableHighlight,
  ActivityIndicator,
  ListView,
  Alert
} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var objectif;

export default class ListExample extends React.Component {

    constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 === r2
    });
    this.state = {
      dataSource: ds.cloneWithRows(this._getWeekList()),
      selectedID: 'tues'
    }
  }

  _getWeekList = () => {
    return ["monday", "tues", "wed", "thurs"]
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.weekContain}>
          <ListView showsHorizontalScrollIndicator={false} dataSource={this.state.dataSource} renderRow={this._renderRow.bind(this)}></ListView>
        </View>
      </View>
    );
  }
  _renderRow(rowData, rowID) {
    return (
      <TouchableHighlight onPress={() => {
        this._selectedWeek(rowData, rowID)
      }}>
        <View style={this.state.selectedID == rowData
          ? styles.weekRowSelected
          : styles.weekRow}>
          <Text style={this.state.selectedID == rowData
            ? styles.weekTextSelected
            : styles.weekText}>
            {rowData}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
  _selectedWeek(rowData, rowID) {
    console.log('Selected week '+rowData);
    this.setState({selectedID: rowData, dataSource: this.state.dataSource.cloneWithRows(this._getWeekList())});
  }
}

var styles = StyleSheet.create({
  weekRowSelected : {
  },
  weekRow: {
  },
  weekTextSelected: {
    fontSize: 16,
    color: 'yellow',
  },
  weekText: {
    fontSize: 14,
    color: 'blue',
  }
})