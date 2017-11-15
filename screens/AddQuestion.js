import React, { Component } from 'react';
import { Alert, View, Text, TouchableHighlight, ActivityIndicator, StyleSheet, ScrollView, Image, DeviceEventEmitter, Platform } from 'react-native';
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/Entypo';
var t = require('tcomb-form-native');
var Form = t.form.Form;
import * as firebase from 'firebase';

// import ImagePicker from 'react-native-image-picker'
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'react-native-fetch-blob'

const Blob = RNFetchBlob.polyfill.Blob
const Fetch = RNFetchBlob.polyfill.Fetch
// replace built-in fetch
window.fetch = new Fetch({
  // enable this option so that the response data conversion handled automatically
  auto: true,
  // when receiving response data, the module will match its Content-Type header
  // with strings in this array. If it contains any one of string in this array, 
  // the response body will be considered as binary data and the data will be stored
  // in file system instead of in memory.
  // By default, it only store response data to file system when Content-Type 
  // contains string `application/octet`.
  binaryContentTypes: [
    'image/',
    'video/',
    'audio/',
    'foo/',
  ]
}).build()
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const uploadImage = (uri, mime = 'image/jpeg') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    const sessionId = new Date().getTime()
    let uploadBlob = null
    const imageRef = firebase.storage().ref('images').child(`${sessionId}`)
    console.log("imageStorage", imageRef);
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
var formOptions = {
   auto: 'placeholders',
   fields: {
    subjectCode: {
      placeholder: 'swe221'
    }
  }
};
var options = { compressImageMaxWidth: 1000, compressImageQuality: 0.6, multiple: true,mediaType:'photo' };
class AddQuestion extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Text style={{ color: '#fff', fontWeight: 'bold', }}>Add Question</Text>,

    headerTintColor: '#DFFEE6'
  });

  constructor(props) {
    super(props)
    this.state = {
      value: {
        subjectCode: '',
        year: 2017,
        exam: 'Mid',
        semester: 'Summer',
      },
      images: [],
      uploading: false,
      university: null,
      isUploaded:false,
      onlineImage:[]
    }
  }

  componentDidMount() {
    store.get('university').then((data) => {
      console.log(data)
      if (data) this.setState({ university: data })
      else
        Alert.alert("Attention", "Please select your university first!", [
          { text: 'Go to Setting', },
        ], )

    })

  }

  async onPress() {
    let Localurl
    // call getValue() to get the values of the form

    var value = this.refs.form.getValue()
    Localurl = this.state.isUploaded;
    let university = this.state.university;
    if (!Localurl) this.setState({ isImageUploaded: true })
    if (value && Localurl && university) { // if validation fails, value will be null

      this.setState({ uploading: true })
      const { subjectCode, exam, semester, year } = value
      subjectCode = subjectCode.toLowerCase();
      console.log(subjectCode, exam, semester, year, Localurl);
      

    var ss=   this.state.images.map((data,i)=>{
        return  uploadImage(data).then(url => {
          return url
        
        }).catch((e) => {
          Alert.alert("Error", "Something is wrong! Please try again later");
          this.setState({ uploading: false })
          return e;
        })
      })
      const that = this;
      Promise.all(ss).then(function(urls) {
        let uploadData = { subjectCode, exam, semester, year, urls }
        firebase.database().ref(`/questions/${university}`)
        .push(uploadData)
        .then(() => {
          that.setState({ uploading: false })
          Alert.alert("Success", "Question added successfully!", [
            { text: 'Back To Home', onPress: () => that.props.navigation.goBack() },
          ], )
  
        }).catch((e) => {
          Alert.alert("Error", "Something is wrong! Please try again later", [
            { text: 'Back To Home', onPress: () => that.props.navigation.goBack() },
          ], )
          that.setState({ uploading: false })
        })
      })
      
      
    } else {
      console.log('please upload the quesitons!')
    }
  }
  button() {
    return this.state.uploading ? <ActivityIndicator size="large" /> : <Text style={styles.buttonText}>Save</Text>
  }


  _pickImage() {
    this.setState({ uploadURL: '' })
    ImagePicker.openPicker(options).then((response) => {
      console.log('fucking', response)
      if (response.didCancel) {
        console.log('User cancelled image picker');

      }
      else if (response.error) {
        console.log(response.error);
      }
      else {
        let paths = [];
        response.map((e) => {
          paths.push(e.path)
        })
        this.setState({ images: paths,isUploaded:true })
        console.log('shit happend', paths)
      }
    })
  }
  render() {
    return (
      <ScrollView style={{backgroundColor:'#fff'}} >
        <View style={styles.container}>
          <Text style={{ color: "#000", fontSize: 17, marginBottom: 10, fontWeight: 'bold', alignContent: 'center' }}>University ID: {this.state.university}</Text>
          <Form
            ref="form"
            type={Person}
            options={formOptions}
            onChange={(value) => this.setState({ value })}
            value={this.state.value}
          />

          <View style={{ flexDirection: 'row', paddingVertical: 10 }} >
            <Text style={{ fontSize: 17, fontWeight: "bold", color: !this.state.isImageUploaded ? '#232129' : 'red' }}>Upload Question</Text>
            <TouchableHighlight
              style={styles.upload}
              onPress={() => this._pickImage()}
              underlayColor='#fff'>
              <View style={{ flexDirection: 'row', }} >
                <Icon name="attachment" size={24} color="#232129" />
                {<Text style={{ marginLeft: 10, marginTop: 5, fontSize: 13 }} >{this.props.source}</Text>}


              </View>

            </TouchableHighlight>
            

          </View>
          <View style={{flexDirection:'row'}}>
          {this.state.images.map((e, i) => {
              return <Image source={{ uri: e }} style={styles.image} key={i} />
            })}
          </View>
          <TouchableHighlight style={styles.button} onPress={() => this.onPress()} underlayColor='#154120'>
            {this.button()}
          </TouchableHighlight>
          <Text>* Hold and select multiple images to upload multiple quesitons at once.</Text>
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
    backgroundColor: '#1B622D',
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
    height: 50,
    width: 50,
    marginHorizontal: 5
  }
}