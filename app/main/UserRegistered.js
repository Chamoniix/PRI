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
                <Text>Vous êtes désormais inscrit sur Trainy</Text>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('Login')}>
                    <Text>Connectez-vous pour l'utiliser</Text>
                </TouchableHighlight>
            </ScrollView>
        );
    }
}