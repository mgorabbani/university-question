/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React,{Component} from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import { Ionicons } from 'react-native-vector-icons';
import RootNavigation from './navigation/RootNavigation';

import * as firebase from 'firebase';
const config = {
  apiKey: "AIzaSyDGi_zZIX7naqsyvGFcKt4uYtTb6N6boEs",
  authDomain: "diuquestions.firebaseapp.com",
  databaseURL: "https://diuquestions.firebaseio.com",
  projectId: "diuquestions",
  storageBucket: "diuquestions.appspot.com",
  messagingSenderId: "319202974092"
};
firebase.initializeApp(config);


export default class App extends Component<{}> {
  state = {
    isLoadingComplete: false,
  };

  render() {

      return (
        <View style={styles.container}>
        <StatusBar barStyle="default" backgroundColor='#154120' />
          <RootNavigation />
        </View>
      );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
