import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  Image,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

const remote = 'https://cdn-maf0.heartyhosting.com/sites/muscleandfitness.com/files/media/campus-muscle-trainint-partner-4.jpg';

export default class Home extends Component<{}> {

  render() {
    const resizeMode = 'center';

    return (
       <View style={styles.container}>
          <Image
        style={{
          flex: 1,
          resizeMode,
          flex: .5,
        backgroundColor: '#FF3366',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
        }}
        source={{ uri: remote }}
      />

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

AppRegistry.registerComponent('BackgroundImage', () => BackgroundImage);

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
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
