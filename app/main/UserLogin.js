import React, { Component } from 'react';
import{
    ScrollView,
    Text,
    TouchableHighlight,
    TextInput,
    StyleSheet,
    Alert,
    ActivityIndicator,
    View
} from 'react-native';
import { NavigationActions } from 'react-navigation'

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'UserLoggedIn'})
  ]
})

var userId;

export default class UserLogin extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
                nom: '',
                mdp: '',
                errorMsg: false,
                isLoading: false 
        };
    }
    
    logIn(){
        this.setState({isLoading: true})
        return fetch(path + 'loggingIn.php',
        {
            method: "POST", 
            headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            body: JSON.stringify({
                    id: this.state.nom,
                    password : this.state.mdp,
                })
        })
        .then((response) => response.json())
        .then((res) => {
            this.setState({isLoading: false})
            if(res === 'false'){
                this.setState({errorMsg: 'true'});
            }else{
                Alert.alert(res);
                //this.props.navigation.dispatch(resetAction);
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }
    
    render() {
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator size='large' color='rgb(125,125,125)'/>
                </View>
            );
        }
        
        return(
            <ScrollView>
                <Text>Adresse mail ou Identifiant:</Text>
                <TextInput onChangeText={(name) => this.setState({nom: name})} value={this.state.nom}/>
                <Text>Mot de passe:</Text>
                <TextInput onChangeText={(passw) => this.setState({mdp: passw})} value={this.state.mdp}/>
                <TouchableHighlight onPress={() => this.logIn()}>
                    <Text>Se connecter</Text>
                </TouchableHighlight>
                <Text style={this.state.errorMsg === false
                ? styles.invisibleText
                : styles.errorText}>L'identifiant ou le mot de passe entré est incorrect</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    invisibleText: {
        fontSize: 0,
    },
    errorText: {
        color: 'red',
        fontSize: 20,
    }
});

export {userId};