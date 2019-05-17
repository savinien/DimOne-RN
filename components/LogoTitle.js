import React, { Component } from "react";
import { Image, View, Text } from "react-native";

class logoTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  state = {};
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Image
          source={require("../assets/logo.png")}
          style={{ width: 40, height: 40, opacity: 1 }}
        />
        <Text style={{ fontSize: 20, margin: 10, color: "white" }}>
          {this.props.title}
        </Text>
      </View>
    );
  }
}

export default logoTitle;
