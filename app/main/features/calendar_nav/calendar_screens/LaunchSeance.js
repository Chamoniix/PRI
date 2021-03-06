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
} from 'react-native';

//Dimension of screen :
var w = Dimensions.get('window').width;
var h = Dimensions.get('window').height;
var numExercice = -1;
var t0;
var t1;
var secondes;

import {seanceLaungedId} from './CalendarApp';

export default class Home extends Component<{}> {

  constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            hasInternet: true,
            exercice_nom: "",
            nb_repetitions: "",
            nb_series: "",
        }
    }

  componentDidMount(){
    numExercice = -1;
    this.setState({
        exercice_nom: "",
        nb_repetitions: 0,
        nb_series: 0,
        exercices: []
    })
    t0 = new Date();
    this.getExercices();
  }

  getExercices() {
    return fetch(path + 'getSeanceById.php',
    {
        method: "POST",
        headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        body: JSON.stringify({
                seanceid: seanceLaungedId,
            })
    })
    .then((response) => response.json())
    .then((res) => {
        this.setState({
            isLoading: false,
            exercices: res,
        })
        this.exerciceSuivant();
    })
    .catch((error) => {
        Alert.alert(error);
        this.setState({
          hasInternet: false,
          isLoading: false,
      })
    });
  }

    getImage(exerciceID) {
      return fetch(path + 'getExerciceVideo.php',
      {
          method: "POST",
          headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
              },
          body: JSON.stringify({
                  exerciceid: exerciceID,
              })
      })
      .then((response) => response.json())
      .then((res) => {
          this.setState({
              isLoading: false,
              imgPath: res[0].exercice_video,
          })
      })
      .catch((error) => {
          this.setState({
            hasInternet: false,
            isLoading: false,
        })
      });
    }

    alertDescription = () => {
        Alert.alert("Description de l'exercice");
    }

    exerciceSuivant = () => {
      numExercice+=1;
      if (numExercice >= this.state.exercices.length){
        t1 = new Date();
        var timeDiff = t1 - t0; //in ms
        timeDiff /= 1000;
        secondes = Math.round(timeDiff);
        secondes += " ";
        this.props.navigation.navigate('FinSeance');
      }
      else {
        this.getImage(this.state.exercices[parseInt(numExercice)].exercice_id);
        this.setState({
            exercice_nom: this.state.exercices[parseInt(numExercice)].exercice_nom,
            nb_repetitions: this.state.exercices[parseInt(numExercice)].nbr_repetiion,
            nb_series: this.state.exercices[parseInt(numExercice)].nbr_serie,
        })
      }

    }

  render() {
    let imgCreer = path.replace("php", "img") + this.state.imgPath;

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
                  <Image source={{ uri: imgCreer }} style={{height: h*0.5, width: w, opacity: 0.7}}/>
              </View>
              <Text style={styles.caption} onPress={() => this.alertDescription()}>
                {this.state.exercice_nom}
              </Text>

              <Text style={styles.smallTitle} onPress={() => this.alertDescription()}>
                Nombre de répétition : {this.state.nb_repetitions}
              </Text>

              <Text style={styles.smallTitle} onPress={() => this.alertDescription()}>
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

export {secondes};
