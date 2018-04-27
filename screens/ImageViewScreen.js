import React from 'react';
import { ScrollView, ToastAndroid, Text, View, Dimensions, TouchableOpacity, AsyncStorage, Button, TouchableWithoutFeedback } from 'react-native';
var window = Dimensions.get('window');
import store from 'react-native-simple-store';
import PhotoView from 'react-native-photo-view';
import Icon from 'react-native-vector-icons/Ionicons';
import RNFetchBlob from 'react-native-fetch-blob'
const { config, fs } = RNFetchBlob
let PictureDir = fs.dirs.PictureDir // this is the pictures directory. You can check the available directories in the wiki.
let date = new Date();
let options = {
  fileCache: true,
  addAndroidDownloads: {
    useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.

    path: PictureDir + "/me_" + Math.floor(date.getTime() + date.getSeconds() / 2) + '.jpg', // this is the path where your downloaded file will live in
    description: 'Downloading image.'
  }
}
import { AdMobBanner, AdMobRewarded } from 'react-native-admob'

AdMobRewarded.setTestDevices(['1587a345eb178ae4']);
AdMobRewarded.setAdUnitID('ca-app-pub-7356593470289291/7277590228');

export default class ImageViewScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reward: 0
    }
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Question</Text>,
    headerRight:
      <TouchableOpacity style={{ padding: 10 }} onPress={() => {
        AdMobRewarded.showAd().catch(error => console.warn(error));

      }} hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}>
        <Icon name={"md-download"} size={35} color={"#fff"} />
      </TouchableOpacity>,
    headerTintColor: '#DFFEE6'

  });
  componentDidMount() {

    AdMobRewarded.addEventListener('rewarded',
      (reward) => {
        this.setState({ reward: reward });
        config(options).fetch('GET', this.props.navigation.state.params.question)
      }
    );

    AdMobRewarded.addEventListener('adClosed',
      () => {
        if (this.state.reward == 0) {
          ToastAndroid.show('You need to watch the full video to download', ToastAndroid.SHORT);
        }

        AdMobRewarded.requestAd().catch(error => console.warn(error));
      }
    );

    AdMobRewarded.requestAd().catch(error => console.log(error));
  }

  componentWillUnmount() {
    AdMobRewarded.removeAllListeners();
  }

  render() {
    const { state } = this.props.navigation;
    Dimensions.get('window').width
    return <ScrollView style={{ backgroundColor: '#000', flex: 1 }} >

      <PhotoView
        source={{ uri: state.params.question }}
        minimumZoomScale={1}
        maximumZoomScale={6}
        androidScaleType="fitCenter"
        onLoad={() => console.log("Image loaded!")}
        style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height - 80 }} />

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
    </ScrollView>;
  }
}
