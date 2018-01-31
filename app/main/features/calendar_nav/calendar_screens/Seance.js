import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Button,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import {seanceId} from './AddSeance';
import {idExercice, nomExo} from './ChoixExercice';
import {seanceLaungedId} from './CalendarApp';
import {planNom} from './CalendarApp';

// dimensions of the screen
var w = Dimensions.get('window').width;
var h = Dimensions.get('window').height;
// valeur du nombre de serie par exo
var ser = new Array(8);
// initialisation a zero
for(var i=1; i<6; i++){
	ser[i]=0;
}
// valeur du nbr de repetition par exo
var rep = new Array(5);
// initialisation a zero
rep[1]=0;
rep[2]=0;
rep[3]=0;
rep[4]=0;
rep[5]=0;
// valeur de l'id exo
var ex = new Array(8);
// associer l'exercice a la bonne place
var valEx;
// valeur de l'exo
var ele = new Array(8);
// nom exo
var exoNom = [];
// variable pour savoir si on a deja choisi des exos (ou si on vient de addSeance du coup)
var choixExo = false;

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'CalendarApp'})
  ]
})

export default class Seance extends Component<{}> {

	constructor(props){
        super(props);
		this.state = {
			isLoading: false,
			hasInternet: true,
			edit: true,
		};
	}

	componentDidMount(){

		if(seanceLaungedId != null){
      this.descriptionSeance(seanceLaungedId);
		    this.InfoSeance(seanceLaungedId)
		}
	}

	initialization(){
		for(var i=1; i<6; i++){
			ser[i]=0;
		}
		for(var i=1; i<6; i++){
			rep[i]=0;
		}
		exoNom = [];
		ex = new Array(8);
		choixExo = false;
	}

  gotToChoixZoneCorps = (value) => {
    this.props.navigation.navigate('ChoixZoneCorps');
    valEx = value;
	choixExo=true;
  }

  AddSeanceExo(seanceId, idEx, nbrR, nbrS){
       this.setState({
            isLoading: true,
        });
        return fetch(path + 'addSeanceExo.php',
        {
            method: "POST",
            headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            body: JSON.stringify({
                    sId: seanceId,
					idE: idEx,
					nRep: nbrR,
					nSerie: nbrS,
                })
        })
		.then((res)=> {
			err = res;
			this.setState({
                isLoading: false,
            })
		})
        .catch((error) => {
			this.setState({
              hasInternet: false,
                isLoading: false,
            })
            console.error(error);
        });
    }

