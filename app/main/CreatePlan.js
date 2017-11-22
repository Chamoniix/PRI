import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions
} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class CreatePlan extends Component {
    render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Create Your Plan!
        </Text>  
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
});