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

import {idZone} from './ChoixZoneCorps.js';

var idMuscle;

export default class ChoixMuscle extends Component<{}> {


	constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            hasInternet: true,
        }
    }

	componentDidMount(){
        return fetch(path + 'getMuscleByZone.php',
        {
            method: "POST",
            headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            body: JSON.stringify({
                    zoneid: idZone,
                })
        })
        .then((response) => response.json())
        .then((res) => {
            this.setState({
              muscles: res,
            });
             let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

            this.setState({
                isLoading: false,
                dataSourceAct: ds.cloneWithRows(res),
            })
        })
        .catch((error) => {
            this.setState({
              hasInternet: false,
              isLoading: false,
          })
        });
    }

	ListViewItemSeparator = () => {
        return (
            <View style={{height: .5, width: "100%", backgroundColor: "#000",}}/>
        );
    }

	muscleChoosen = (rowData) => {
		idMuscle = "=" + rowData.muscle_id;
		this.props.navigation.navigate('ChoixMateriel');
	}

  pass = () => {
    let ids = " IN (";
    var i=0
    for (i; i<this.state.muscles.length-1; i++)
      ids += this.state.muscles[i].muscle_id + ", ";
    ids += this.state.muscles[i].muscle_id + ")";
    idMuscle = ids;
    this.props.navigation.navigate('ChoixMateriel');
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
                  Choisissez un muscle à travailler:
                </Text>
				        <ListView
                    dataSource={this.state.dataSourceAct}
                    renderSeparator={this.ListViewItemSeparator}
                    renderRow={(rowData) => <Text style={styles.rowViewContainer} onPress={() => this.muscleChoosen(rowData)}>
                    {rowData.muscle_nom}</Text>}
                />
            </View>
              <View style={styles.buttonStyle}>
              <Button
                onPress={() => this.pass()}
                title="Passer cette étape >"
                color="#FF3366"
                accessibilityLabel="Passer cette etape"
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
  buttonStyle: {
    marginTop: 30,
    paddingRight: 10,
    width: '100%',
    alignItems: 'flex-end',
  }
});

export{idMuscle};
