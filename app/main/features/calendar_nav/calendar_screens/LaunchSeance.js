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

// TODO IMPORT LAUNGHTSEANCE
var idLaunghedSeance = 1;

//TODO récupérer les exercices / repetitions ect :
/*
select *
from Seance_Exo AS s
JOIN Exercice AS e
ON s.exercice_id=e.exercice_id
WHERE seance_id=1;
*/


export default class Home extends Component<{}> {

  constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            hasInternet: true,
        }
    }

  componentDidMount(){
    return fetch(path + 'getSeanceById.php',
    {
        method: "POST",
        headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        body: JSON.stringify({
                seanceid: idLaunghedSeance,
            })
    })
    .then((response) => response.json())
    .then((res) => {
        this.setState({
            isLoading: false,
            // TODO : Exporter le numéro de l'exercice et le tableau pour les pages suivantes :)
            exercice_nom: res[0].exercice_nom,
            nb_repetitions: res[0].nbr_repetiion,
            nb_series: res[0].nbr_serie
        })
    })
    .catch((error) => {
        this.setState({
          hasInternet: false,
          isLoading: false,
      })
    });
    }

    coucou = () => {
        Alert.alert(this.state.exercice_nom + " : C'est quoi ?");
    }

    exerciceSuivant = () => {
        Alert.alert(this.state.exercice_nom + " : C'est quoi ?");
    }

  render() {

    let imgCreer = require('../../../../img/creerAccueil.jpg');

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
              <View style={styles.section}>
                  <Image source={imgCreer} style={{height: h*0.5, width: w, opacity: 0.7}}/>
              </View>
              <Text style={styles.caption} onPress={() => this.coucou()}>
                {this.state.exercice_nom}
              </Text>

              <Text style={styles.smallTitle} onPress={() => this.coucou()}>
                Nombre de répétition : {this.state.nb_repetitions}
              </Text>

              <Text style={styles.smallTitle} onPress={() => this.coucou()}>
                Nombre de séries : {this.state.nb_series}
              </Text>


              <View style={styles.buttonStyle}>
              <Button
                onPress={() => this.exerciceSuivant()}
                title="Exercice suivant >"
                color="#FF3366"
                accessibilityLabel="Exercice suivant"
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
