import React, { Component } from 'react';
import { Alert, View, Text, TouchableHighlight, ActivityIndicator, StyleSheet, ScrollView, Image, DeviceEventEmitter, Platform } from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';
var t = require('tcomb-form-native');
var Form = t.form.Form;
import * as firebase from 'firebase';

import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const uploadImage = (uri, mime = 'image/jpeg') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    const sessionId = new Date().getTime()
    let uploadBlob = null
    const imageRef = firebase.storage().ref('images').child(`${sessionId}`)
console.log("imageStorage",imageRef);
    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
// here we are: define your domain model
var Exam = t.enums({
  Quiz: 'Quiz',
  Mid: 'Mid Term',
  Final: 'Final'
});
var Semester = t.enums({
  Summer: 'Summer',
  Spring: 'Spring',
  Fall: 'Fall'
})

var Person = t.struct({
  subjectCode: t.String,              // a required string
  exam: Exam,
  semester: Semester,
  year: t.Number,
});
var options = {maxWidth:1400,quality:0.6,allowsEditing:true};
class AddQuestion extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Text style={{ color: '#fff', fontWeight: 'bold', }}>Add Question</Text>,

    headerTintColor: '#DFFEE6'
  });

  constructor(props) {
    super(props)
    this.state = {
      value: {
        subjectCode: 'swe221',
        year: 2016,
        exam: 'Mid',
        semester: 'Summer',
      },
      image: null,
      uploading: false,
    }
  }

  onPress() {
    let Localurl
    // call getValue() to get the values of the form
    
    var value = this.refs.form.getValue()
    Localurl= this.state.uploadURL
    if(!Localurl) this.setState({isImageUploaded:true})
    if (value && Localurl) { // if validation fails, value will be null
      this.setState({uploading:true})
      const { subjectCode, exam, semester, year } = value
      console.log(subjectCode, exam, semester, year, Localurl);
      uploadImage(Localurl).then(url => {
        firebase.database().ref(`/questions/`)
          .push({ subjectCode, exam, semester, year, url })
          .then(() => {
            this.setState({uploading:false})
            Alert.alert("Success", "Question added successfully!", [
              { text: 'Back To Home', onPress: () => this.props.navigation.navigate('Home') },
            ], )

          }).catch((e) => {
            Alert.alert("Error", "Something is wrong! Please try again later", [
              { text: 'Back To Home', onPress: () => this.props.navigation.navigate('Home') },
            ], )

          })
      }).catch((e)=>{
        Alert.alert("Error", "Something is wrong! Please try again later")
      })
    } else {
      console.log('please upload the quesiton!')
    }
  }
  button() {
    return this.state.uploading ? <ActivityIndicator size="large" /> : <Text style={styles.buttonText}>Save</Text>
  }

  imageLoading() {
    if(this.state.uploadURL) {
      return <Image
      source={{ uri: this.state.uploadURL }}
      style={styles.image}
    />
    }
     
  }


  _pickImage() {
    this.setState({ uploadURL: ''})
    ImagePicker.showImagePicker(options, (response) => {
      console.log('fucking',response)
      if (response.didCancel) {
        console.log('User cancelled image picker');

      }
      else if (response.error) {
        console.log(response.error);
      }
      else {
        this.setState({ uploadURL: response.uri })
        console.log('shit happend',response.uri)
      }
    })
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>

          {console.log(this.state.uploading)}

          <Form
            ref="form"
            type={Person}
            options={options}
            onChange={(value) => this.setState({ value })}
            value={this.state.value}
          />

          <View style={{ flexDirection: 'row', paddingVertical: 10 }} >
            <Text style={{ fontSize: 17, fontWeight: "bold", color: !this.state.isImageUploaded? '#232129': 'red' }}>Upload Question</Text>
            <TouchableHighlight
              style={styles.upload}
              onPress={() => this._pickImage()}
              underlayColor='#fff'>
              <View style={{ flexDirection: 'row', }} >
                <Icon name="attachment" size={24} color="#232129" />
                {<Text style={{ marginLeft: 10, marginTop: 5, fontSize: 13 }} >{this.props.source}</Text>}
                {this.imageLoading()}

              </View>

            </TouchableHighlight>


          </View>
          <TouchableHighlight style={styles.button} onPress={() => this.onPress()} underlayColor='#0002FF'>
            {this.button()}
          </TouchableHighlight>
        </View>
      </ScrollView>
    )
  }
}



export default AddQuestion;

// t.form.Form.stylesheet.textbox.normal.fontFamily = 'space-mono';
// t.form.Form.stylesheet.textbox.error.fontFamily = 'space-mono';

// t.form.Form.stylesheet.controlLabel.normal.fontFamily = 'space-mono';
// t.form.Form.stylesheet.controlLabel.error.fontFamily = 'space-mono';


t.form.Form.stylesheet.textbox.normal.borderWidth = 0;
t.form.Form.stylesheet.textbox.error.borderWidth = 0;
t.form.Form.stylesheet.textbox.normal.marginBottom = 0;
t.form.Form.stylesheet.textbox.error.marginBottom = 0;

t.form.Form.stylesheet.controlLabel.normal.borderWidth = 0;
t.form.Form.stylesheet.controlLabel.error.borderWidth = 0;
t.form.Form.stylesheet.textbox.normal.marginBottom = 0;
t.form.Form.stylesheet.textbox.error.marginBottom = 0;

t.form.Form.stylesheet.textboxView.normal.borderWidth = 0;
t.form.Form.stylesheet.textboxView.error.borderWidth = 0;
t.form.Form.stylesheet.textboxView.normal.borderRadius = 0;
t.form.Form.stylesheet.textboxView.error.borderRadius = 0;
t.form.Form.stylesheet.textboxView.normal.borderBottomWidth = 1;
t.form.Form.stylesheet.textboxView.error.borderBottomWidth = 1;
t.form.Form.stylesheet.textbox.normal.marginBottom = 5;
t.form.Form.stylesheet.textbox.error.marginBottom = 5;

var styles = {
  container: {
    justifyContent: 'center',

    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 10,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#232129',
    borderRadius: 3,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  upload: {
    paddingHorizontal: 10,
    marginTop: -3
  },
  image: {
    height: 100,
    width: 100,
    marginHorizontal: 10
  }
}