import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';



export default class Navigation extends Component<{}> {
    
    logOff(){
        
    }
    
    render() {
    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>
                Welcome to User Account!
            </Text>
            <TouchableHighlight onPress={() => this.logOff()}>
                <Text>Se déconnecter</Text>
            </TouchableHighlight>
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