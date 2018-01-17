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
} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
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

var seanceId = 39;
import {idExercice, nomExo} from './ChoixExercice';
import {seanceLaungedId} from './CalendarApp';
var valEx;

var ele = new Array(8);
var edit = false;
// nom exo
var exoNom = [];

export default class Seance extends Component<{}> {
	constructor(props){
        super(props);
		this.state = {
			isLoading: false,
		};
	}
	
	componentDidMount(){
		if(seanceLaungedId != null){
			
		this.InfoSeance(seanceLaungedId)
		}
	}
   gotToChoixZoneCorps = (value) => {
	   
	this.props.navigation.navigate('ChoixZoneCorps');
	valEx = value;
	/*ex[value] = idExercice;
	Alert.alert("idExercice "+idExercice);*/
  }
  
  AddSeanceExo(seanceId, idEx, nbrR, nbrS){
       this.setState({
            isLoading: true,
        });
        return fetch('http://213.32.66.63/appliPP/addSeanceExo.php',
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
                isLoading: false,
            })
            console.error(error);
        });
    }
   
	InfoSeance(seanceLaungedId){
       this.setState({
            isLoading: true,
        });
		//Alert.alert(seance_id);
        return fetch('http://213.32.66.63/appliPP/getInfoSeance.php',
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
			for( var i=0; i<res.length; i++){
              exoNom[i] = res[i].exercice_nom;
			  rep[i+1] = res[i].nbr_repetiion;
			  ser[i+1] = res[i].nbr_serie;			  
            }
			this.setState({
                isLoading: false,
            })
			//Alert.alert("rep1 "+rep[1]+" rep2 "+rep[2]);
		})
        .catch((error) => {
			this.setState({
                isLoading: false,
            })
            console.error(error);
        });
    }
  test = () => {
	var k = 1;
	//this.InfoSeance(seance_id);
	if(seanceLaungedId===null){
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
	this.props.navigation.navigate('CalendarApp');
	}
  
  render() {
   if(this.state.isLoading){
      return(
          <View style={{flex: 1, paddingTop: 20}}>
              <ActivityIndicator />
          </View>
      );
    }
    if(idExercice!=null){
		ex[valEx]=idExercice;
	}
	
	// si la seance est deja creee, on affiche ce qu'il y a dedans
	if(seanceLaungedId != null){	
		for(var i=1; i<6; i++){
			ele[i]=
				<View>
					<Text>{exoNom[i-1]}</Text>
				</View>
		}
	}else{
		for(var i=1; i<6; i++){
			if(idExercice != null){
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
	
	
	const tableHead = ['', 'Atelier', 'Nombre de serie', 'Nombre de repetion'];
    /*const tableData = [
      ['1', ele[1], serie(1), repet[1]],
      ['2', ele[2], serie(2), repet[2]],
      ['3', ele[3], serie(3), repet[3]],
      ['4', ele[4], serie(4), repet[4]],
      ['5', ele[5], serie(5), repet[5]],
    ];*/
	const tableData = [
      ['1', ele[1], serie(1), repet(1)],
      ['2', ele[2], serie(2), repet(2)],
      ['3', ele[3], serie(3), repet(3)],
      ['4', ele[4], serie(4), repet(4)],
      ['5', ele[5], serie(5), repet(5)],
    ];
    return (
      <ScrollView>
		<Table style={styles.table}>
          <Row data={tableHead} style={styles.head} textStyle={styles.headText}/>
          <Rows data={tableData} style={styles.row} textStyle={styles.text}/>
        </Table>
		{(() => {
			if(seanceLaungedId != null){
				return(
					<View>
						<Button title="Modifier" style={styles.bouton} onPress={() => {edit=true}}/>
						<Button title="Commencer" style={styles.bouton} onPress={this.test.bind(this)}/>
					</View>
				);
			}else{
				return(
					<Button title="Sauvegarder" style={styles.bouton} onPress={this.test.bind(this)}/>
				);
			}
			
       })()}
      </ScrollView>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  head: { 
	width : w, 
	height: w/5, 
	backgroundColor: 'rgb(140,140,140)'
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
	backgroundColor: 'rgb(208,208,208)'
	},
  bouton: {
	  paddingTop:10,
	  paddingBottom:10,
  }
});

