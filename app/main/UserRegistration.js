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
                isLoading: false 
        };
    }
    
    signIn(){
        if(this.state.mail==='' || this.state.pseudo==='' || this.state.mdp==='' || this.state.mdpBis==='' || this.state.age===''){
            this.setState({errorMsg: 'Veuillez remplir tous les champs obligatoires'})
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
                if(res === 'Existe deja'){
                    this.setState({errorMsg: "L'utilisateur " + this.state.pseudo + " est déjà inscrit"});
                }else{
                    Alert.alert(res.toString());
                    //this.props.navigation.navigate('UserLoggedIn');
                }
            })
            .catch((error) => {
                console.error(error);
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
        
        return(
            <ScrollView>
                <Text>Adresse mail*</Text>
                <TextInput keyboardType='email-address' onChangeText={(inputMail) => this.setState({mail: inputMail})} value={this.state.mail}/>
                <Text>Pseudo*</Text>
                <TextInput onChangeText={(inputPseudo) => this.setState({pseudo: inputPseudo})} value={this.state.pseudo}/>
                <Text>Mot de passe*</Text>
                <TextInput onChangeText={(passw) => this.setState({mdp: passw})} value={this.state.mdp}/>
                <Text>Retaper le mot de passe*</Text>
                <TextInput onChangeText={(passwBis) => this.setState({mdpBis: passwBis})} value={this.state.mdpBis}/>
                <Text>Votre age*</Text>
                <TextInput keyboardType='numeric' onChangeText={(inputAge) => this.setState({age: inputAge})} value={this.state.age}/>
                <Text>Charge soulevée maximale en kg</Text>
                <TextInput keyboardType='numeric' onChangeText={(inputCharge) => this.setState({charge: inputCharge})} value={this.state.charge}/>
                <Text>Décrivez-vous en quelques mots</Text>
                <TextInput onChangeText={(inputDesc) => this.setState({desc: inputDesc})} value={this.state.desc}/>
                <TouchableHighlight onPress={() => this.signIn()}>
                    <Text>S'inscrire</Text>
                </TouchableHighlight>
                <Text>*: champs obligatoires</Text>
                <Text style={styles.errorText}>{this.state.errorMsg}</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        fontSize: 20,
    }
});