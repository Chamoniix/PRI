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
  Alert
} from 'react-native';

//Dimension of screen :
var w = Dimensions.get('window').width;
var h = Dimensions.get('window').height;

import {idMuscle} from './ChoixMuscle.js';
import {idMateriel} from './ChoixMateriel.js';

var idExercice;
var nomExo;
export default class ChoixExercice extends Component<{}> {

	constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            hasInternet: true,
        }
    }

	componentDidMount(){
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
         let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            isLoading: false,
            dataSourceAct: ds.cloneWithRows(res),
        })
    })
    .catch((error) => {
        /*this.setState({
              hasInternet: false,
              isLoading: false,
          })*/
        Alert.alert("0 Result");
        this.props.navigation.navigate('ChoixZoneCorps');
    });
}

	ListViewItemSeparator = () => {
        return (
            <View style={{height: .5, width: "100%", backgroundColor: "#000",}}/>
        );
    }

	exerciceChoosen = (rowData) => {
		idExercice = rowData.exercice_id;
		nomExo = rowData.exercice_nom;
    //Alert.alert("Muscle : " + idMuscle + " Materiel : " + idMateriel + "\nExercice Choisi : " + idExercice + "- " + rowData.exercice_nom);
    this.props.navigation.navigate('Seance');
	}


  render() {

    const {navigate} = this.props.navigation;

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

    return (
          <View style={styles.container}>
            <View>
                <View style={{backgroundColor:'#FF3366'}}>
                    <Text style={styles.textTitle}>
                    Choix de mon exercice
                    </Text>
                </View>
            </View>

            <View>
                <Text style={styles.welcome}>
                  Choisissez votre Exercice:
                </Text>
				        <ListView
                    dataSource={this.state.dataSourceAct}
                    renderSeparator={this.ListViewItemSeparator}
                    renderRow={(rowData) => <Text style={styles.rowViewContainer} onPress={() => this.exerciceChoosen(rowData)}>
                    {rowData.exercice_nom}</Text>}
                />
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
    textTitle:{
        color: 'white',
        fontSize: 30,
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
    },
});

export{idExercice, nomExo};
