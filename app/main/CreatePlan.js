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
  TouchableHighlight
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
        <TouchableHighlight onPress={this.getActivites()}>
             <Text>Appuie</Text>
          </TouchableHighlight>  
      </View>
    );
  }
  
  getActivites = () => {
    fetch('http://213.32.66.63/appliPP/getActivites.php', 
    {
        method : 'POST',
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            key: 'test',  
        })
    }
    )
    .then((response) => response.json())
    .then((res) =>{
        alert(res.test);
    })
    .done();
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