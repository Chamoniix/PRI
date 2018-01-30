import React, { Component } from 'react';
import {Calendar} from 'react-native-calendars';
import {
  AppRegistry,
  Platform,
  Alert,
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  TouchableHighlight,
  ListView,
  ScrollView,
  Navigator,
  Picker,
  AsyncStorage,
  RefreshControl
} from 'react-native';

var date;
var id_user;

var listDate=[];
var mark;
var cpt = 0;

var dateMarked=[];
var seanceLaungedId = null;

var rowsPlanByUser = [];
var planNom = "";
var dateSeance = [];

var unefois = true;
export default class CalendarApp extends Component {
	constructor(props){
        super(props);
		this.state = {
			isLoading: true,
            hasInternet: true,
            selectedPlan:planNom,
			idUser:'',
			versCal:"",
		};
		seanceLaungedId = null;
		rowsPlanByUser = [];
	}
 
	componentDidMount(){
        AsyncStorage.getItem('userId').then((value) =>(this.getPlanByUser(value),
		this.GetDateSeance(value, planNom))).done();
    }
	
	CheckSeance(date){
		this.setState({
            isLoading: true,
        });
        return fetch(path + 'getSeance.php',
        {
            method: "POST",
            headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            body: JSON.stringify({
					dateS: date,

                })
        })
        .then((response) => response.json())
		.then((res)=> {
			seanceLaungedId = res[0].seance_id;
			unefois = true;
			this.props.navigation.navigate('Seance');
			this.setState({
                isLoading: false,
            })
		})
        .catch((error) => {
			if(planNom === "" || planNom === "Selectionnez votre plan" ){
				Alert.alert("Choisissez un plan d'entrainement");
			}else{
				unefois = true;
				this.props.navigation.navigate('AddSeance');
			}
			this.setState({
                isLoading: false,
            })
        });
	}
	
	GetDateSeance(userId, planNo){
		this.setState({
            isLoading: true,
        });
        return fetch(path + 'getDateSeanceByUserAndPlan.php',
        {
            method: "POST",
            headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            body: JSON.stringify({
					userid: userId,
					planN: planNo,
                })
        })
        .then((response) => response.json())
		.then((res)=> {
			dateSeance = [];
			dateMarked=[];
            for( var i=0; i<res.length; i++){
              dateSeance[i] = res[i].date_seance;
            }
			this.setState({
                isLoading: false,
            })
		})
        .catch((error) => {
			dateSeance = [];
			dateMarked=[];
			this.setState({
                isLoading: false,
            })
        });
	}

	GetDay(day) {
		date = day.dateString;
		this.CheckSeance(date);
	}
  getPlanByUser(id){
	  this.setState({idUser: id})
	  id_user = this.state.idUser;
        return fetch(path + 'getPlanByUser.php',
        {
            method: "POST",
            headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            body: JSON.stringify({
                    userid: id,
                })
        })
        .then((response) => response.json())
        .then((res) => {
			rowsPlanByUser[0] = "Selectionnez votre plan";
            for( var i=0; i<res.length; i++){
              rowsPlanByUser[i+1] = res[i].plan_nom;
            }
            this.setState({
                isLoading: false,
                //selectedPlan: rowsPlanByUser[0],
                //rowsPlanByUser: rowsPlanByUser,
            })
        })
        .catch((error) => {
			
          this.setState({
              isLoading: false,
          })
        });
    }

	render() {
		if(dateSeance.length!=0){
			for(var i=0; i<dateSeance.length; i++){
             dateMarked[dateSeance[i]]={selected: true, selectedColor: 'green'};
            }
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

    if(this.state.isLoading){
      return(
          <View style={{flex: 1, paddingTop: 20}}>
              <ActivityIndicator size='large' color='rgb(125,125,125)'/>
          </View>
      );
    }

    let planItems = rowsPlanByUser.map( (s, i) => {
           return <Picker.Item key={i} value={s} label={s} />;
       });
	   
   console.disableYellowBox = true;

       return (
    <ScrollView>
      <View>
		<View style={styles.mainTitle}>
			<Text style={styles.textTitle}>Pour creer vos séances, cliquez sur un jour du calendrier</Text>
		</View>
		<View style={styles.secondTitle}>
			<Text style={styles.textTitle}>Selectionnez votre plan ! :)</Text>
		</View>
        <Picker
            selectedValue={planNom}
            onValueChange={ (plan) => (this.setState({selectedPlan:plan}),
								planNom = plan,
								this.GetDateSeance(this.state.idUser, plan)
								) }>
          {planItems}
        </Picker>

        <Text style = {styles.text}>{this.state.user}</Text>
		</View>
	  
      <Calendar
	  theme={{
		backgroundColor: '#ffffff',
		calendarBackground: '#ffffff',
		textSectionTitleColor: '#FF3366',
		selectedDayBackgroundColor: '#00adf5',
		todayTextColor: '#FF3366',
		textDisabledColor: '#FF3366',
		arrowColor: '#FF3366',
		textDayFontSize: 16,
		textMonthFontSize: 16,
		textDayHeaderFontSize: 16
	  }}
      onDayPress={this.GetDay.bind(this)}
      markedDates={dateMarked}
        />
    </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
	  paddingTop :50,
	  paddingBottom : 130,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(204, 204, 204)',
  },
  textTitle:{
      color: 'white',
      fontSize: 20,
      textAlign: 'center',
      margin: 10
  },
  firstTitle: {
	  fontSize: 20,
	  padding :10,
    textAlign:'center',
   // backgroundColor: 'rgb(204, 204, 204)',
  },
    secondTitle: {
        backgroundColor: '#FF3366',
    },
    mainTitle: {
        backgroundColor: 'rgb(125,125,125)',
    },
	
  
});

export {date, seanceLaungedId, planNom, id_user};
