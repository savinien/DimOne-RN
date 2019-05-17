import React, { Component } from "react";
import {
  View,
  Button,
  Text,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import HomeTop from "../components/HomeTop";
import ConfigBottomButton from "../components/ConfigBottomButton";

class groupesNewsScreen extends Component {
  state = {};
  static navigationOptions = {
    header: null
  };

  navToHome = () => {
    this.props.navigation.navigate("Details");
    console.log("Navigate to Home page");
  };

  navToConfig = () => {
    this.props.navigation.navigate("Configuration");
    console.log("Navigation to Configuration");
  };

  render() {
    return (
      <ImageBackground
        source={require("../assets/images/fond.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start"
          }}
        >
          <HomeTop nav={this.navToHome} />

          <View
            style={{
              flex: 2.25,
              flexDirection: "column",
              justifyContent: "space-evenly"
            }}
          >
            <ImageBackground
              source={require("../assets/images/groupesnews-backgnd.png")}
              style={{ width: "100%", height: "100%" }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: "BaronNeueBold",
                    fontSize: 30,
                    color: "white"
                  }}
                >
                  GROUPES / NEWS
                </Text>
              </View>
            </ImageBackground>
          </View>
          <ConfigBottomButton nav={this.navToConfig} imageName="groupes" />
        </View>
      </ImageBackground>
    );
  }
}

export default groupesNewsScreen;
