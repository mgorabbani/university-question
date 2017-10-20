import React from 'react';
import { Text, View, Dimensions, TouchableOpacity, AsyncStorage, ToastAndroid, Button } from 'react-native';
var window = Dimensions.get('window');
import store from 'react-native-simple-store';
import PhotoView from 'react-native-photo-view';
import Icon from 'react-native-vector-icons/Ionicons';

import { AdMobBanner, AdMobInterstitial } from 'react-native-admob'
AdMobInterstitial.setTestDevices(['1587a345eb178ae4']);
AdMobInterstitial.setAdUnitID('ca-app-pub-7356593470289291/1983389189');
export default class ImageViewScreen extends React.Component {
  constructor(props) {
    super(props)
    // this.props.saveQues = this.saveQuestion()

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
          AdMobInterstitial.showAd().catch(error => console.warn(error));

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



  //   AdMobInterstitial.addEventListener('adLoaded',
  //   () => console.log('AdMobInterstitial adLoaded')
  // );
  // AdMobInterstitial.addEventListener('adFailedToLoad',
  //   (error) => console.warn(error)
  // );
  // AdMobInterstitial.addEventListener('adOpened',
  //   () => console.log('AdMobInterstitial => adOpened')
  // );
  // AdMobInterstitial.addEventListener('adClosed',
  //   () => {
  //     console.log('AdMobInterstitial => adClosed');
  //     AdMobInterstitial.requestAd().catch(error => console.warn(error));
  //   }
  // );
  // AdMobInterstitial.addEventListener('adLeftApplication',
  //   () => console.log('AdMobInterstitial => adLeftApplication')
  // );

  AdMobInterstitial.requestAd().catch(error => console.warn(error));



  }

  componentWillUnmount() {
    AdMobInterstitial.removeAllListeners();
  }

  render() {
    const { state } = this.props.navigation;
    Dimensions.get('window').width
    return <View style={{ backgroundColor: '#000', flex: 1, justifyContent: 'space-between' }} >
      <PhotoView
        source={{ uri: state.params.question.data.url }}
        minimumZoomScale={1}
        maximumZoomScale={6}
        androidScaleType="fitCenter"
        onLoad={() => console.log("Image loaded!")}
        style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }} />

      <View style={{ position: 'absolute', bottom: 10, width: Dimensions.get('window').width }} >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <AdMobBanner
            adSize="banner"
            adUnitID="ca-app-pub-7356593470289291/2596088115"
            testDevices={['1587a345eb178ae4']}
            onAdFailedToLoad={error => console.error(error)}
          />
        </View>
      </View>
    </View>;
  }
}
