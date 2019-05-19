import React, { Component } from "react";
import {
  View,
  Button,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  ScrollView
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
      todaysDefis: [],
      currentDefi: {},
      title: ""
    };
    this.defisService = new DefisService();
  }

  componentDidMount = async () => {
    console.log("about to retrieve defis");
    let todaysDefis = await this.defisService.retrieveTodaysDefis();

    const { navigation } = this.props;
    const title = navigation.getParam("title", "");
    const defi = navigation.getParam("defi", null);
    console.log("DefisScreen, input nav params:", navigation.state.params);

    this.setState(
      state => {
        return { todaysDefis: todaysDefis, currentDefi: defi, title: title };
      },
      () => {
        console.log("defis retrieved: ", this.state.todaysDefis);
        console.log("currentDefi", this.state.currentDefi);
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
    /* const { navigation } = this.props;
    const title = navigation.getParam("title", "");
    const defi = navigation.getParam("defi", "some default value");
 */
    this.props.navigation.navigate("DefisDetail", {
      title: this.state.title,
      defi: this.state.currentDefi
    });
    console.log(
      "Navigate to defi detail - current defi:",
      this.state.currentDefi
    );
  };

  editDefi = defi => {
    this.setState(
      state => {
        return { currentDefi: defi };
      },
      () => {
        if (defi.done) {
          console.log(
            "editing defi (which has allready been done):",
            this.state.currentDefi
          );
        } else {
          console.log("editing defi (not allready done) - launching animation");
          this.props.navigation.navigate("Animation", {
            title: "MON DÉFI",
            defi: defi
          });
        }
      }
    );

    /* if (defi.done) {
      console.log("editing defi (which has allready been done)");
      this.setState(
        state => {
          return { currentDefi: defi };
        },
        () => {
          console.log("current defi to be edited:", this.state.currentDefi);
        }
      );
    } else {
      console.log("editing defi (not allready done) - launching animation");
      this.props.navigation.navigate("Animation", {
        title: "MON DÉFI",
        defi: defi
      });
    } */
  };

  shortenDefisText = text => {
    let shortText = text
      .split(" ")
      .slice(0, 4)
      .join(" ");
    shortText += "...";
    return shortText;
  };

  displayDefis = () => {
    return (
      <View>
        {this.state.todaysDefis.map((defi, ind) => (
          <TouchableOpacity key={ind} onPress={() => this.editDefi(defi)}>
            <View
              key={ind}
              style={{
                justifyContent: "center",
                width: 250,
                height: 20,
                backgroundColor: "white",
                opacity: 0.7,
                margin: 10
              }}
            >
              <Text key={ind} style={style.text}>
                {defi.done == true
                  ? this.shortenDefisText(defi.text)
                  : "un nouveau défis vous est proposé"}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  displayCurrentDefi = () => {
    /* const { navigation } = this.props;
    const title = navigation.getParam("title", "");
    const defi = navigation.getParam("defi", "some default value");
  */
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            margin: 10
          }}
        >
          {!this.state.currentDefi.done ? (
            <TouchableOpacity onPress={this.navToDefisDetail}>
              <Image
                source={require("../assets/images/rightarrow-icon.png")}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
          ) : null}
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
            {this.state.currentDefi.text}
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
    /* const { navigation } = this.props;
    const title = navigation.getParam("title", "");
    const text = navigation.getParam("defi", "some default value");
 */
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
                  {this.state.title}
                </Text>
              </View>
              {this.state.currentDefi
                ? this.displayCurrentDefi()
                : this.displayDefis()}
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
    color: "darkred",
    margin: 10
  }
});
