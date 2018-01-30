import { NavigationActions } from 'react-navigation'
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
  button,
  TextInput
} from 'react-native';

import {secondes} from './LaunchSeance.js';

//Dimension of screen :
var w = Dimensions.get('window').width;
var h = Dimensions.get('window').height;
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'CalendarApp'})
  ]
})

export default class FinSeance extends Component<{}> {

  constructor(props){
        super(props);
        this.state = {
        }
    }

  componentDidMount(){
      this.setState({secondes: secondes,
        myNumber: 0});
    }

    toHome = () => {
      this.props.navigation.dispatch(resetAction);
      //this.props.navigation.navigate('CalendarApp');
    }

    onChanged(text){
    let newText = '';
    let numbers = '0123456789';

    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
        else {
            alert("please enter numbers only");
        }
    }

    var numNote = parseInt(newText);
    if ((numNote >=0 && numNote <=10) || isNaN(numNote))
      this.setState({ note: newText });
    else
      alert("Entrez une note entre 0 et 10");
}

  render() {

    let imgCreer = require('../../../../img/creerAccueil.jpg');

    return (
          <View style={styles.container}>

              <Text style={styles.caption}>
                Fin de la séance !
              </Text>

              <Text style={styles.smallTitle}>
                Temps : {this.state.secondes} secondes
              </Text>

              <Text style={styles.smallTitle}>
                Note (/10):

              </Text>

              <TextInput
                 style={styles.textInput}
                 keyboardType='numeric'
                 onChangeText={(text)=>this.onChanged(text)}
                 value={this.state.note}
                 maxLength={2}
              />

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
    },
    textInput: {
      fontSize: 30,
    }
});
