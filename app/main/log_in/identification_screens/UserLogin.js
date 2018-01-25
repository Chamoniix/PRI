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
    AsyncStorage,
    Dimensions,
} from 'react-native';
import { NavigationActions } from 'react-navigation'

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

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
                errorMsg: '',
                isLoading: false,
                hasInternet: true,
        };
    }

    componentDidMount(){
      AsyncStorage.getItem('userPseudo').then((value) => this.setState({nom: value})).done();
      AsyncStorage.getItem('userMdp').then((value) => this.setState({mdp: value})).done();
    }

    logIn(){
        if(this.state.nom === ''){
          this.setState({errorMsg: "Veuillez entrer un identifiant"});
        }else if(this.state.mdp === ''){
          this.setState({errorMsg: "Veuillez entrer un mot de passe"});
        }else{
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
                    this.setState({errorMsg: "L'identifiant ou le mot de passe entré est incorrect"});
                }else{
                    userId = res.user_id;
                    AsyncStorage.setItem('userId', res.user_id);
                    AsyncStorage.setItem('userPseudo', this.state.nom);
                    AsyncStorage.setItem('userMdp', this.state.mdp);
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
            <ScrollView style={styles.container}>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.welcome}>Adresse mail ou Identifiant:</Text>
                    <TextInput style={styles.textToFill} onSubmitEditing={() => this.refs.mdp.focus()} returnKeyType='next' autoCapitalize='none'
                    autoCorrect={false} autoFocus={true}  underlineColorAndroid={'transparent'} onChangeText={(name) => this.setState({nom: name})} value={this.state.nom}/>
                    <Text style={styles.welcome}>Mot de passe:</Text>
                    <TextInput ref='mdp' returnKeyType='done' autoCapitalize='none'  underlineColorAndroid={'transparent'} autoCorrect={false} secureTextEntry={true}
                    onSubmitEditing={() => this.logIn()} onChangeText={(passw) => this.setState({mdp: passw})} value={this.state.mdp} style={styles.textToFill}/>
                    <TouchableHighlight underlayColor='#db2250' style={styles.button} onPress={() => this.logIn()}>
                        <Text style={styles.textButton}>Se connecter</Text>
                    </TouchableHighlight>
                    <Text style={styles.errorText}>{this.state.errorMsg}</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        fontSize: 20,
        textAlign: 'center',
    },
    textTitle:{
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        margin: 15,
        backgroundColor: '#FF3366',
        borderRadius:5,
        width: 120,
    },
    textButton: {
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
        color: 'white',
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

export {userId};
