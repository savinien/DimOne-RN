import React, { Component } from "react";
import { View, Image } from "react-native";

class defis extends Component {
  state = {};
  render() {
    return (
      <Image style={{ flex: 1 }} source={require("../assets/defis.png")} />
    );
  }
}

export default defis;
