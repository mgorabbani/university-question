import React from 'react';
import { Text, View, Dimensions, TouchableOpacity, AsyncStorage, ToastAndroid } from 'react-native';
var window = Dimensions.get('window');
import store from 'react-native-simple-store';
import PhotoView from 'react-native-photo-view';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ImageViewScreen extends React.Component {
  constructor(props) {
    super(props)
    // this.props.saveQues = this.saveQuestion()

  }

  static navigationOptions = ({ navigation }) => ({

    headerTitle: <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Question</Text>,
    headerRight: 
      <TouchableOpacity style={{ padding: 10 }} onPress={() => {
        store.get(navigation.state.params.question.key).then((data) =>{
          if(data) {
            store.delete(navigation.state.params.question.key)
            navigation.setParams({color:'white'})
          } else {
            store.save(navigation.state.params.question.key,navigation.state.params.question)
            navigation.setParams({color:'red'})
          }
      })
      }} >
        <Icon name={"md-heart"} size={35} color={navigation.state.params.color} />
      </TouchableOpacity>,
    headerTintColor: '#DFFEE6'

  });
componentDidMount(){

  store.get(this.props.navigation.state.params.question.key).then((data) => {
        if(data) this.props.navigation.setParams({color:'red'}) 
        else
        this.props.navigation.setParams({color:'white'}) 
        
      })

      this.props.navigation.setParams({checked:this.checkSaved})
}

checkSaved(){

}


  render() {
    const { state } = this.props.navigation;
    Dimensions.get('window').width
    return <View style={{ backgroundColor: '#000', flex: 1 }} >

      <PhotoView
        source={{ uri: state.params.question.data.url }}
        minimumZoomScale={1}
        maximumZoomScale={6}
        androidScaleType="fitCenter"
        onLoad={() => console.log("Image loaded!")}
        style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height - 100 }} />


    </View>;
  }
}
