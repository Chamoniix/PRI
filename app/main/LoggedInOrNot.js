import React, { Component } from 'react';
import {AsyncStorage, View, Text, Alert, ActivityIndicator} from 'react-native';
import { NavigationActions } from 'react-navigation'

export default class LoggedInOrNot extends Component {

    componentWillMount(){
        AsyncStorage.getItem('userId').then((value) => this.checkIfLoggedIn(value)).done();
    }

    checkIfLoggedIn(id){
        this.setState({routeName : id===null || id==='null' ? 'LogIn' : 'UserLoggedIn'});
        this.props.navigation.dispatch(NavigationActions.reset({
                                        index: 0,
                                        actions: [NavigationActions.navigate({ routeName: this.state.routeName})]
                                    }));
    }

    render(){
      return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size='large' color='rgb(125,125,125)'/>
      </View>
      );
    }

}
