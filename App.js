import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
//import PushNotification from "react-native-push-notification";

import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import Screen1 from "./screens/Screen1";
import Notes from "./screens/Notes";
import ConfigurationScreen from "./screens/ConfigurationScreen";
import DefisScreen from "./screens/DefisScreen";
import QuestionsScreen from "./screens/QuestionsScreen";
import GroupesNewsScreen from "./screens/GroupesNewsScreen";
import AnimationScreen from "./screens/AnimationScreen";
import DefisDetailScreen from "./screens/DefisDetailScreen";

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    Screen1: Screen1,
    Notes: Notes,
    Configuration: ConfigurationScreen,
    Defis: DefisScreen,
    Questions: QuestionsScreen,
    GroupesNews: GroupesNewsScreen,
    Animation: AnimationScreen,
    DefisDetail: DefisDetailScreen
  },
  {
    initialRouteName: "Details"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
