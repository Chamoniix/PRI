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
//import {seanceId} from './CalendarApp';
var valEx;

var ele = new Array(8);
var edit = false;
//var repet = new Array(5);
export default class Seance extends Component<{}> {

  constructor(props){
      super(props);
      this.state = {
          isLoading: true,
          hasInternet: true,
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
		})
        .catch((error) => {
          this.setState({
              hasInternet: false,
              isLoading: false,
          })
        });
    }

  test = () => {
	var k = 1;
	while(rep[k]!=0){
	this.AddSeanceExo(seanceId, ex[k], rep[k], ser[k]);
		k = k + 1;
	}
	this.props.navigation.navigate('CalendarApp');
  }

  render() {
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


	for(var i=1; i<6; i++){
		/*if(edit === false){
			ele[i]=
				<View>
					<Text>{seanceId}</Text>
				</View>
		}else{*/
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
		//}


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
		<Button title="Sauvegarder" style={styles.bouton} onPress={this.test.bind(this)}/>
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
  textTitle:{
      color: 'white',
      fontSize: 20,
      textAlign: 'center',
      margin: 10
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
