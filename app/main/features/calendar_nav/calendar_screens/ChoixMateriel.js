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

export default class ChoixMateriel extends Component<{}> {

	constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            hasInternet: true,
            dataSourceMatos : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 === r2}),
            materiel: '',
            selectMatosText: 'Choisissez votre matériel:',
            selectedMatos: '',
        }
    }

	componentDidMount(){
    this.getMateriel();
  }

  getMateriel(){
        return fetch(path + 'getChoixMateriel.php')
        .then((response) => response.json())
        .then((res) => {
            this.setState({
                isLoading: false,
                hasInternet: true,
                dataSourceMatos: this.state.dataSourceMatos.cloneWithRows(res),
                materiel: res,
                selectedMatos: '',
            })
        })
        .catch((error) => {
            this.setState({
              hasInternet: false,
              isLoading: false,
          })
          setTimeout(() => this.getMateriel(), 3000);
        });
    }

    renderMatos(rowData, rowID){
      return(
        <TouchableHighlight onPress={() => {
          this.selectMatos(rowData, rowID)
        }}>
          <View style={this.state.selectedMatos == rowData.materiel_id
            ? styles.viewRowSelected
            : styles.viewRow}>
            <Text style={this.state.selectedMatos == rowData.materiel_id
              ? styles.viewTextSelected
              : styles.viewText}>
              {rowData.materiel_nom}
            </Text>
          </View>
        </TouchableHighlight>
      );
    }

    selectMatos(rowData, rowID) {
      if(this.state.selectedMatos !== rowData.materiel_id){
        this.setState({selectedMatos: rowData.materiel_id, dataSourceMatos: this.state.dataSourceMatos.cloneWithRows(this.state.materiel), selectMatosText: 'Matériel choisi:'});
      }
    }

    goToNextStep(){
        this.props.navigation.navigate('ChoixExercice', {muscle: this.props.navigation.state.params.muscle, materiel: this.state.selectedMatos});
    }

	ListViewItemSeparator = () => {
        return (
            <View style={{height: .5, width: "100%", backgroundColor: "#000",}}/>
        );
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
                  {this.state.selectMatosText}
                </Text>
                <ListView
                   dataSource={this.state.dataSourceMatos}
                   renderSeparator={this.ListViewItemSeparator}
                   renderRow={this.renderMatos.bind(this)}
                />
                </View>
                <View style={{alignItems: 'flex-end'}}>
                <TouchableHighlight underlayColor='rgb(217,217,217)' onPress={() => this.goToNextStep()}
                style={this.state.selectedMatos === ''
                ? styles.invisibleButton
                : styles.buttonNext}>
                   <Text style={this.state.selectedMatos === ''
                   ? styles.invisibleText
                   : styles.textTitle}>Suivant</Text>
                </TouchableHighlight>
            </View>
         </ScrollView>
    );
  }
}

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
    viewRowSelected : {
      backgroundColor: 'rgb(125,125,125)'
    },
    viewRow: {
    },
    viewTextSelected: {
      fontSize: 30,
      color: '#F5FCFF',
      textAlign: 'center',
      margin: 10,
    },
    viewText: {
      fontSize: 25,
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
});
