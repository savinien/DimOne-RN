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
          source={require("../assets/spiro.png")}
          style={{ width: 50, height: 50, opacity: 0.8 }}
        />
        <Text style={{ fontSize: 20, margin: 10, color: "white" }}>
          {this.props.title}
        </Text>
      </View>
    );
  }
}

export default logoTitle;
