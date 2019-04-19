import React, { Component } from "react";
import { View, Button, Text, TouchableOpacity } from "react-native";
import LogoTitle from "../components/LogoTitle";

class detailsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle title="Details Screen" />,
    headerStyle: {
      backgroundColor: "#f4511e"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  navToHome = () => {
    this.props.navigation.navigate("Home");
    console.log("Navigate to Home page");
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
    this.props.navigation.navigate("Defis");
    console.log("Navigation to Defis");
  };

  navToQuestions = () => {
    this.props.navigation.navigate("Questions");
    console.log("Navigation to Questions");
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title="Go back home"
          //onPress={() => this.props.navigation.navigate("Home")}
          onPress={this.navToHome}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            margin: 20
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center"
              //margin: 3
            }}
          >
            <TouchableOpacity onPress={this.navToDefis}>
              <View
                style={{
                  width: 160,
                  height: 160,
                  backgroundColor: "powderblue",
                  margin: 3,
                  justifyContent: "center"
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Mes défis
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.navToNotes}>
              <View
                style={{
                  width: 160,
                  height: 160,
                  backgroundColor: "skyblue",
                  margin: 3,
                  justifyContent: "center"
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Carnets de notes
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              //justifyContent: "center",
              alignItems: "center",
              margin: 3
            }}
          >
            <TouchableOpacity onPress={this.navToQuestions}>
              <View
                style={{
                  width: 160,
                  height: 160,
                  backgroundColor: "steelblue",
                  justifyContent: "center",
                  margin: 3
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Questions
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.navToConfig}>
              <View
                style={{
                  width: 160,
                  height: 160,
                  backgroundColor: "darkblue",
                  margin: 3,
                  justifyContent: "center"
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Configuration
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default detailsScreen;
