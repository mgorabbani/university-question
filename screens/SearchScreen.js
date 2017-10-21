import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, Dimensions, Alert, } from 'react-native';
import * as firebase from 'firebase';
import _ from 'lodash';
import { AdMobBanner } from 'react-native-admob'
import Icon from 'react-native-vector-icons/Entypo';
var window = Dimensions.get('window');
import Question from '../components/Question'

import store from 'react-native-simple-store';

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      data: [
        { exam: 'quiz', semester: 'summer', year: '2014', subjectCode: 'swe112', url: 'http://lorempixel.com/400/200/' }
      ]
    }
  }
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Text style={{ color: '#fff', fontWeight: 'bold', }}>Search Subject Code: {navigation.state.params.keyword.toUpperCase()} </Text>,

    headerTintColor: '#DFFEE6'
  });


  renderData() {
    console.log(this.state.data.length, 'length')
    if (this.state.isLoading) {
      return <View style={{ marginTop: 100 }} ><ActivityIndicator animating /></View>
    }
    else if (this.state.data.length === 0) {
      return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ alignItems: 'center', padding: 10 }}>  কোন প্রশ্ন পাওয়া যায়নি</Text>
        <Icon name="feather" size={200} color="#9C9C9E" />
      </View>
    } else {
      return <FlatList
        data={this.state.data}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item, index }) => <Question in={index} item={item} navigation={this.props.navigation} />}
        numColumns={2}
      />
    }
  }
  async fetchData() {
    let that = this;
    await store.get('university').then((dd) => {
      if (dd) {
        var ref = firebase.database().ref("/questions/" + dd);
        let keyword = that.props.navigation.state.params.keyword;
        console.log(ref, "refff")
        ref.orderByChild("subjectCode").equalTo(keyword.toLowerCase()).once("value").then(function (snapshot) {
          let newshot = []
          snapshot.forEach(function (data) {
            news = { key: data.key, data: data.val() }
            newshot.push(news)
          });
          console.log(newshot)
          that.setState({
            data: _.reverse(_.values(newshot)),
            isLoading: false
          })

        }).catch((e) => {
          console.error(e)
        })
      } else
        Alert.alert("Attention", "Please select your university first!", [
          { text: 'Go to Setting', onPress: () => this.props.navigation.navigate('Setting') },
        ], )

    })


  }
  componentDidMount() {

    this.fetchData();
  }
  render() {
    return (
      <View style={{ paddingLeft: 10, flex: 1 }} >
        {this.renderData()}
        <View style={{ position: 'absolute', bottom: 10, width: Dimensions.get('window').width }} >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <AdMobBanner
              adSize="banner"
              adUnitID="ca-app-pub-7356593470289291/2596088115"
              testDevices={['1587a345eb178ae4']}
              onAdFailedToLoad={error => console.log(error)}
            />
          </View>
        </View>
      </View>
    )
  }
}


export default Search
