import React from 'react';
import {Text,View,Dimensions} from 'react-native';
var window = Dimensions.get('window');

import PhotoView from 'react-native-photo-view';


export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    headerTitle:<Text style={{color:'#fff',fontWeight:'bold',}}>Question</Text>,
    
        headerTintColor:'#DFFEE6'

  };

  render() {
    const {state} = this.props.navigation;
    
    Dimensions.get('window').width
    return <View style={{backgroundColor:'#000',flex:1}} >
       <PhotoView 

       source={{uri:state.params.url}}
       minimumZoomScale={1}
       maximumZoomScale={6}
       androidScaleType="fitCenter"
       onLoad={() => console.log("Image loaded!")}
       style={{width: Dimensions.get('window').width, height:Dimensions.get('window').height-100}} />
     

    </View>;
  }
}
