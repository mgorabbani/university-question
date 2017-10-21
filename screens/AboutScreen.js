import React from 'react';

import { Text, View, TouchableOpacity, ToastAndroid, TextInput, ScrollView } from 'react-native';
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/Entypo';


export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      university: null
    }
  }
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Text style={{ color: '#fff', fontWeight: 'bold', }}>About</Text>,

    headerLeft: <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }} >
      <Icon name="list" size={24} color="#fff" style={{ paddingLeft: 10 }} />
    </TouchableOpacity>,
  });

  saveVarsityName() {
    store.update('university', this.state.university).then((data) => {
      ToastAndroid.show('Your Universty is set to ' + data, ToastAndroid.SHORT);
    })

  }

  async fetchData() {
    let that = this;
    var ref = firebase.database().ref("questions/");
//child seearch;
    await ref.orderByChild("subjectCode").equalTo(keyword.toLowerCase()).once("value").then(function (snapshot) {
      console.log(snapshot.val())

    }).catch((e) => {
      console.error(e)
    })

  }
  render() {
console.log(this.state.university)
    return <ScrollView>
      <View>
        <Text>Universty Name: </Text>
        <TextInput onChangeText={(e) => this.setState({ university: e })} />
        <TouchableOpacity style={{
          height: 36,
          backgroundColor: '#27CB7E',
          borderRadius: 3,
          marginBottom: 10,
          alignSelf: 'stretch',
          justifyContent: 'center'
        }} onPress={() => this.saveVarsityName()} >
          <Text>Save</Text>
        </TouchableOpacity>
        <Text>
          You can only search question from your university, Please leave us message if you have any feedback.
          This app is only for previous semesters question. if anyone leaks upcoming exam's question we are not ...... .
        furthermore if we found such thing that question will be removed.
        If you don't find your university name on the list please feel free to message us. we will add it ASAP.
          </Text>
          <TouchableOpacity
          style={{
          height: 36,
          backgroundColor: '#27CB7E',
          borderRadius: 3,
          marginBottom: 10,
          alignSelf: 'stretch',
          justifyContent: 'center'
        }} 
          onPress={() => this.openSearchModal()}
        >
          <Text>Pick a Place</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>;
  }
}
