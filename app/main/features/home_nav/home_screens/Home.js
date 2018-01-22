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
  ActivityIndicator,
  Alert,
  AsyncStorage
} from 'react-native';

//Dimension of screen :
var w = Dimensions.get('window').width;
var h = Dimensions.get('window').height;

export default class Home extends Component<{}> {

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            hasInternet: true,
            userName: '',
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('userId').then((value) => this.getPseudo(value)).done();
    }

    getPseudo(identifiant){
        return fetch(path + 'php/getUserName.php',
        {
            method: "POST",
            headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            body: JSON.stringify({
                    id:  identifiant,
                })
        })
        .then((response) => response.json())
        .then((res) => {
            this.setState({
                isLoading: false,
                hasInternet: true,
                userName: res.user_pseudo,
            })
        })
        .catch((error) => {
          this.setState({
              hasInternet: false,
              isLoading: false,
          })
          this.getPseudo(identifiant);
        });
    }

    render() {

    let imgCreer = require('../../../../img/creerAccueil.jpg');
    let imgSuivre = require('../../../../img/gainage.jpg');
    let imgPartage = require('../../../../img/partageAccueil.jpg');

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
        <View style={styles.container}>
            <View style={styles.section}>
                <View style={[styles.textContain, {backgroundColor: '#000'}]}>
                    <Text style={styles.caption}>
                        Bienvenue {this.state.userName}!
                    </Text>
                </View>
                <View>
                    <Image source={imgCreer} style={{height: h*0.2, width: w, opacity: 0.7}}/>
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.textContain}>
                    <Text style={styles.caption} onPress={() => this.props.navigation.navigate('CreatePlan')}>
                        Créer un plan
                    </Text>
                </View>
                <View>
                    <Image source={imgSuivre} style={{height: h*0.2, width: w, opacity: 0.7}}/>
                </View>
            </View>

            <View style={styles.section}>
                <View style={[styles.textContain, , {backgroundColor: '#CCC'}]} >
                    <Text style={styles.caption}>
                        Suivre un plan
                    </Text>
                </View>
                <View>
                  <Image source={imgPartage} style={{height: h*0.2, width: w, opacity: 0.7}}/>
                </View>
            </View>
        </View>
    );
  }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    section: {
        flex: 0.5,
    },
    textContain: {
        flex: 1,
        backgroundColor: '#FF3366',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    caption: {
      color: 'white',
      fontSize: 36,
      textAlign: 'center',
    },
    textTitle:{
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
});
