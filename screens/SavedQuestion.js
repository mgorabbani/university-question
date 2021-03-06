import React from 'react';
import { Text, View, TouchableOpacity, AsyncStorage, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/Entypo';
import _ from 'lodash';
import Question from '../components/Question'
import { AdMobBanner } from 'react-native-admob'

var window = Dimensions.get('window');
export default class SavedScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      questions: []
    }
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Question</Text>,
    headerLeft: <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}>
      <Icon name="list" size={24} color="#fff" style={{ paddingLeft: 10 }} />
    </TouchableOpacity>,
    headerTintColor: '#DFFEE6'

  });

  async getQuestion() {
    that = this;
    await store.keys().then((keys) => {
      console.log(keys, 'key')
      let onlyQuesitonKey = keys.filter((d) => {
        if (d !== 'university') {
          return d;
        }
      })
      console.log(onlyQuesitonKey, 'onlyQuesitonKey')
      store.get(onlyQuesitonKey).then((data) => {
        console.log(data, 'data')
        that.setState({ questions: data, isLoading: false })

      })
    })


  }

  renderData() {
    console.log(this.state.questions.length, 'length')
    if (this.state.isLoading) {
      return <View style={{ marginTop: 100 }} ><ActivityIndicator animating /></View>
    }
    else if (this.state.questions.length === 0) {
      return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ alignItems: 'center', padding: 10 }}> Nada, Nothing found!</Text>
        <Icon name="feather" size={200} color="#9C9C9E" />
      </View>
    } else {
      return <FlatList style={{ marginBottom: 50 }}
        data={this.state.questions}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item, index }) => <Question in={index} item={item} navigation={this.props.navigation} />}
        numColumns={2}
      />
    }
  }
  componentDidMount() {
    this.getQuestion();
    // this.deleteAll()
  }
  // async deleteAll() {
  //   await store.keys().then((ks) => {
  //     console.log(ks, 'all the keys')
  //     this.setState({isLoading: false })
  //     store.delete(ks)
  //   })
  // }

  render() {
    return (
      <View style={{ flex: 1, paddingLeft: 10, }} >
        {this.renderData()}
        <View style={{ position: 'absolute', bottom: 10, width: Dimensions.get('window').width }} >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <AdMobBanner
              adSize="largeBanner"
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



