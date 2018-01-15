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
  Alert
} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var objectif;

export default class CreatePlan extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
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
        return fetch('http://213.32.66.63/appliPP/getActivites.php')
        .then((response) => response.json())
        .then((res) => {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 === r2});
            this.setState({
                isLoading: false,
                dataSourceAct: ds.cloneWithRows(res),
            })
        })
        .catch((error) => {
            console.error(error);
        });
    }
    
    getObjectifs(activity){
        return fetch('http://213.32.66.63/appliPP/getObjectifs.php',
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
            })
        })
        .catch((error) => {
            console.error(error);
        });
    }
    
    goToNextStep(){
        objectif = this.state.selectedObj;
        //Alert.alert(objectif);
        this.props.navigation.navigate('CreatePlanBis');
    }
    
  renderAct(rowData, rowID) {
    return (
      <TouchableHighlight onPress={() => {
        this.selectAct(rowData, rowID)
      }}>
        <View style={this.state.selectedAct == rowData.activite_id
          ? styles.weekRowSelected
          : styles.weekRow}>
          <Text style={this.state.selectedAct == rowData.activite_id
            ? styles.weekTextSelected
            : styles.weekText}>
            {rowData.activite_nom}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
  
  selectAct(rowData, rowID) {
    this.setState({selectedAct: rowData.activite_id, isLoading: true});
    this.getActivites();
    this.getObjectifs(rowData.activite_id);
  }
  
  renderObj(rowData, rowID) {
    return (
      <TouchableHighlight onPress={() => {
        this.selectObj(rowData, rowID)
      }}>
        <View style={this.state.selectedObj == rowData.objectif_id
          ? styles.weekRowSelected
          : styles.weekRow}>
          <Text style={this.state.selectedObj == rowData.objectif_id
            ? styles.weekTextSelected
            : styles.weekText}>
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
                    <ActivityIndicator size='large' color='rgb(217,217,217)'/>
                </View>
            );
        }
        
        return (
          <View style={styles.container}>
            <View>
                <View style={{backgroundColor:'red'}}>
                    <Text style={styles.textTitle}>
                    Créer mon plan d'entrainement
                    </Text>
                </View>
                <Text>Texte de présentation</Text>
            </View>
            <View>
                <Text style={styles.welcome}>
                  Choisissez votre activité:
                </Text> 
                <ListView
                    dataSource={this.state.dataSourceAct}
                    renderSeparator={this.ListViewItemSeparator}    
                    renderRow={this.renderAct.bind(this)}
                />
                <Text style={styles.welcome}>
                  Choisissez votre objectif:
                </Text> 
                <ListView
                    dataSource={this.state.dataSourceObj}
                    renderSeparator={this.ListViewItemSeparator}
                    renderRow={this.renderObj.bind(this)}
                />
                <TouchableHighlight onPress={() => this.goToNextStep()}>
                    <Text>Prochaine Etape</Text>
                </TouchableHighlight>
            </View>
          </View>
        );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
    textTitle:{
        color: 'white',
        fontSize: 20,
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
      
   rowSelected: {
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'blue',
   },
   weekRowSelected : {
  },
  weekRow: {
  },
  weekTextSelected: {
    fontSize: 22,
    color: 'yellow',
  },
  weekText: {
    fontSize: 20,
    color: 'blue',
  }
});

export {objectif};