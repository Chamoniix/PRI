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

//Dimension of screen :
var w = Dimensions.get('window').width;
var h = Dimensions.get('window').height;

// TODO IMPORT LAUNGHTSEANCE
var idLaunghedSeance = 1;


export default class Home extends Component<{}> {

  render() {

    let imgCreer = require('../img/creerAccueil.jpg');

    return (
          <View style={styles.container}>
              <View style={styles.section}>
                  <Image source={imgCreer} style={{height: h*0.5, width: w, opacity: 0.7}}/>
              </View>
              <Text style={styles.caption}>
                Sacré Exercice
              </Text>
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
    caption: {
      color: '#777',
      fontSize: 40,
      textAlign: 'center',
    }
});
