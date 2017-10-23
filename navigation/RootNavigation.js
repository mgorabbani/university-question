
import React from 'react';
import { StackNavigator, DrawerNavigator, DrawerItems, } from 'react-navigation';
import { ScrollView, Text, View, ImageBackground, Linking, TouchableOpacity } from 'react-native'
import HomeScreen from '../screens/HomeScreen'
import AddQuestion from '../screens/AddQuestion'
import SearchScreen from '../screens/SearchScreen'
import SettingScreen from '../screens/SettingScreen'
import ImageViewScreen from '../screens/ImageViewScreen'
import SavedScreen from '../screens/SavedQuestion';
const RootStackNavigator = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Search: {
      screen: SearchScreen,
    },
    Add: {
      screen: AddQuestion,
    },
    View: {
      screen: ImageViewScreen
    }
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
      headerStyle: {
        backgroundColor: '#176A39',
        borderBottomColor: '#176A39',
      }
    }),
  }
);

const SavedStack = StackNavigator({
  Saved: {
    screen: SavedScreen
  },
  View: {
    screen: ImageViewScreen
  }

}, {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
      headerStyle: {
        backgroundColor: '#176A39',
        borderBottomColor: '#176A39',
      }
    }),
  })


const SettingStack = StackNavigator({
  Setting: {
    screen: SettingScreen
  }
}, {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
      headerStyle: {
        backgroundColor: '#176A39',
        borderBottomColor: '#176A39',
      }
    }),
  })

const DrawerNav = DrawerNavigator({
  Home: {
    screen: RootStackNavigator
  },
  Saved: {
    screen: SavedStack,
  },
  Setting: {
    screen: SettingStack
  }
}, {
  contentOptions: {
    activeTintColor: '#1B622D',
  },

    contentComponent: props => <DrawerContent  {...props} />,
  })

const DrawerContent = (props) => (

  <View style={{ flex: 1, flexDirection: 'column', paddingBottom: 10, justifyContent: 'space-between' }} >
    <ImageBackground source={require('../assets/images/backgroundDrawer.jpg')} style={{ height: 150 }}>
      <View style={{ flexDirection: 'row', padding: 30, paddingBottom: 0, height: 150, justifyContent: 'center', alignItems: 'center' }} >

      </View>
      <DrawerItems {...props} />
      <TouchableOpacity delayPressIn={0} onPress={() => Linking.openURL("https://play.google.com/store/apps/details?id=com.diuquestion")} >
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <Text style={{ margin: 16, fontWeight: 'bold', color: '#000' }}>Give us Rating</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity delayPressIn={0} onPress={() => Linking.openURL("mailto:mgorabbani@gmail.com?subject=From University Questions\'s App")} >
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <Text style={{ margin: 16, fontWeight: 'bold', color: '#000' }}>Contact Us</Text>
        </View>
      </TouchableOpacity>
    </ImageBackground>
    <View style={{ alignItems: 'center' }} >
      <Text style={{ textAlign: 'center' }} >Made with ❤️</Text>
    </View>


  </View>
)

export default DrawerNav;