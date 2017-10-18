import React from 'react';

import {Text,View,TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

export default class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle:<Text style={{color:'#fff',fontWeight:'bold',}}>About</Text>,

    headerLeft: <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} >
    <Icon name="list" size={24} color="#fff" style={{paddingLeft:10}} />
  </TouchableOpacity>,
  });

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <View></View>;
  }
}
