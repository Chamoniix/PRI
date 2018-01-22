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
import {planId} from '../../home_nav/home_screens/CreatePlan2';

var seanceId;
var dateM;
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

	AddS(nomS, objS, numS, nbR, infoS, date, planId){
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
					planIdS:planId,

                })
        })
        .then((response) => response.json())
		.then((res)=> {
			seanceId = res;
			dateM = date;
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
			<Text style={styles.firstTitle}>Créer votre seance</Text>
			<Text style={styles.title}>Nom *</Text>
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
			<Text style={styles.title}>Jours de repos qui suivent *</Text>
			<TextInput
				editable = {true}
				maxLength = {40}
				keyboardType = 'numeric'
				 onChangeText={(text) => this.setState({nbRepos: text})}
			  />
			<Text style={styles.title}>Numéros de la séance *</Text>
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
			onPress={this.AddS.bind(this, this.state.nomSeance, this.state.objSeance, this.state.numSeance, this.state.nbRepos, this.state.infoSeance, date, planId)}
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
  textTitle:{
      color: 'white',
      fontSize: 20,
      textAlign: 'center',
      margin: 10
  },
  firstTitle: {
	  fontSize: 20,
	  padding :10,
    textAlign:'center',
   // backgroundColor: 'rgb(204, 204, 204)',
  },
});

export{seanceId, dateM};
