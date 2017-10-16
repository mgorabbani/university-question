import React from 'react';
import {Text,View,TouchableOpacity,AsyncStorage} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    headerTitle:<Text style={{color:'#fff',fontWeight:'bold',fontSize:16}}>Question</Text>,
    headerRight: <TouchableOpacity onPress={() => this.saveQuestion} >
    <Icon name="heart" size={32} color="#FC5071" style={{paddingRight:10}} />
  </TouchableOpacity>,
        headerTintColor:'#DFFEE6'

  };
  getQuestion(){
    try {
      await AsyncStorage.setItem('qustion', 'I like to save it.');
    } catch (error) {
      // Error saving data
    }
  }
  render() {
    

    return <View style={{backgroundColor:'#000',flex:1}} >
       <View style={{flex:.5,justifyContent:'center',alignItems:'center'}}>
       <Text style={{alignItems:'center',padding:10}}> এখনও প্রিয়তে কোন কবিতা রাখা হয়নি</Text>
         <Icon name="md-sad" size={200} color="#9C9C9E" />
    </View>

     

    </View>;
  }
}
