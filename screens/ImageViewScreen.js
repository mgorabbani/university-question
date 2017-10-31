import React from 'react';
import { Text, View, Dimensions, TouchableOpacity, AsyncStorage, ToastAndroid, Button,TouchableWithoutFeedback } from 'react-native';
var window = Dimensions.get('window');
import store from 'react-native-simple-store';
import PhotoView from 'react-native-photo-view';
import Icon from 'react-native-vector-icons/Ionicons';

import { AdMobBanner, AdMobInterstitial } from 'react-native-admob'
// AdMobInterstitial.setTestDevices(['1587a345eb178ae4']);
// AdMobInterstitial.setAdUnitID('ca-app-pub-7356593470289291/1983389189');
export default class ImageViewScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Question</Text>,
    headerTintColor: '#DFFEE6'

  });
  componentDidMount() {
  

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

  // AdMobInterstitial.requestAd().catch(error => console.log(error));
  }

  componentWillUnmount() {
    // AdMobInterstitial.removeAllListeners();
  }

  render() {
    const { state } = this.props.navigation;
    Dimensions.get('window').width
    return <View style={{ backgroundColor: '#000', flex: 1, justifyContent: 'space-between' }} >
      <PhotoView
        source={{ uri: state.params.question }}
        minimumZoomScale={1}
        maximumZoomScale={6}
        androidScaleType="fitCenter"
        onLoad={() => console.log("Image loaded!")}
        style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }} />

      <View style={{ position: 'absolute', bottom: 10, width: Dimensions.get('window').width }} >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {/* <AdMobBanner
            adSize="banner"
            adUnitID="ca-app-pub-7356593470289291/2596088115"
            testDevices={['1587a345eb178ae4']}
            onAdFailedToLoad={error => console.log(error)}
          /> */}
        </View>
      </View>
    </View>;
  }
}
