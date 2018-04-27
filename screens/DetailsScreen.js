import React from 'react';
import { Text, View, Dimensions, TouchableOpacity, Image, AsyncStorage, ToastAndroid, Button, TouchableWithoutFeedback } from 'react-native';
var window = Dimensions.get('window');
import store from 'react-native-simple-store';
import PhotoView from 'react-native-photo-view';
import Icon from 'react-native-vector-icons/Ionicons';

import { AdMobBanner, AdMobRewarded, } from 'react-native-admob';
AdMobRewarded.setTestDevices(['1587a345eb178ae4']);
AdMobRewarded.setAdUnitID('ca-app-pub-7356593470289291/7277590228');
export default class DetailsScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Question</Text>,
    headerRight:
      <TouchableOpacity style={{ padding: 10 }} onPress={() => {
        store.get(navigation.state.params.question.key).then((data) => {
          if (data) {
            store.delete(navigation.state.params.question.key)
            navigation.setParams({ color: 'white' })
          } else {
            AdMobRewarded.showAd().catch(error => console.warn(error));
            store.save(navigation.state.params.question.key, navigation.state.params.question)
            navigation.setParams({ color: 'red' })
          }
        })
      }} hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}>
        <Icon name={"md-heart"} size={35} color={navigation.state.params.color} />
      </TouchableOpacity>,
    headerTintColor: '#DFFEE6'

  });
  componentDidMount() {
    store.get(this.props.navigation.state.params.question.key).then((data) => {
      if (data) this.props.navigation.setParams({ color: 'red' })
      else
        this.props.navigation.setParams({ color: 'white' })
    })



    AdMobRewarded.addEventListener('adLoaded',
      () => console.log(' AdMobRewarded adLoaded')
    );
    AdMobRewarded.addEventListener('adFailedToLoad',
      (error) => console.warn(error)
    );
    AdMobRewarded.addEventListener('adOpened',
      () => console.log(' AdMobRewarded => adOpened')
    );
    AdMobRewarded.addEventListener('adClosed',
      () => {
        console.log(' AdMobRewarded => adClosed');
        AdMobRewarded.requestAd().catch(error => console.warn(error));
      }
    );
    AdMobRewarded.addEventListener('adLeftApplication',
      () => console.log(' AdMobRewarded => adLeftApplication')
    );

    AdMobRewarded.requestAd().catch(error => console.log(error));
  }

  componentWillUnmount() {
    AdMobRewarded.removeAllListeners();
  }

  render() {
    const { state, navigate } = this.props.navigation;
    const urls = state.params.question.data.urls || []
    Dimensions.get('window').width
    return <View style={{ backgroundColor: '#000', flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }} >

      {urls.map((e, i) => {
        return <TouchableWithoutFeedback key={i} onPress={() => navigate('View', { question: e })} style={{ padding: 5 }}>
          <Image source={{ uri: e }} style={{ height: 220, width: 170 }} />
        </TouchableWithoutFeedback>
      })}

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
    </View>;
  }
}
