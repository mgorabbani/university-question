import React from 'react';

import { Text, View, TouchableOpacity, Picker, ScrollView } from 'react-native';
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
        <Text style={{fontSize:18,padding:10,color:'#154120'}} >Choose Your Universty: </Text>

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
        This app is a way to share the questions in the previous semester of your university. By using this app you are not allowed to reveal upcoming exam questions. If you leak any questions for the next exam, we will delete it. 
        So stay with us and help others by informing about the types of questions you have in  previous exam .
          </Text>
          <Text style={{padding:10,fontSize:16}}>
          If you can not find the name of your university in this list, please let us know. We will add it ASAP.
          </Text>

      </View>
    </ScrollView>;
  }
}
