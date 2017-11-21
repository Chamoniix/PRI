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


export default class Home extends Component<{}> {

  render() {
    let imgUrl = require('../img/DSC_6536.jpg');
    return (
          <View style={styles.container}>
              <View>
                <Image source={imgUrl} style={{height: w*0.328, width: w}}/>
              </View>

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
