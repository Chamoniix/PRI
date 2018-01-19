import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import { NavigationActions } from 'react-navigation'

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'IsLoggedIn'})
  ]
})

const returnHome = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home'})
  ]
})

export default class Navigation extends Component<{}> {
    
    logOff(){
        AsyncStorage.setItem('userId', 'null');
        this.props.navigation.dispatch(returnHome);
        //this.props.navigation.dispatch(resetAction);
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