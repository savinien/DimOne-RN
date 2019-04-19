import React, { Component } from "react";
import { View, Button, Text, TouchableOpacity } from "react-native";
import LogoTitle from "../components/LogoTitle";

class defisScreen extends Component {
  state = {};
  static navigationOptions = {
    headerTitle: <LogoTitle title="Mes défis" />,
    headerStyle: {
      backgroundColor: "#f4511e"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  render() {
    return (
      <View>
        <Text> Page de mes défis</Text>
      </View>
    );
  }
}

export default defisScreen;