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
  TextInput,
  ScrollView,
  AsyncStorage
} from 'react-native';
import { NavigationActions } from 'react-navigation'

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var planId;

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home'})
  ]
})

export default class CreatePlanBis extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 === r2
        });
        this.state = {
                isLoading: false,
                hasInternet: true,
                duree: '',
                niveau: '',
                nom: '',
                info: '',
                id: '',
                dataSourceDuree: ds.cloneWithRows(this.getDurees()),
                dataSourceNiveau: ds.cloneWithRows(this.getNiveaux()),
                selectDureeText: 'Choisissez votre durée:',
                selectDifficulteText: 'Choisissez votre difficulté:',
        };
    }

    componentDidMount(){
      AsyncStorage.getItem('userId').then((value) => this.setState({id: value})).done();
    }

    getDurees = () => {
        return ["1 mois", "3 mois", "6 mois"];
    }

    getNiveaux = () => {
        return ["Debutant", "Intermediaire", "Confirmé"];
    }

    renderDuree(rowData, rowID){
        return(
            <TouchableHighlight onPress={() => {
                this.selectDuree(rowData, rowID)
            }}>
                <View style={this.state.duree == rowData
                  ? styles.viewRowSelected
                  : styles.viewRow}>
                  <Text style={this.state.duree == rowData
                    ? styles.viewTextSelected
                    : styles.viewText}>
                    {rowData}
                  </Text>
                </View>
            </TouchableHighlight>
        );
    }

    selectDuree(rowData, rowID) {
        this.setState({duree: rowData, dataSourceDuree: this.state.dataSourceDuree.cloneWithRows(this.getDurees()), selectDureeText: 'Durée chosie:'});
    }

    renderNiveaux(rowData, rowID){
        return(
            <TouchableHighlight onPress={() => {
                this.selectNiveaux(rowData, rowID)
            }}>
                <View style={this.state.niveau == rowData
                  ? styles.viewRowSelected
                  : styles.viewRow}>
                  <Text style={this.state.niveau == rowData
                    ? styles.viewTextSelected
                    : styles.viewText}>
                    {rowData}
                  </Text>
                </View>
            </TouchableHighlight>
        );
    }

    selectNiveaux(rowData, rowID) {
        this.setState({niveau: rowData, dataSourceNiveau: this.state.dataSourceNiveau.cloneWithRows(this.getNiveaux()), selectDifficulteText: 'Difficulté chosie:'});
    }

    createPlan(name, length, level, objectifid, information, id, bool){
      this.setState({
            isLoading: bool,
        });
        return fetch(path + 'createPlan.php',
        {
            method: "POST",
            headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            body: JSON.stringify({
                    duree: length,
                    niveau: level,
                    nom: name,
                    info: information,
                    obj: objectifid,
                    idUser: id,
                })
        })
        .then((response) => response.json())
        .then((res) => {
            this.setState({
                isLoading: false,
                hasInternet: true,
            })
            if(res==="Pb d'ajout Plan"){
                //TODO
            }else if(res==="Pb d'ajout Plan_Ut"){
              //TODO
            }else{
              planId = res;
              this.props.navigation.dispatch(resetAction);
              this.props.navigation.navigate('Calendar');
            }
        })
        .catch((error) => {
          this.setState({
              hasInternet: false,
              isLoading: false,
          })
          setTimeout(() => this.createPlan(name, length, level, objectifid, information, id, false), 3000);
        });
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

        const {state} = this.props.navigation;

        return (
          <ScrollView style={styles.container} ref={ref => this.scrollView = ref} onContentSizeChange={(contentWidth, contentHeight)=>{this.scrollView.scrollToEnd({animated: true});}}>
            <View>
                <View style={styles.mainTitle}>
                    <Text style={styles.textTitle}>
                    Créer mon plan d''entrainement
                    </Text>
                </View>
            </View>
            <View>
                <View style={styles.secondTitle}>
                    <Text style={styles.textTitle}>
                        {this.state.selectDureeText}
                    </Text>
                </View>
                <ListView
                    dataSource={this.state.dataSourceDuree}
                    renderSeparator={this.ListViewItemSeparator}
                    renderRow={this.renderDuree.bind(this)}
                />
                <View style={styles.secondTitle}>
                    <Text style={styles.textTitle}>
                        {this.state.selectDifficulteText}
                    </Text>
                </View>
                <ListView
                    dataSource={this.state.dataSourceNiveau}
                    renderSeparator={this.ListViewItemSeparator}
                    renderRow={this.renderNiveaux.bind(this)}
                />
                <View style={styles.secondTitle}>
                    <Text style={styles.textTitle}>
                        Nom de votre plan d'entraînement:
                    </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <TextInput returnKeyType='done' style={styles.textToFill}
                    underlineColorAndroid={'transparent'} onChangeText={(name) => this.setState({nom: name})} value={this.state.nom}/>
                </View>
                <View style={styles.secondTitle}>
                    <Text style={styles.textTitle}>
                        Informations sur votre plan d'entraînement:
                    </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <TextInput returnKeyType='done' style={styles.textToFill} underlineColorAndroid={'transparent'}
                    onChangeText={(comm) => this.setState({info: comm})} value={this.state.info}/>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                    <TouchableHighlight underlayColor='rgb(217,217,217)' onPress={this.createPlan.bind(this, this.state.nom, this.state.duree, this.state.niveau, state.params.objectif, this.state.info, this.state.id, true)}
                    style={this.state.duree === '' || this.state.niveau === '' || this.state.nom === ''
                    ? styles.invisibleButton
                    : styles.buttonNext}>
                        <Text style={this.state.duree === '' || this.state.niveau === '' || this.state.nom === ''
                        ? styles.invisibleText
                        : styles.textTitle}>Créer votre plan</Text>
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
    },
    textToFill:{
       height: height* 0.06,
       width: width*0.8,
       borderWidth: .5,
       borderColor: "#000000",
       margin: 15,
       color: 'rgb(125,125,125)',
       borderRadius:3,
   }
});

export {planId};
