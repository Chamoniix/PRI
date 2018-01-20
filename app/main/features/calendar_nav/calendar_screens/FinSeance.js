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
  Alert,
  ActivityIndicator,
  button
} from 'react-native';

//Dimension of screen :
var w = Dimensions.get('window').width;
var h = Dimensions.get('window').height;

export default class Home extends Component<{}> {

  constructor(props){
        super(props);
        this.state = {
        }
    }

  componentDidMount(){

    }

    toHome = () => {
      Alert.alert("Stay pls");
    }

  render() {

    let imgCreer = require('../../../../img/creerAccueil.jpg');

    return (
          <View style={styles.container}>

              <Text style={styles.caption}>
                Fin de la séance !
              </Text>

              <Text style={styles.smallTitle}>
                Temps : 00:00:00
              </Text>

              <Text style={styles.smallTitle}>
                Note : 5/5
              </Text>

              <View style={styles.buttonStyle}>
              <Button
                onPress={() => this.toHome()}
                title="Retour au calendrier >"
                color="#FF3366"
                accessibilityLabel="Retour au calendrier"
              />
            </View>
          </View>
    );
  }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    caption: {
      color: '#777',
      fontSize: 40,
      textAlign: 'center',
    },
    textTitle:{
      color: 'white',
      fontSize: 30,
      textAlign: 'center',
    },
    smallTitle: {
      color: '#777',
      fontSize: 30,
    },
    buttonStyle: {
      marginTop: 30,
      paddingRight: 10,
      width: '100%',
      alignItems: 'flex-end',
    }
});
