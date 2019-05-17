import React, { Component } from "react";
import { ImageBackground, View, Text, TouchableOpacity } from "react-native";

const images = {
  defis: require("../assets/images/mesreglages-mondefis-button-backgnd.png"),
  notes: require("../assets/images/mesreglages-mesnotes-button-backgnd.png"),
  groupes: require("../assets/images/mesreglages-groupesnews-button-backgnd.png"),
  questions: require("../assets/images/mesreglages-questionreponse-button-backgnd.png")
};

class configBottomButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity
        style={{
          flex: 0.25
        }}
        onPress={this.props.nav}
      >
        <ImageBackground
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
                fontSize: 30,
                color: "white",
                margin: 5
              }}
            >
              MES RÉGLAGES
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

export default configBottomButton;
