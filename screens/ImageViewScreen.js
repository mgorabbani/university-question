import React from 'react';
import {Text,View,Dimensions,TouchableOpacity,AsyncStorage,ToastAndroid} from 'react-native';
var window = Dimensions.get('window');

import PhotoView from 'react-native-photo-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';

@inject('savedQuesStore')
@observer
export default class ImageViewScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        love: this.props.savedQuesStore.isFav ? true : false,
    };

    this._setLove = this._setLove.bind(this);
}

  static navigationOptions = ({ navigation, savedQuesStore }) => ({
    
    headerTitle:<Text style={{color:'#fff',fontWeight:'bold',fontSize:16}}>Question</Text>,
    headerRight:  <TouchableOpacity onPress={savedQuesStore._setLove()} style={{ padding: 10 }} >
                            <Icon name={"md-heart"} size={35} color={ "#ff316b"} />
                        </TouchableOpacity>,
        headerTintColor:'#DFFEE6'

  });


  render() {
    const {state} = this.props.navigation;
    console.log(this.props)
    Dimensions.get('window').width
    return <View style={{backgroundColor:'#000',flex:1}} >
       <PhotoView 
       source={{uri:state.params.question.url}}
       minimumZoomScale={1}
       maximumZoomScale={6}
       androidScaleType="fitCenter"
       onLoad={() => console.log("Image loaded!")}
       style={{width: Dimensions.get('window').width, height:Dimensions.get('window').height-100}} />
     

    </View>;
  }
}
