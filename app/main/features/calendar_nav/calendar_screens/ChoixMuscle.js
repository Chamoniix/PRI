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
  Alert,
  ScrollView
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
            dataSourceMuscle : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 === r2}),
            muscles: '',
            selectMuscleText: 'Choisissez un muscle à travailler:',
            selectedMuscle: '',
        }
    }

	componentDidMount(){
    this.getMuscle();
  }

  getMuscle(){
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
                isLoading: false,
                hasInternet: true,
                dataSourceMuscle: this.state.dataSourceMuscle.cloneWithRows(res),
                muscles: res,
                selectedMuscle: '',
            })
        })
        .catch((error) => {
            this.setState({
              hasInternet: false,
              isLoading: false,
          })
          setTimeout(() => this.getMuscle(), 3000);
        });
    }

    renderMuscle(rowData, rowID){
      return(
        <TouchableHighlight onPress={() => {
          this.selectMuscle(rowData, rowID)
        }}>
          <View style={this.state.selectedMuscle == rowData.muscle_id
            ? styles.viewRowSelected
            : styles.viewRow}>
            <Text style={this.state.selectedMuscle == rowData.muscle_id
              ? styles.viewTextSelected
              : styles.viewText}>
              {rowData.muscle_nom}
            </Text>
          </View>
        </TouchableHighlight>
      );
    }

    selectMuscle(rowData, rowID) {
      if(this.state.selectedMuscle !== rowData.muscle_id){
        this.setState({selectedMuscle: rowData.muscle_id, dataSourceMuscle: this.state.dataSourceMuscle.cloneWithRows(this.state.muscles), selectMuscleText: 'Muscle choisi:'});
      }
    }

    goToNextStep(){
        idMuscle = "=" + this.state.selectedMuscle;
        this.props.navigation.navigate('ChoixMateriel');
    }

	ListViewItemSeparator = () => {
        return (
            <View style={{height: .5, width: "100%", backgroundColor: "#000",}}/>
        );
    }

  pass(){
    let ids = " IN (";
    var i=0
    for (i; i<this.state.muscles.length-1; i++)
      ids += this.state.muscles[i].muscle_id + ", ";
    ids += this.state.muscles[i].muscle_id + ")";
    idMuscle = ids;
    this.props.navigation.navigate('ChoixMateriel');
  }


  render() {

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
          <ScrollView style={styles.container} ref={ref => this.scrollView = ref} onContentSizeChange={(contentWidth, contentHeight)=>{this.scrollView.scrollToEnd({animated: true});}}>
            <View>
                <View style={{backgroundColor:'#FF3366'}}>
                    <Text style={styles.textTitle}>
                    Choix de mon exercice
                    </Text>
                </View>
            </View>
            
            <View>
                <Text style={styles.welcome}>
                  {this.state.selectMuscleText}
                </Text>
                <ListView
                   dataSource={this.state.dataSourceMuscle}
                   renderSeparator={this.ListViewItemSeparator}
                   renderRow={this.renderMuscle.bind(this)}
               />
           </View>
           <View style={{alignItems: 'flex-end'}}>
               <TouchableHighlight underlayColor='rgb(217,217,217)' onPress={() => this.goToNextStep()}
               style={this.state.selectedMuscle === ''
               ? styles.invisibleButton
               : styles.buttonNext}>
                   <Text style={this.state.selectedMuscle === ''
                   ? styles.invisibleText
                   : styles.textTitle}>Suivant</Text>
               </TouchableHighlight>
           </View>
           <View style={{alignItems: 'flex-end'}}>
              <TouchableHighlight underlayColor='#db2250' onPress={() => this.pass()} style={styles.buttonPass}>
                  <Text style={styles.textTitle}>Passer cette étape</Text>
              </TouchableHighlight>
           </View>
         </ScrollView>
    );
  }
}

/*<View style={styles.buttonStyle}>
<Button
  onPress={() => this.pass()}
  title="Passer cette étape >"
  color="#FF3366"
  accessibilityLabel="Passer cette etape"
/>*/

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
    textTitle:{
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
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
  },
  viewRowSelected : {
    backgroundColor: 'rgb(125,125,125)'
  },
  viewRow: {
  },
  viewTextSelected: {
    fontSize: 20,
    color: '#F5FCFF',
    textAlign: 'center',
    margin: 10,
  },
  viewText: {
    fontSize: 16,
    textAlign: 'center',
  },
  invisibleText: {
      fontSize: 0,
  },
  invisibleButton: {
      height: 0,
  },
  buttonNext: {
      margin: 15,
      backgroundColor: 'rgb(125,125,125)',
      borderRadius:5,
      width: 120,
  },
  buttonPass: {
    margin: 15,
    backgroundColor: "#FF3366",
    borderRadius:5,
    width: 200,
  }
});

export{idMuscle};
