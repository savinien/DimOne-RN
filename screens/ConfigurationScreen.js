import React, { Component } from "react";
import { View, Button, Text, TouchableOpacity } from "react-native";
import LogoTitle from "../components/LogoTitle";

class configurationScreen extends Component {
  state = {};
  static navigationOptions = {
    headerTitle: <LogoTitle title="Configuration" />,
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
        <Text> Page de configuration</Text>
      </View>
    );
  }
}

export default configurationScreen;
