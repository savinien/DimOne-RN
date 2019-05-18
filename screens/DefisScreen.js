import React, { Component } from "react";
import {
  View,
  Button,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet
} from "react-native";
import HomeTop from "../components/HomeTop";
import ConfigBottomButton from "../components/ConfigBottomButton";
import DefisService from "../services/DefisService";

class defisScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      todaysDefis: []
    };
    this.defisService = new DefisService();
  }

  componentDidMount = async () => {
    console.log("about to retrieve defis");
    let todaysDefis = await this.defisService.retrieveTodaysDefis();
    this.setState(
      state => {
        return { todaysDefis: todaysDefis };
      },
      () => {
        console.log("defis retrieved: ", this.state.todaysDefis);
      }
    );
  };

  navToHome = () => {
    this.props.navigation.navigate("Details");
    console.log("Navigate to Home page");
  };

  navToConfig = () => {
    this.props.navigation.navigate("Configuration");
    console.log("Navigation to Configuration");
  };

  navToDefisDetail = () => {
    const { navigation } = this.props;
    const title = navigation.getParam("title", "");
    const defi = navigation.getParam("defi", "some default value");

    this.props.navigation.navigate("DefisDetail", {
      title: title,
      defi: defi
    });
    console.log("Navigate to defi detail");
  };

  displayDefis = () => {
    return (
      <View>
        {this.state.todaysDefis.map((defi, ind) => (
          /*           <View
            key={ind}
            style={{ width: "80%", height: "10%", backgroundColor: "white" }}
          > */
          <Text key={ind} style={style.text}>
            {defi.done == true
              ? defi.text
              : "un nouveau défis vous est proposé"}
          </Text>
          /*           </View> */
        ))}
      </View>
    );
  };

  displayCurrentDefi = () => {
    const { navigation } = this.props;
    const title = navigation.getParam("title", "");
    const defi = navigation.getParam("defi", "some default value");
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            margin: 10
          }}
        >
          <TouchableOpacity onPress={this.navToDefisDetail}>
            <Image
              source={require("../assets/images/rightarrow-icon.png")}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "BaronNeueBold",
              fontSize: 20,
              color: "white",
              margin: 20
            }}
          >
            {defi.text}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            margin: 20
          }}
        >
          <Image
            source={require("../assets/images/avatar-defi.png")}
            style={{ width: 150, height: 140 }}
          />
          <Image
            source={require("../assets/images/audio-icon.png")}
            style={{ width: 70, height: 70 }}
          />
        </View>
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    const title = navigation.getParam("title", "");
    const text = navigation.getParam("text", "some default value");

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
              source={require("../assets/images/mondefis-backgnd.png")}
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
                  {title}
                </Text>
              </View>
              <View>
                {text ? this.displayCurrentDefi() : this.displayDefis()}
              </View>
            </ImageBackground>
          </View>
          <ConfigBottomButton nav={this.navToConfig} imageName="defis" />
        </View>
      </ImageBackground>
    );
  }
}

export default defisScreen;

const style = StyleSheet.create({
  text: {
    fontFamily: "BaronNeueBold",
    fontSize: 10,
    color: "white",
    margin: 10
  }
});
