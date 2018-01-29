import React, { Component } from 'react';
import { Calendar} from 'react-native-calendars';
import {
  AppRegistry,
  Platform,
  Alert,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  Navigator,
  ActivityIndicator,
  TouchableHighlight,
  ListView,
  ScrollView,
  TextInput,
} from 'react-native';

import {date, planNom, id_user} from './CalendarApp';
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var seanceId;
export default class AddSeance extends Component<{}> {
	constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            hasInternet: true,
      			nomSeance : "",
      			infoSeance : "",
      			objSeance : "",
      			numSeance : 0,
      			nbRepos : 0
        }
    }

	AddS(nomS, objS, numS, nbR, infoS, date, planNom, id_user){
        this.setState({
            isLoading: true,
        });
        return fetch(path + 'addSeance.php',
        {
            method: "POST",
            headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            body: JSON.stringify({
                    name: nomS,
					obj: objS,
					num: numS,
					nbRepos: nbR,
					info: infoS,
					dateS: date,
					planIdS:planNom,
					userId: id_user,

                })
        })
        .then((response) => response.json())
		.then((res)=> {
			seanceId = res;
			this.props.navigation.navigate('Seance');
			this.setState({
                isLoading: false,
            })
		})
        .catch((error) => {
          this.setState({
              hasInternet: false,
              isLoading: false,
          })
        });
    }

	render() {
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
    
    if(this.state.isLoading){
            return(
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator size='large' color='rgb(125,125,125)'/>
                </View>
            );
        }

		return(
			<ScrollView>
			<View style={styles.mainTitle}>
				<Text style={styles.textTitle}>Créer votre seance</Text>
			</View>
			<View style={styles.secondTitle}>
			<Text style={styles.textTitle}>Nom *</Text>
			</View>
			<TextInput
				editable = {true}
				maxLength = {40}
				 style={styles.textToFill}
				 onChangeText={(text) => this.setState({nomSeance: text})}
			  />
			  
			  <View style={styles.secondTitle}>
			<Text style={styles.textTitle}>Objectif</Text>
			</View>
			<TextInput
				editable = {true}
				maxLength = {40}
				 style={styles.textToFill}
				onChangeText={(text) => this.setState({objSeance: text})}
			  />
			  
			  <View style={styles.secondTitle}>
			<Text style={styles.textTitle}>Numéros de la séance *</Text>
			</View>
			<TextInput
				editable = {true}
				maxLength = {40}
				keyboardType = 'numeric'
				 style={styles.textToFill}
				 onChangeText={(text) => this.setState({numSeance: text})}
			  />
			  <View style={styles.secondTitle}>
			<Text style={styles.textTitle}>Informations</Text>
			</View>
			<TextInput
				editable = {true}
				maxLength = {140}
				 style={styles.textToFill}
				 onChangeText={(text) => this.setState({infoSeance: text})}
			  />

			
			<View style={{alignItems: 'flex-end'}}>
				<TouchableHighlight underlayColor='rgb(217,217,217)'
				onPress={this.AddS.bind(this, this.state.nomSeance, this.state.objSeance, this.state.numSeance, this.state.nbRepos, this.state.infoSeance, date, planNom, id_user)}
				style={this.state.nomSeance === '' || this.state.numSeance === 0 ? styles.invisibleButton
						: styles.buttonNext}>
					 <Text style={this.state.nomSeance === '' || this.state.numSeance === 0
								? styles.invisibleText
								: styles.textTitle}>Sauvegarder</Text>
					
				</TouchableHighlight>
			</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
  
    textTitle:{
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
  textTitle:{
      color: 'white',
      fontSize: 20,
      textAlign: 'center',
      margin: 10
  },
    mainTitle: {
        backgroundColor: 'rgb(125,125,125)',
    },
  firstTitle: {
	  fontSize: 20,
	  padding :10,
    textAlign:'center',
   // backgroundColor: 'rgb(204, 204, 204)',
  },
    secondTitle: {
        backgroundColor: '#FF3366',
    },
  buttonNext: {
        margin: 15,
        backgroundColor: 'rgb(125,125,125)',
        borderRadius:5,
        width: 150,
    },
	
    invisibleText: {
        fontSize: 0,
    },
    textToFill:{
       height: height* 0.06,
       width: width*0.8,
       borderWidth: .5,
       borderColor: "#000000",
       margin: 15,
       color: 'rgb(125,125,125)',
		borderRadius:3,
   },
});

export{seanceId};
