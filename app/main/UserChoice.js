import React, { Component } from 'react';
import{
    ScrollView,
    Text,
    TouchableHighlight
} from 'react-native';

export default class UserChoice extends Component {
    render() {
        return(
            <ScrollView>
                <Text>Déjà inscrit?</Text>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('Login')}>
                    <Text>Se connecter</Text>
                </TouchableHighlight>
                <Text>Nouveau sur l'application?</Text>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('Register')}>
                    <Text>S'inscrire</Text>
                </TouchableHighlight>
            </ScrollView>
        );
    }
}