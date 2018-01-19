import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  TouchableHighlight,
  ActivityIndicator,
  ListView,
  Alert,
  ScrollView
} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var objectif;

export default class CreatePlan extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            hasInternet: true,
            dataSourceObj: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 === r2}),
            dataSourceAct: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 === r2}),
            selectedAct: '',
            selectedObj: '',
        }
    }

    componentDidMount(){
        this.getActivites();
    }

    getActivites = () => {
        return fetch(path + 'getActivites.php')
        .then((response) => response.json())
        .then((res) => {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 === r2});
            this.setState({
                isLoading: false,
                hasInternet: true,
                dataSourceAct: ds.cloneWithRows(res),
            })
        })
        .catch((error) => {
          this.setState({
              hasInternet: false,
              isLoading: false,
          })
          this.getActivites();
        });
    }

    getObjectifs(activity){
        return fetch(path + 'getObjectifs.php',
        {
            method: "POST",
            headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            body: JSON.stringify({
                    id: activity,
                })
        })
        .then((response) => response.json())
        .then((res) => {
            let dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 === r2});
            this.setState({
                isLoading: false,
                dataSourceObj: dss.cloneWithRows(res),
                hasInternet: true,
            })
        })
        .catch((error) => {
          this.setState({
              hasInternet: false,
              isLoading: false,
          })
          this.getObjectifs(activity);
        });
    }

    goToNextStep(){
        objectif = this.state.selectedObj;
        this.props.navigation.navigate('CreatePlanBis');
    }

  renderAct(rowData, rowID) {
    return (
      <TouchableHighlight onPress={() => {
        this.selectAct(rowData, rowID)
      }}>
        <View style={this.state.selectedAct == rowData.activite_id
          ? styles.viewRowSelected
          : styles.viewRow}>
          <Text style={this.state.selectedAct == rowData.activite_id
            ? styles.viewTextSelected
            : styles.viewText}>
            {rowData.activite_nom}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  selectAct(rowData, rowID) {
    this.setState({selectedAct: rowData.activite_id, isLoading: true, selectedObj: ''});
    this.getActivites();
    this.getObjectifs(rowData.activite_id);
  }

  renderObj(rowData, rowID) {
    return (
      <TouchableHighlight onPress={() => {
        this.selectObj(rowData, rowID)
      }}>
        <View style={this.state.selectedObj == rowData.objectif_id
          ? styles.viewRowSelected
          : styles.viewRow}>
          <Text style={this.state.selectedObj == rowData.objectif_id
            ? styles.viewTextSelected
            : styles.viewText}>
            {rowData.objectif_nom}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  selectObj(rowData, rowID) {
    this.setState({selectedObj: rowData.objectif_id, isLoading: true});
    this.getObjectifs(this.state.selectedAct);
  }

  ListViewItemSeparator = () => {
      return (
            <View style={{height: .5, width: "100%", backgroundColor: "#000",}}/>
       );
  }

    render() {
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, justifyContent: 'center'}}>
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
          <ScrollView style={styles.container}>
            <View>
                <View style={styles.mainTitle}>
                    <Text style={styles.textTitle}>
                    Créer mon plan d'entraînement
                    </Text>
                </View>
                <Text style={styles.presentationText}>"Créer mon plan d'entraînement" vous permet de donner libre court à votre inspiration,
                 et de développer votre plan d'entraînement.
                </Text>
                <Text style={styles.presentationText}>Bénéficiez de conseils avisés et profitez des centaines d'exercices proposés!
                </Text>
                <Text style={styles.presentationText}>Nous commençons par vous demandez quelques informations afin de mieux vous connaître.
                </Text>
            </View>
            <View>
                <View style={styles.secondTitle}>
                    <Text style={styles.textTitle}>
                      Choisissez votre activité:
                    </Text>
                </View>
                <ListView
                    dataSource={this.state.dataSourceAct}
                    renderSeparator={this.ListViewItemSeparator}
                    renderRow={this.renderAct.bind(this)}
                />
                <View style={this.state.selectedAct === ''
                ? styles.invisibleButton
                : styles.secondTitle}>
                    <Text style={this.state.selectedAct === ''
                    ? styles.invisibleText
                    : styles.textTitle}>
                      Choisissez votre objectif:
                    </Text>
                </View>
                <ListView
                    dataSource={this.state.dataSourceObj}
                    renderSeparator={this.ListViewItemSeparator}
                    renderRow={this.renderObj.bind(this)}
                />
                <View style={{alignItems: 'flex-end'}}>
                    <TouchableHighlight underlayColor='rgb(217,217,217)' onPress={() => this.goToNextStep()}
                    style={this.state.selectedObj === ''
                    ? styles.invisibleButton
                    : styles.buttonNext}>
                        <Text style={this.state.selectedObj === ''
                        ? styles.invisibleText
                        : styles.textTitle}>Suivant</Text>
                    </TouchableHighlight>
                </View>
            </View>
          </ScrollView>
        );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    textTitle:{
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
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
        margin: 10,
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
    mainTitle: {
        backgroundColor: 'rgb(125,125,125)',
    },
    secondTitle: {
        backgroundColor: '#FF3366',
    },
    presentationText : {
        textAlign: 'center',
        fontSize: 16,
        margin: 10
    }
});

export {objectif};
