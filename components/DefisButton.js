import React, { Component } from "react";
import { ImageBackground, View, Text, TouchableOpacity } from "react-native";

const images = {
  defis: require("../assets/images/mesdefis-button-backgnd.png"),
  notes: require("../assets/images/goupesnews-button-backgnd.png")
};

class defisButton extends Component {
  constructor(props) {
    super(props);
    this.state = { imageName: this.props.imageName, title: this.props.title };
    console.log(this.state.imageName);
    console.log(this.props);
  }
  render() {
    return (
      <TouchableOpacity
        style={{
          flex: 1
        }}
        onPress={this.props.nav}
      >
        <ImageBackground
          //source={require("../assets/images/mesdefis-button-backgnd.png")}
          source={images[this.props.imageName]}
          style={{ width: "100%", height: "100%" }}
        >
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontFamily: "BaronNeueBold",
                fontSize: 25,
                color: "white"
              }}
            >
              {this.state.title}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

export default defisButton;
