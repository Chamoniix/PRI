import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Navigation from './Navigation';

import {objectif} from './CreatePlan';

export default class CreatePlanBis extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
	  
        <Text style={styles.welcome}>
          Obj chosen: {objectif}
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
