import React, { Component } from 'react';
import{
    ScrollView,
    View,
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

export default class UserChoice extends Component {
    render() {
        return(
            <ScrollView style={styles.container}>
                <Text style={styles.welcome}>Bienvenue sur Trainy</Text>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.textTitle}>Déjà inscrit?</Text>
                    <TouchableHighlight underlayColor='#db2250' style={styles.buttonLogin} onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.textButton}>Se connecter</Text>
                    </TouchableHighlight>
                    <Text style={styles.textTitle}>Nouveau sur l'application?</Text>
                    <TouchableHighlight underlayColor='rgb(217,217,217)' style={styles.buttonRegister} onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={styles.textButton}>S'inscrire</Text>
                    </TouchableHighlight>
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
        fontSize: 16,
        textAlign: 'center',
        margin: 10
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 20,
    },
    textButton: {
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
        color: 'white',
    },
    buttonLogin: {
        margin: 15,
        backgroundColor: '#FF3366',
        borderRadius:5,
        width: 120,
    },
    buttonRegister: {
        margin: 15,
        backgroundColor: 'rgb(125,125,125)',
        borderRadius:5,
        width: 120,
    },
});
