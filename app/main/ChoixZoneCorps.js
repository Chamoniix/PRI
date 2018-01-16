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
  Navigator,
  Alert
} from 'react-native';

//Dimension of screen :
var w = Dimensions.get('window').width;
var h = Dimensions.get('window').height;

var idZone;

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

	zoneChoosen = (rowData) => {
			//Alert.alert(rowData.zone_id);
			idZone = rowData.zone_id;
			this.props.navigation.navigate('ChoixMuscle');
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
            </View>

            <View>
                <Text style={styles.welcome}>
                  Choisissez une zone du corps:
                </Text>
				<ListView
                    dataSource={this.state.dataSourceAct}
                    renderSeparator={this.ListViewItemSeparator}
                    renderRow={(rowData) => <Text style={styles.rowViewContainer} onPress={() => this.zoneChoosen(rowData)}>
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
        fontSize: 30,
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
});

export{idZone};
