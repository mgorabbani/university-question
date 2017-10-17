import React from 'react';
import {Text,View,TouchableOpacity,AsyncStorage,ActivityIndicator,FlatList} from 'react-native';
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import Question from '../components/Question'


export default class SavedScreen extends React.Component {
  constructor(props){
    super(props)
    this.state ={
     isLoading:true,
     questions :[
       {exam:'quiz', semester:'summer', year:'2014', subjectCode:'swe112', url:'http://lorempixel.com/400/200/' }
     ]
   }
  }

  static navigationOptions = {
    headerTitle:<Text style={{color:'#fff',fontWeight:'bold',fontSize:16}}>Question</Text>,
    headerRight: <TouchableOpacity >
    <Icon name="md-heart" size={32} color="#FC5071" style={{paddingRight:10}} />
  </TouchableOpacity>,
        headerTintColor:'#DFFEE6'

  };

  getQuestion(){
    that= this;
    store.keys().then((keys)=>{
      console.log(keys,'key')
      store.get(keys).then((data) =>{
        console.log(data,'data')
          that.setState({questions:data,isLoading:false})
          
      })
    })
    

  }

  renderData(){
    this.getQuestion();
    if(this.state.isLoading) return  <View style={{marginTop:100}} ><ActivityIndicator  animating /></View>
    else {
     return <FlatList
          data={this.state.questions}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item,index }) => <Question in={index} item={item} navigation={this.props.navigation} />}
          numColumns={2}
        />
    }
  }
  componentDidMount(){
    this.getQuestion();
  }
  deleteAll(){
    store.keys().then((ks)=>{
      console.log(ks,'all the keys')
      store.delete(ks)
    })
  }
  render() {
    return (
      <View style={{backgroundColor:'#fff',flex:1}} >

      <View style={{paddingLeft:10}} >
        {this.renderData()}
      </View>
      <TouchableOpacity onPress={()=>this.deleteAll()}>
    <Icon name="md-heart" size={32} color="#FC5071" style={{paddingRight:10}} />
  </TouchableOpacity>
          <View style={{flex:.5,justifyContent:'center',alignItems:'center'}}>
             <Text style={{alignItems:'center',padding:10}}> এখনও প্রিয়তে কোন কবিতা রাখা হয়নি</Text>
               <Icon name="md-sad" size={200} color="#9C9C9E" />
          </View>
      
           
      
          </View>
      
    )
  }
}