    descriptionSeance(seanceLaungedId){
         this.setState({
              isLoading: true,
          });
          return fetch(path + 'getSeanceDescription.php',
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
  		.then((res)=> {
  		  if(res !== '0 result'){
          this.setState({
            nomSeance: res[0].seance_nom,
            objectifSeance: res[0].seance_objectif,
            planSeance: res[0].plan_nom,
            infoSeance: res[0].seance_info,
          });
  				}

  			this.setState({
                  isLoading: false,
              })
  		})
          .catch((error) => {
  			this.setState({
                hasInternet: false,
                  isLoading: false,
              })
              console.error(error);
          });
      }

	InfoSeance(seanceLaungedId){
       this.setState({
            isLoading: true,
        });
        return fetch(path + 'getInfoSeance.php',
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
		.then((res)=> {
		  if(res !== '0 result'){
				for( var i=0; i<res.length; i++){
					exoNom[i] = res[i].exercice_nom;
					rep[i+1] = res[i].nbr_repetiion;
					ser[i+1] = res[i].nbr_serie;
				}
				this.setState({
					edit: false,
				});
		  }
			this.setState({
                isLoading: false,
            })
		})
        .catch((error) => {
			this.setState({
              hasInternet: false,
                isLoading: false,
            })
            console.error(error);
        });
    }

  test = () => {
	var k = 1;
	//this.InfoSeance(seance_id);
	//if(seanceLaungedId===null){
	if(this.state.edit === true){
		while(rep[k]!=0){
		this.AddSeanceExo(seanceId, ex[k], rep[k], ser[k]);
			k = k + 1;
		}

	}
	// re initialisation des variables
	for(var i=1; i<6; i++){
		ser[i]=0;
	}
	for(var i=1; i<6; i++){
		rep[i]=0;
	}
	// on va a calandarApp
	this.props.navigation.dispatch(resetAction);
	this.initialization();

  }

  editTrue= () => {
	  this.setState({edit:true});
  }

  render() {
   if(this.state.isLoading){
      return(
          <View style={{flex: 1, paddingTop: 20}}>
              <ActivityIndicator size='large' color='rgb(125,125,125)'/>
          </View>
      );
    }
    if(idExercice!=null){
		ex[valEx]=idExercice;
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


	// si la seance est deja creee, on affiche ce qu'il y a dedans
	if(this.state.edit === false){
		for(var i=1; i<6; i++){
			ele[i]=
				<View>
					<Text>{exoNom[i-1]}</Text>
				</View>
		}
	}else{
		for(var i=1; i<6; i++){
			if(choixExo!= false){
				if(ex[i]===idExercice){
					ele[i]=
						<TouchableOpacity onPress={this.gotToChoixZoneCorps.bind(this,i)}>
							<View>
								<Text>{nomExo}</Text>
							</View>
						</TouchableOpacity>
				}
			}else{
				ele[i]=
					<TouchableOpacity onPress={this.gotToChoixZoneCorps.bind(this,i)}>
						<View>
							<Text>choisir</Text>
						</View>
					</TouchableOpacity>

			}

		}
	}


	const repet = (value) => (
		<View >
		  <TextInput
			editable = {true}
			maxLength = {40}
			keyboardType = 'numeric'
			defaultValue={rep[value].toString()}
			onChangeText={(text) => {rep[value]=text}}
		  />
		</View>
	);
	const serie = (value) => (
		<View >
		  <TextInput
			editable = {true}
			maxLength = {40}
			keyboardType = 'numeric'
			defaultValue={ser[value].toString()}
			onChangeText={(text) => {ser[value]=text}}
		  />
		</View>
	);


	const tableHead = ['', 'Atelier', 'Nombre de serie', 'Nombre de repetition'];
	const tableData = [
      ['1', ele[1], serie(1), repet(1)],
      ['2', ele[2], serie(2), repet(2)],
      ['3', ele[3], serie(3), repet(3)],
      ['4', ele[4], serie(4), repet(4)],
      ['5', ele[5], serie(5), repet(5)],
    ];
    return (
      <View>
      <View style={styles.mainTitle}>
          <Text style={styles.textTitle}>
            {this.state.planSeance} - {this.state.nomSeance}
          </Text>
      </View>

      <ScrollView>
	  <View>
		<View>
		</View>
		<Table style={styles.table}  borderStyle={{borderWidth: 0.5, borderColor: '#c8e1ff'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.headText}/>
          <Rows data={tableData} style={styles.row} textStyle={styles.text}/>
        </Table>
      <View>
          <Text style={styles.description}>
            Objectif : {this.state.objectifSeance}
          </Text>
          <Text style={styles.description}>
            Info     : {this.state.infoSeance}
          </Text>
      </View>
		{(() => {
			if(this.state.edit === false){
				return(
					<View style={styles.buttons}>
						<View style={styles.buttonStyleModif}>
							<Button title="Modifier" color="#FF3366" onPress={this.editTrue.bind()}/>
						</View>
						<View style={styles.buttonStyleComm}>
							<Button title="Commencer >" color="#FF3366" onPress={() => {this.props.navigation.navigate('LaunchSeance'),
																						this.initialization()}}/>
						</View>
					</View>
				);
			}else{
				return(
					<View style={{alignItems: 'flex-end'}}>
						<TouchableHighlight underlayColor='rgb(217,217,217)'  onPress={this.test.bind(this)} style={styles.buttonNext}>
							<Text style={ styles.textTitle}>Sauvegarder</Text>
						</TouchableHighlight>
					</View>
				);
			}

       })()}
	   </View>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  table:{
  },
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
      margin: 10
  },
  mainTitle: {
      backgroundColor: 'rgb(125,125,125)',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  textTitle:{
      color: 'white',
      fontSize: 20,
      textAlign: 'center',
      margin: 10
  },
  head: {
	width : w,
	height: w/5,
	 backgroundColor: '#FF3366',
  },
  headText: {
	textAlign:'center',
	fontSize : 15,
	color : 'white',
  },
  text: {
	textAlign:'center',
	fontSize : 20,
	color : 'black',
  },
  row: {
	width : w,
	height: w/5,
	backgroundColor: 'white'
	},
  buttons: {
    flexDirection: 'row',
  },
  buttonStyleModif: {
    marginTop: 30,
    paddingLeft: 10,
    flex: 0.5,
    alignItems: 'flex-start',
  },
  description: {
    fontSize : 20,
    color : 'grey'
  },
  buttonStyleComm: {
    marginTop: 30,
    paddingRight: 10,
    flex: 0.5,
    alignItems: 'flex-end',
  },
  buttonNext: {
        margin: 15,
        backgroundColor: 'rgb(125,125,125)',
        borderRadius:5,
        width: 150,
    },
});

export{seanceLaungedId}
