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
  TextInput,
  ScrollView
} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

import {objectif} from './CreatePlan.js';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class CreatePlanBis extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
                isLoading: false,
                duree: '',
                niveau: '',
                nom: '',
                info: '',
        };
    }
        
    ListViewItemSeparator = () => {
        return (
            <View style={{height: .5, width: "100%", backgroundColor: "#000",}}/>
        );
    }
    
    render() {

        if(this.state.isLoading){
            return(
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }
    
        return (
          <ScrollView>
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
                    renderRow={(rowData) => <Text style={styles.rowViewContainer} onPress={() => this.setState({duree: rowData})}>{rowData}</Text>}
                />
                <Text style={styles.welcome}>
                  Choisissez votre difficulté:
                </Text> 
                <ListView
                    dataSource={ds.cloneWithRows(["Débutant", "Intermédiaire", "Confirmé"])}
                    renderSeparator={this.ListViewItemSeparator}
                    renderRow={(rowData) => <Text style={styles.rowViewContainer} onPress={() => this.setState({niveau: rowData})}>{rowData}</Text>}
                />
                <Text style={styles.welcome}>
                  Nom de votre plan d'entraînement:
                </Text>
                <TextInput style={styles.textToFill} underlineColorAndroid={'transparent'} onChangeText={(name) => this.setState({nom: name})} value={this.state.nom}/>
                <Text style={styles.welcome}>
                  Informations sur votre plan d'entraînement:
                </Text>
                <TextInput style={styles.textToFill} underlineColorAndroid={'transparent'} onChangeText={(comm) => this.setState({info: comm})} value={this.state.info}/>
                <TouchableHighlight onPress={this.createPlan.bind(this, this.state.nom, this.state.duree, this.state.niveau, objectif, this.state.info)}>
                    <Text style={styles.welcome}>Créer votre plan</Text>
                </TouchableHighlight>
                <ListView
                    dataSource={this.state.dataSourceObj}
                    renderSeparator={this.ListViewItemSeparator}
                    renderRow={(rowData) => <Text style={styles.rowViewContainer}>{rowData}</Text>}
                />
            </View>
          </ScrollView>
        );
  }
  
  createPlan(name, length, level, objectifid, information){
      //Alert.alert(this.state.nom+' '+this.state.duree+' '+this.state.niveau+' '+objectif+' '+this.state.info)
      this.setState({
            isLoading: true,
        });
        return fetch('http://213.32.66.63/appliPP/createPlan.php',
        {
            method: "POST", 
            headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            body: JSON.stringify({
                    duree: length,
                    niveau: level,
                    nom: name,
                    info: information,
                    obj: objectifid,
                })
        })
        .then((response) => response.json())
        .then((res) => {
            this.setState({
                isLoading: false,
            })
        })
        .catch((error) => {
            console.error(error);
        });
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
    margin: 15,
  },
   rowViewContainer: {
        fontSize: 20,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    textToFill:{
       height: height* 0.06,
       width: width*0.8,
       borderWidth: 1,
       borderColor: "#000000",
       marginTop: 20,
       color: 'grey',
       borderRadius:3,
   }
});