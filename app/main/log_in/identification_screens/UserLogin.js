import React, { Component } from 'react';
import{
    ScrollView,
    Text,
    TouchableHighlight,
    TextInput,
    StyleSheet,
    Alert,
    ActivityIndicator,
    View,
    AsyncStorage
} from 'react-native';
import { NavigationActions } from 'react-navigation'

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Login'})
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
                isLoading: false,
                hasInternet: true,
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
                this.setState({errorMsg: true});
            }else{
                userId = res.user_id;
                AsyncStorage.setItem('userId', res.user_id);
                this.props.navigation.dispatch(resetAction);
                this.props.navigation.navigate('IsLoggedIn');
            }
        })
        .catch((error) => {
            this.setState({
              hasInternet: false,
              isLoading: false,
          })
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

        return(
            <ScrollView>
                <Text>Adresse mail ou Identifiant:</Text>
                <TextInput onSubmitEditing={() => this.refs.mdp.focus()} returnKeyType='next' autoCapitalize='none' autoCorrect={false} autoFocus={true} onChangeText={(name) => this.setState({nom: name})} value={this.state.nom}/>
                <Text>Mot de passe:</Text>
                <TextInput ref='mdp' returnKeyType='done' autoCapitalize='none' autoCorrect={false} secureTextEntry={true} onChangeText={(passw) => this.setState({mdp: passw})} value={this.state.mdp}/>
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
    },
    textTitle:{
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
    },
});

export {userId};
