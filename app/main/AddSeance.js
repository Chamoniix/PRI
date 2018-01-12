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
  Navigator,
  ActivityIndicator,
  TouchableHighlight,
  ListView,
  ScrollView,
  TextInput,
} from 'react-native';

import {date} from './CalendarApp';


export default class AddSeance extends Component<{}> {
	constructor(props){
        super(props);
        this.state = {
            isLoading: true,
			nomSeance : "",
			infoSeance : "",
			objSeance : "",
			numSeance : 0,
			nbRepos : 0
        }
    }
	
	AddS(nomS, objS, numS, nbR, infoS, date){
        this.setState({
            isLoading: true,
        });
        return fetch('http://213.32.66.63/appliPP/addSeance.php',
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
					
                })
        })
		.then(() => this.props.navigation.navigate('Seance'))
		.then((res)=> {
			lastId = res;
		})
        .catch((error) => {
            console.error(error);
        });
    }
	
	showAlert = () => {
      Alert.alert(date)
   }
   
	render() {
		return(
			<ScrollView>
			<Text style={styles.title}>Nom</Text>
			<TextInput
				editable = {true}
				maxLength = {40}
				 onChangeText={(text) => this.setState({nomSeance: text})}
			  />
			<Text style={styles.title}>Objectif</Text>
			<TextInput
				editable = {true}
				maxLength = {40}
				onChangeText={(text) => this.setState({objSeance: text})}
			  />
			<Text style={styles.title}>Jours de repos qui suivent</Text>
			<TextInput
				editable = {true}
				maxLength = {40}
				keyboardType = 'numeric'
				 onChangeText={(text) => this.setState({nbRepos: text})}
			  />
			<Text style={styles.title}>Numéros de la séance</Text>
			<TextInput
				editable = {true}
				maxLength = {40}
				keyboardType = 'numeric'
				 onChangeText={(text) => this.setState({numSeance: text})}
			  />
			<Text style={styles.title}>Informations</Text>
			<TextInput
				editable = {true}
				maxLength = {140}
				 onChangeText={(text) => this.setState({infoSeance: text})}
			  />
			  
			  
			<Button 
			onPress={this.showAlert}
			title="Continuer" style={styles.bouton}/>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
  title: {
	  paddingTop :10,
    textAlign:'center',
    backgroundColor: 'rgb(204, 204, 204)',
  },
});