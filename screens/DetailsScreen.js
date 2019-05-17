import React, { Component } from "react";
import {
  View,
  Button,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";
import HomeButton from "../components/HomeButton";
import HomeTop from "../components/HomeTop";

class detailsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  navToHome = () => {
    this.props.navigation.navigate("Home");
    console.log("stay home");
  };

  navToScreen1 = () => {
    this.props.navigation.navigate("Screen1");
    console.log("Navigate to Screen1");
  };

  navToNotes = () => {
    this.props.navigation.navigate("Notes");
    console.log("Navigate to Notes");
  };

  navToConfig = () => {
    this.props.navigation.navigate("Configuration");
    console.log("Navigation to Configuration");
  };

  navToDefis = () => {
    this.props.navigation.navigate("Defis", { title: "MES DÉFIS", text: "" });
    console.log("Navigation to Defis");
  };

  navToQuestions = () => {
    this.props.navigation.navigate("Questions");
    console.log("Navigation to Questions");
  };

  navToGroupes = () => {
    this.props.navigation.navigate("GroupesNews");
    console.log("Navigation to Groupes & News");
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
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-evenly"
            }}
          >
            <HomeButton
              nav={this.navToGroupes}
              imageName="groupes"
              title="GROUPES / NEWS"
            />
            <HomeButton
              nav={this.navToDefis}
              imageName="defis"
              title="MES DÉFIS"
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row"
            }}
          >
            <HomeButton
              nav={this.navToNotes}
              imageName="notes"
              title="MES NOTES"
            />
            <HomeButton
              nav={this.navToQuestions}
              imageName="questions"
              title="QUESTIONS RÉPONSES"
            />
          </View>
          <TouchableOpacity
            onPress={this.navToConfig}
            style={{
              flex: 0.5
            }}
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
                MES RÉGLAGES
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

export default detailsScreen;
