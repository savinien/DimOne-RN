import React, { Component } from "react";
import { View, Image } from "react-native";

class groupesNews extends Component {
  state = {};
  render() {
    return (
      <Image style={{ flex: 0.5 }} source={require("../assets/gp-news.png")} />
    );
  }
}

export default groupesNews;
