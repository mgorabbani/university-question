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
    if(this.state.isLoading) return  <View style={{marginTop:100}} ><ActivityIndicator  animating /></View>
    else {
     return <FlatList
          data={this.state.data}
          keyExtractor={(item, index) => index}
          renderItem={({ item,index }) => <Question in={index} item={item} navigation={this.props.navigation} />}
          numColumns={2}
        />
    }
  }
  async fetchData(){
    let that = this;
    var ref = firebase.database().ref("questions/");
    let keyword= that.props.navigation.state.params.keyword;

  await ref.orderByChild("subjectCode").equalTo(keyword.toLowerCase()).once("value").then(function (snapshot) {
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
  componentDidMount(){
    console.log(this.props.navigation.state.params.keyword)
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
