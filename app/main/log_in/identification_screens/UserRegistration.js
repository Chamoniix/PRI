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
    Dimensions
} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class UserRegistration extends Component {

    constructor(props) {
        super(props);
        this.state = {
                mail: '',
                pseudo: '',
                mdp: '',
                mdpBis: '',
                age: '',
                charge: '',
                desc: '',
                errorMsg: '',
                isLoading: false,
                hasInternet: true,
                firstTry: true,
        };
    }

    signIn(){
        this.setState({firstTry: false});
        var re = /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
        if (!re.test(this.state.mail)){
          this.setState({errorMsg: "L'adresse mail entrée n'est pas valide"});
        }else{
          if(this.state.mail==='' || this.state.pseudo==='' || this.state.mdp==='' || this.state.mdpBis==='' || this.state.age===''){
              this.setState({errorMsg: 'Veuillez remplir tous les champs obligatoires'})
          }else if(this.state.mdp.length < 6){
            this.setState({errorMsg: 'Votre mot de passe doit contenir 6 caractères minimum'})
          }else if(this.state.mdp !== this.state.mdpBis){
               this.setState({errorMsg: "Vous n'avez pas retapé le même mot de passe"})
          }else{
              this.setState({isLoading: true})
              return fetch(path + 'signingUp.php',
              {
                  method: "POST",
                  headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json"
                      },
                  body: JSON.stringify({
                          mail: this.state.mail,
                          pseudo: this.state.pseudo,
                          mdp : this.state.mdp,
                          age: this.state.age,
                          charge: this.state.charge,
                          desc: this.state.desc,
                      })
              })
              .then((response) => response.json())
              .then((res) => {
                  this.setState({isLoading: false})
                  if(res === 'Pseudo existe deja'){
                      this.setState({errorMsg: "Ce pseudo est déjà utilisé"});
                  }else if(res === 'Email existe deja'){
                      this.setState({errorMsg: "Cet e-mail est déjà utilisé"});
                  }else{
                      this.props.navigation.navigate('Registered');
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
            <ScrollView style={styles.container} ref={ref => this.scrollView = ref} onContentSizeChange={(contentWidth, contentHeight)=>{this.scrollView.scrollToEnd({animated: true});}}>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.welcome}>Adresse mail*</Text>
                    <TextInput style={styles.textToFill} onSubmitEditing={() => this.refs.pseudo.focus()} returnKeyType='next' autoCapitalize='none'
                    underlineColorAndroid={'transparent'} autoCorrect={false} autoFocus={this.state.firstTry ? true : false} keyboardType='email-address'
                    onChangeText={(inputMail) => this.setState({mail: inputMail})} value={this.state.mail}/>
                    <Text style={styles.welcome}>Pseudo*</Text>
                    <TextInput style={styles.textToFill} ref='pseudo' underlineColorAndroid={'transparent'} onSubmitEditing={() => this.refs.mdp.focus()} returnKeyType='next'
                    autoCapitalize='none' autoCorrect={false} onChangeText={(inputPseudo) => this.setState({pseudo: inputPseudo})} value={this.state.pseudo}/>
                    <Text style={styles.welcome}>Mot de passe*</Text>
                    <TextInput style={styles.textToFill} ref='mdp' underlineColorAndroid={'transparent'} onSubmitEditing={() => this.refs.mdp2.focus()} returnKeyType='next'
                    autoCapitalize='none' autoCorrect={false} secureTextEntry={true} onChangeText={(passw) => this.setState({mdp: passw})} value={this.state.mdp}/>
                    <Text style={styles.welcome}>Retaper le mot de passe*</Text>
                    <TextInput style={styles.textToFill} ref='mdp2' underlineColorAndroid={'transparent'} onSubmitEditing={() => this.refs.age.focus()} returnKeyType='next'
                    autoCapitalize='none' autoCorrect={false} secureTextEntry={true} onChangeText={(passwBis) => this.setState({mdpBis: passwBis})} value={this.state.mdpBis}/>
                    <Text style={styles.welcome}>Votre age*</Text>
                    <TextInput ref='age' onSubmitEditing={() => this.refs.charge.focus()} returnKeyType='next' keyboardType='numeric' underlineColorAndroid={'transparent'}
                    style={styles.textToFill} onChangeText={(inputAge) => this.setState({age: inputAge})} value={this.state.age}/>
                    <Text style={styles.welcome}>Charge soulevée maximale en kg</Text>
                    <TextInput ref='charge' onSubmitEditing={() => this.refs.desc.focus()} returnKeyType='next' keyboardType='numeric' underlineColorAndroid={'transparent'}
                    style={styles.textToFill} onChangeText={(inputCharge) => this.setState({charge: inputCharge})} value={this.state.charge}/>
                    <Text style={styles.welcome}>Décrivez-vous en quelques mots</Text>
                    <TextInput style={styles.textToFill} onSubmitEditing={() => this.signIn()} ref='desc' returnKeyType='done' underlineColorAndroid={'transparent'}
                    underlayColor='#db2250' onChangeText={(inputDesc) => this.setState({desc: inputDesc})} value={this.state.desc}/>
                    <TouchableHighlight style={styles.button} onPress={() => this.signIn()}>
                        <Text style={styles.textButton}>S'inscrire</Text>
                    </TouchableHighlight>
                    <Text style={styles.errorText}>{this.state.errorMsg}</Text>
                    <Text style={styles.welcome}>*: champs obligatoires</Text>
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
        fontSize: 16,
        textAlign: 'center',
        margin: 5,
    },
    button: {
        margin: 15,
        backgroundColor: '#FF3366',
        borderRadius:5,
        width: 120,
    },
    textButton: {
        fontSize: 14,
        textAlign: 'center',
        margin: 10,
        color: 'white',
    },
    textToFill:{
       height: height* 0.05,
       width: width*0.8,
       borderWidth: .5,
       borderColor: "#000000",
       margin: 5,
       color: 'rgb(125,125,125)',
       borderRadius:3,
   }
});
