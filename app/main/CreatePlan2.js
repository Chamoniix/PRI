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
  TouchableHighlight,
  ActivityIndicator,
  ListView,
  Alert,
} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

import {objectif} from './CreatePlan';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class CreatePlanBis extends Component {
        
    ListViewItemSeparator = () => {
        return (
            <View style={{height: .5, width: "100%", backgroundColor: "#000",}}/>
        );
    }
    
    render() {        
        return (
          <View style={styles.container}>
            <View>
                <View style={{backgroundColor:'red'}}>
                    <Text style={styles.textTitle}>
                    Créer mon plan d'entrainement
                    </Text>
                </View>
                <Text>Texte de présentation</Text>
            </View>
            <View>
                <Text style={styles.welcome}>
                  Choisissez votre durée:
                </Text> 
                <ListView
                    dataSource={ds.cloneWithRows(["1 mois", "3 mois", "6 mois"])}
                    renderSeparator={this.ListViewItemSeparator}
                    renderRow={(rowData) => <Text style={styles.rowViewContainer}>{rowData}</Text>}
                />
                <Text style={styles.welcome}>
                  Choisissez votre difficulté:
                </Text> 
                <ListView
                    dataSource={ds.cloneWithRows(["Débutant", "Intermédiaire", "Confirmé"])}
                    renderSeparator={this.ListViewItemSeparator}
                    renderRow={(rowData) => <Text style={styles.rowViewContainer}>{rowData}</Text>}
                />
            </View>
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
    textTitle:{
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
   rowViewContainer: {
        fontSize: 20,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
      }
});