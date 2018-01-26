import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  TouchableHighlight,
  ListView,
  ActivityIndicator,
  Navigator,
  Alert,
  ScrollView
} from 'react-native';
import { NavigationActions } from 'react-navigation'

//Dimension of screen :
var w = Dimensions.get('window').width;
var h = Dimensions.get('window').height;

import {idMuscle} from './ChoixMuscle.js';
import {idMateriel} from './ChoixMateriel.js';

var idExercice;
var nomExo;

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'CalendarApp'})
  ]
})

export default class ChoixExercice extends Component<{}> {

	constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            hasInternet: true,
            dataSourceExo : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 === r2}),
            exos: '',
            selectExoText: 'Choisissez votre exercice:',
            selectedExo: '',
            selectedExoNom: '',
            noExoFound: false,
        }
    }

	componentDidMount(){
    this.getExercices();
  }

  getExercices(){
    return fetch(path + 'getExerciceByMuscleAndMateriel.php',
    {
        method: "POST",
        headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        body: JSON.stringify({
                muscleid: idMuscle,
                materielid: idMateriel,
            })
    })
    .then((response) => response.json())
    .then((res) => {
      if(res === "0 results"){
        this.setState({
          noExoFound: true,
          hasInternet: true,
          isLoading: false,
        })
      }else{
        this.setState({
          isLoading: false,
          noExoFound: false,
          hasInternet: true,
          dataSourceExo: this.state.dataSourceExo.cloneWithRows(res),
          exos : res,
          selectedExo : '',
        })
      }
    })
    .catch((error) => {
        this.setState({
              hasInternet: false,
              isLoading: false,
        })
        setTimeout(() => this.getExercices(), 3000);
    });
}

renderExos(rowData, rowID){
  return(
    <TouchableHighlight onPress={() => {
      this.selectExo(rowData, rowID)
    }}>
      <View style={this.state.selectedExo == rowData.exercice_id
        ? styles.viewRowSelected
        : styles.viewRow}>
        <Text style={this.state.selectedExo == rowData.exercice_id
          ? styles.viewTextSelected
          : styles.viewText}>
          {rowData.exercice_nom}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

selectExo(rowData, rowID) {
  if(this.state.selectedExo !== rowData.exercice_id){
    this.setState({selectedExo: rowData.exercice_id, selectedExoNom: rowData.exercice_nom, dataSourceExo: this.state.dataSourceExo.cloneWithRows(this.state.exos), selectExoText: 'Exercice choisi:'});
  }
}

goToNextStep(){
    idExercice = this.state.selectedExo;
    nomExo = this.state.selectedExoNom
    this.props.navigation.dispatch(resetAction);
    this.props.navigation.navigate('Seance');
}

goBackToChoixZone(){
  this.props.navigation.dispatch(resetAction);
  this.props.navigation.navigate('Seance');
  this.props.navigation.navigate('ChoixZoneCorps');
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
                    <ActivityIndicator size='large' color='rgb(125,125,125)'/>
                </View>
            );
        }

        if(!this.state.hasInternet){
            return(
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator size='large' color='rgb(125,125,125)'/>

                    <Text style={styles.textTitle}>
                    Pas de connexion internet...
                    </Text>
                </View>
            );
        }

        if(this.state.noExoFound){
          return(
            <ScrollView style={styles.container}>
              <View>
                  <Text style={[styles.textTitle, {color:'rgb(125,125,125)'}]}>
                  Aucun exercice n'a été trouvé!'
                  </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <TouchableHighlight underlayColor='rgb(217,217,217)' onPress={() => this.goBackToChoixZone()} style={styles.buttonNext}>
                   <Text style={styles.textTitle}>Refaire les choix</Text>
                </TouchableHighlight>
              </View>
            </ScrollView>
          );
        }

    return (
          <ScrollView style={styles.container} ref={ref => this.scrollView = ref} onContentSizeChange={(contentWidth, contentHeight)=>{this.scrollView.scrollToEnd({animated: true});}}>
            <View>
                <View style={{backgroundColor:'#FF3366'}}>
                    <Text style={styles.textTitle}>
                    Choix de mon exercice
                    </Text>
                </View>
            </View>

            <View>
                <Text style={styles.welcome}>
                  {this.state.selectExoText}
                </Text>
                <ListView
                   dataSource={this.state.dataSourceExo}
                   renderSeparator={this.ListViewItemSeparator}
                   renderRow={this.renderExos.bind(this)}
                />
                </View>
                <View style={{alignItems: 'flex-end'}}>
                <TouchableHighlight underlayColor='rgb(217,217,217)' onPress={() => this.goToNextStep()}
                style={this.state.selectedExo === ''
                ? styles.invisibleButton
                : styles.buttonNext}>
                   <Text style={this.state.selectedExo === ''
                   ? styles.invisibleText
                   : styles.textTitle}>Valider le choix</Text>
                </TouchableHighlight>
            </View>
         </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    textTitle:{
      color: 'white',
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
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
    },
    viewRowSelected : {
      backgroundColor: 'rgb(125,125,125)'
    },
    viewRow: {
    },
    viewTextSelected: {
      fontSize: 20,
      color: '#F5FCFF',
      textAlign: 'center',
      margin: 10,
    },
    viewText: {
      fontSize: 16,
      textAlign: 'center',
    },
    invisibleText: {
        fontSize: 0,
    },
    invisibleButton: {
        height: 0,
    },
    buttonNext: {
        margin: 15,
        backgroundColor: 'rgb(125,125,125)',
        borderRadius:5,
        width: 120,
    },
});

export{idExercice, nomExo};
