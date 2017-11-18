import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';



export default class Home extends Component<{}> {
	
  render() {
    return (
       <View style={styles.container}>
              <View style={styles.halfHeight} >
                <Text style={styles.caption}>
                  Create new plan
                </Text>
              </View>

              <View style={styles.quarterHeight}>
                <Text style={styles.caption}>
                  Explore plans
                </Text>
              </View>

              <View style={[styles.quarterHeight, {backgroundColor: '#CCC'}]}>
                <Text style={styles.caption}>
                  My followed
                </Text>
              </View>
          </View>
    );
  }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    halfHeight: {
        flex: .5,
        backgroundColor: '#FF3366',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    quarterHeight: {
        flex: .25,
        backgroundColor: '#000',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    caption: {
      color: 'white',
      fontSize: 50,
      textAlign: 'center',
    }
});
