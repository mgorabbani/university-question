import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,ActivityIndicator
} from 'react-native';

import * as firebase from 'firebase';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Entypo';

import {AdMobBanner} from 'react-native-admob'

import Question from '../components/Question';
import { MonoText } from '../components/StyledText';
import Header from '../components/Header';


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      isLoading:true,
      data :[
        {exam:'quiz', semester:'summer', year:'2014', subjectCode:'swe112', url:'http://lorempixel.com/400/200/' },
        {exam:'quiz', semester:'summer', year:'2014', subjectCode:'swe112', url:'http://lorempixel.com/400/200/' },
        {exam:'quiz', semester:'summer', year:'2014', subjectCode:'swe112', url:'http://lorempixel.com/400/200/' }
      ]
    }
  }
  

  static navigationOptions = ({ navigation }) => ({
    headerTitle:<Text style={{color:'#fff',fontWeight:'bold',}}>DIU QUESTIONS</Text>,

    headerRight: <TouchableOpacity onPress={() => navigation.navigate('Add')} >
      <Icon name="add-to-list" size={24} color="#fff" style={{padding:10}} hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}/>
    </TouchableOpacity>,
    headerLeft: <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
    <Icon name="list" size={24} color="#fff" style={{paddingLeft:10}} />
  </TouchableOpacity>,
  });

componentDidMount(){
  this.fetchData()
}
  fetchData(){
    let that = this;
    var ref = firebase.database().ref("questions/");
    ref.limitToLast(3).once('value').then(function (snapshot) {  
      let newshot= []
      snapshot.forEach(function(data) {
            news= {key:data.key,data:data.val()}
            newshot.push(news)
      });
      console.log(newshot)
      that.setState({
        data: _.reverse(_.values(newshot)),
        isLoading:false
      })

     }).catch((e) => {
        console.error(e)
     })
  }

  renderData() {
    {console.log(this.state.data)}
    if(this.state.isLoading) return  <ActivityIndicator  animating  />
    else {
    return <FlatList style={{ padding: 10 }}
      horizontal
      data={this.state.data}
      keyExtractor={(item, index) => index}
      renderItem={({ item,index }) => <Question item={item} in={index} navigation={this.props.navigation} />}
    />
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation}/>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>

          <View style={styles.welcomeContainer}>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: '#351B9B', padding: 10 }}>Latest Uploads</Text>
              {this.renderData()}
              <Text style={{ fontSize: 18, fontWeight: "bold", color: '#351B9B', padding: 10, paddingHorizontal: 20 }}>Please Uploads Your Question To Help Other Students</Text>
            </View>
          </View>
        

        </ScrollView>
       <View style={{alignItems:'center',justifyContent:'center',marginBottom:10}} >
       <AdMobBanner
          adSize="banner"
          adUnitID="ca-app-pub-7356593470289291/2596088115"
          testDevices={['1587a345eb178ae4']}
          onAdFailedToLoad={error => console.error(error)}
        />
       </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
 
});
