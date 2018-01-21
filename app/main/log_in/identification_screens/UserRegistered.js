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
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.welcome}>Vous êtes désormais inscrit sur Trainy</Text>
                    <TouchableHighlight underlayColor='#db2250' style={styles.button} onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.textButton}>Connectez-vous pour l'utiliser</Text>
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
    button: {
        margin: 15,
        backgroundColor: '#FF3366',
        borderRadius:5,
        width: 150,
    },
});
