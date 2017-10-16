import React, { Component } from 'react';
import { View, Text, FlatList,ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';
import _ from 'lodash';

import Question from '../components/Question'



 class Search extends Component {
   constructor(props){
     super(props)
     this.state ={
      isLoading:true,
      data :[
        {exam:'quiz', semester:'summer', year:'2014', subjectCode:'swe112', url:'http://lorempixel.com/400/200/' }
      ]
    }
   }
  static navigationOptions = ({ navigation }) => ({
    headerTitle:<Text style={{color:'#fff',fontWeight:'bold',}}>Search Subject Code: {navigation.state.params.keyword.toUpperCase()} </Text>,

    headerTintColor:'#DFFEE6'
  });


  renderData(){
    if(this.state.isLoading) return  <View style={{marginTop:100}} ><ActivityIndicator  animating size={50} /></View>
    else {
     return <FlatList
          data={this.state.data}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item,index }) => <Question in={index} item={item} navigation={this.props.navigation} />}
          numColumns={2}
        />
    }
  }
  async fetchData(){
    let that = this;
    var ref = firebase.database().ref("questions/");
  await ref.orderByChild("subjectCode").equalTo(this.props.navigation.state.params.keyword).once("value").then(function (snapshot) {
        that.setState({data:_.values(snapshot.val()),isLoading:false})
        console.log(_.values(snapshot.val()))
    }).catch((e) => {
        console.log(e)
    })
  }
  componentDidMount(){
    this.fetchData();
  }
  render() {
    return (
      <View style={{paddingLeft:10}} >
        {this.renderData()}
      </View>
    )
  }
}


export default Search
