import React, { Component } from 'react';
import { Calendar} from 'react-native-calendars';
import {
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

//import {dateSeance} from './CalendarApp';


export default class AddSeance extends Component<{}> {
	render() {
		return(
			<ScrollView>
			<Text style={styles.title}>Nom</Text>
			<TextInput
				editable = {true}
				maxLength = {40}
			  />
			<Text style={styles.title}>Objectif</Text>
			<TextInput
				editable = {true}
				maxLength = {40}
			  />
			<Text style={styles.title}>Jours de repos qui suivent</Text>
			<TextInput
				editable = {true}
				maxLength = {40}
			  />
			<Text style={styles.title}>Numéros de la séance</Text>
			<TextInput
				editable = {true}
				maxLength = {40}
			  />
			<Text style={styles.title}>Informations</Text>
			<TextInput
				editable = {true}
				maxLength = {140}
			  />
			  
			  
			<Button title="Continuer" style={styles.bouton}/>
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