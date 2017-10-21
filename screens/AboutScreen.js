import React from 'react';

import { Text, View, TouchableOpacity, ToastAndroid, Picker, ScrollView } from 'react-native';
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/Entypo';
import * as firebase from 'firebase';
import _ from 'lodash';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      university: null,
      data: [{ id: "1", name: "loading..." }]
    }
  }
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Text style={{ color: '#fff', fontWeight: 'bold',fontSize:16 }}>Setting</Text>,

    headerLeft: <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }} >
      <Icon name="list" size={24} color="#fff" style={{ paddingLeft: 10 }} />
    </TouchableOpacity>,
  });

  saveVarsityName(varsity) {
    store.update('university',varsity).then((data) => {
     
    }).catch(e=>{console.log(e)})

  }

  
  componentDidMount() {
    this.fetchData();
    store.get('university').then((data) => {
      console.log(data)
      if (data) this.setState({ university: data })
    })

  }
  async fetchData() {
    let that = this;
    var ref = firebase.database().ref("university_list");

    await ref.orderByKey().once("value").then(function (snapshot) {
      let newshot = []
      snapshot.forEach(function (data) {
        newshot.push(data.val())
      });
      console.log(newshot)
      that.setState({
        data: (newshot),
      })
    }).catch((e) => {
      console.error(e)
    })

  }


  render() {

    console.log(this.state.university)
    return <ScrollView style={{backgroundColor:'#fff'}} >
      <View>
        <Text style={{fontSize:18,padding:10,color:'#351B9B'}} >Universty Name: </Text>

        <Picker
          selectedValue={this.state.university}
          onValueChange={(cli) => {
            this.saveVarsityName(cli)
            this.setState({ university: cli })
          }}>
          {this.state.data.map((l, i) => {
            return <Picker.Item value={l.id} label={l.name} key={i} />
          })}
        </Picker>


        <Text style={{padding:10,fontSize:16}}>
          You can only search question from your university, Please leave us message if you have any feedback.
          This app is only for previous semesters question. if anyone leaks upcoming exam's question we are not ...... .
        furthermore if we found such thing that question will be removed.
          </Text>
          <Text style={{padding:10,fontSize:16}}>
          If you don't find your university name on the list please feel free to message us. we will add it ASAP.
          </Text>

      </View>
    </ScrollView>;
  }
}
