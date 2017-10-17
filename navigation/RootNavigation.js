
import React from 'react';
import { StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import { ScrollView, Text, View ,ImageBackground} from 'react-native'
import HomeScreen from '../screens/HomeScreen'
import AddQuestion from '../screens/AddQuestion'
import SearchScreen from '../screens/SearchScreen'
import SettingScreen from '../screens/SettingsScreen'
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
        backgroundColor:'#27CB7E',
        borderBottomColor:'#27CB7E',
      }
    }),
  }
);

const DrawerNav = DrawerNavigator({
  Home: {
    screen: RootStackNavigator
  },
  Saved:{
    screen:SavedScreen,
  },
  About: {
    screen: SettingScreen
  }
}, { 
    contentComponent: props => <DrawerContent  {...props} />,
  })

const DrawerContent = (props) => (

  <View  style={{flex:1, flexDirection: 'column', paddingBottom: 10, justifyContent: 'space-between' }} >
    <ImageBackground  source={ require('../assets/images/backgroundDrawer.jpg')}   style={{ height: 150}}>
      <View style={{flexDirection: 'row', padding: 30, paddingBottom: 0, height:150,justifyContent: 'center',alignItems:'center' }} >
        <Text style={{ fontSize: 20, fontWeight: 'bold',color:'#fff'}} >DIU Questions</Text>
      </View>
      <DrawerItems {...props} />
    </ImageBackground>
    <View style={{alignItems:'center'}} >
    <Text style={{ textAlign:'center' }} >Not affiliated with Daffodil International University</Text>
    </View>
   

  </View>
)

export default DrawerNav;