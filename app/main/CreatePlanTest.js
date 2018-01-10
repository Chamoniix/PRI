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
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 === r2
        });
        this.state = {
            isLoading: true,
            dataSourceObj: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            dataSourceAct: ds.cloneWithRows(this.getActivites()),
            selectedID: 'Reprise'
        }
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
    
    GetItem(obj){
        //Alert.alert(obj);
        objectif = obj;
        this.props.navigation.navigate('CreatePlanBis');
    }
    
    GetObj(activity){
        this.setState({
            isLoading: true,
        });
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
            let dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                isLoading: false,
                dataSourceObj: dss.cloneWithRows(res),
            })
        })
        .catch((error) => {
            console.error(error);
        });
    }
    
    /*componentDidMount(){
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
    }*/
    
    ListViewItemSeparator = () => {
        return (
            <View style={{height: .5, width: "100%", backgroundColor: "#000",}}/>
        );
    }
    
    render() {
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
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
                    renderRow={this._renderRow.bind(this)}
                />
                <ListView
                    dataSource={this.state.dataSourceObj}
                    renderSeparator={this.ListViewItemSeparator}
                    renderRow={(rowData) => <Text style={styles.rowViewContainer} onPress={this.GetItem.bind(this, rowData.objectif_id)}>
                    {rowData.objectif_nom}</Text>}
                />
            </View>
          </View>
        );
  }
  
   _renderRow(rowData, rowID) {
    return (
      <TouchableHighlight onPress={() => {
        this._selectedAct(rowData, rowID)
      }}>
        <View style={this.state.selectedID == rowData.activite_nom
          ? styles.weekRowSelected
          : styles.weekRow}>
          <Text style={this.state.selectedID == rowData.activite_nom
            ? styles.weekTextSelected
            : styles.weekText}>
            {rowData.activite_nom}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
  _selectedAct(rowData, rowID) {
    this.setState({selectedID: rowData.activite_nom, dataSourceAct: this.state.dataSourceAct.cloneWithRows(this.getActivites())});
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
    fontSize: 16,
    color: 'yellow',
  },
  weekText: {
    fontSize: 14,
    color: 'blue',
  }
});

export {objectif};