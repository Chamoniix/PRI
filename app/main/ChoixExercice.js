import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  TouchableHighlight,
  ListView,
  ActivityIndicator,
  Navigator
} from 'react-native';

//Dimension of screen :
var w = Dimensions.get('window').width;
var h = Dimensions.get('window').height;


export default class Home extends Component<{}> {
	
	
	constructor(props){
        super(props);
        this.state = {
            isLoading: true,
        }
    }
	
	componentDidMount(){
        return fetch('http://213.32.66.63/appliPP/getZoneCorps.php')
        .then((response) => response.json())
        .then((res) => {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                isLoading: false,
                dataSourceAct: ds.cloneWithRows(res),
            })
        })
        .catch((error) => {
            console.error(error);
        });
    }
	
	ListViewItemSeparator = () => {
        return (
            <View style={{height: .5, width: "100%", backgroundColor: "#000",}}/>
        );
    }

  render() {

    const {navigate} = this.props.navigation;
	
	if(this.state.isLoading){
            return(
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }

    return (
          <View style={styles.container}>
            <View>
                <View style={{backgroundColor:'#FF3366'}}>
                    <Text style={styles.textTitle}>
                    Choix de mon exercice
                    </Text>
                </View>
                <Text style={styles.description}>Choisissez la zone du corps que vous souhaitez travailler, puis le muscle et finalement le matieriel que vous possédez</Text>
            </View>
			
            <View>
                <Text style={styles.welcome}>
                  Choisissez votre activité: 	
                </Text> 
				<ListView
                    dataSource={this.state.dataSourceAct}
                    renderSeparator={this.ListViewItemSeparator}
                    renderRow={(rowData) => <Text style={styles.rowViewContainer}>
                    {rowData.zone_nom}</Text>}
                />
            </View>
         </View>
    );
  }
}

AppRegistry.registerComponent('BackgroundImage', () => BackgroundImage);

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    textTitle:{
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	rowViewContainer: {
        fontSize: 20,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
	description: {
		textAlign: 'center',
		width: '80%',
		marginRight: 'auto',
		marginLeft: 'auto',
		borderRadius: 4,
		borderWidth: 0.5,
		borderColor: '#d6d7da',
	}
});
