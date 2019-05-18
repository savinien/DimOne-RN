import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import HomeTop from "../components/HomeTop";
import ConfigBottomButton from "../components/ConfigBottomButton";
import DefisService from "../services/DefisService";

class defisDetailScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = { note: "", feeling: "", keyBoardDisplayed: false, defi: {} };
    this.defisService = new DefisService();
  }

  componentDidMount() {
    const { navigation } = this.props;
    const title = navigation.getParam("title", "");
    const defi = navigation.getParam("defi", "some default value");
    this.setState(
      state => {
        return { defi: defi };
      },
      () => {
        console.log("current defi", this.state.defi);
      }
    );

    console.log("defis details screen, nav params:", title, defi);

    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardDidHide
    );
  }

  keyboardDidShow = () => {
    //alert("Keyboard Shown");
    this.setState(
      state => {
        return { keyBoardDisplayed: true };
      },
      () => {
        console.log("key board displayed");
      }
    );
  };

  keyboardDidHide = () => {
    //alert("Keyboard Hidden");
    this.setState(
      state => {
        return { keyBoardDisplayed: false };
      },
      () => {
        console.log("key board hidden");
      }
    );
  };

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  navToHome = async () => {
    if (this.state.note || this.state.feeling) {
      this.updateNotes();
    }
    // TODO: fill in which defi we are dsplaying here
    await this.defisService.updateTodaysDefis(this.state.defi);
    this.props.navigation.navigate("Details");
    console.log("Navigate to Home page");
  };

  navToConfig = () => {
    this.props.navigation.navigate("Configuration");
    console.log("Navigation to Configuration");
  };

  setFeeling = value => {
    this.setState(
      state => {
        return { feeling: value };
      },
      () => {
        console.log(this.state.feeling);
      }
    );
  };

  updateNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("@notes");
      let notes = JSON.parse(storedNotes);
      if (!notes) {
        notes = [];
      } else {
        console.log("retrieved notes:", notes);
      }
      notes = [...notes, this.state.feeling + "\n" + this.state.note];
      console.log("updated notes", notes);
      this.storeNotes(notes);
    } catch (error) {
      console.log("Error retrieving notes" + error);
    }
  };

  storeNotes = async notes => {
    try {
      const notesToStore = JSON.stringify(notes);
      console.log("Notes about to be stored:", notesToStore);
      await AsyncStorage.setItem("@notes", notesToStore);
    } catch (error) {
      console.log("Error saving notes" + error);
    }
  };

  render() {
    const { navigation } = this.props;
    const title = navigation.getParam("title", "");
    const text = "Est-ce que je me sents mieux?";

    return (
      <ImageBackground
        source={require("../assets/images/fond.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View
          //behavior="pading" //{Platform.OS === "ios" ? "padding" : "position"}
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start"
          }}
        >
          <HomeTop nav={this.navToHome} />

          {!this.state.keyBoardDisplayed ? (
            <View
              style={{
                flex: 1,
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
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{
                      fontFamily: "BaronNeueBold",
                      fontSize: 15,
                      color: "white",
                      margin: 5
                    }}
                  >
                    {text}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "flex-start"
                    //margin: 20
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      this.setFeeling("Je me suis senti(e) mieux après le défi")
                    }
                  >
                    <Image
                      source={require("../assets/images/oui.png")}
                      style={{ width: 100, height: 100 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.setFeeling(
                        "Je ne me suis pas senti(e) mieux après le défi"
                      )
                    }
                  >
                    <Image
                      source={require("../assets/images/non.png")}
                      style={{ width: 100, height: 100 }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ alignItems: "flex-start" }}>
                  <Text
                    style={{
                      fontFamily: "BaronNeueBold",
                      fontSize: 15,
                      color: "white",
                      marginLeft: 10
                    }}
                  >
                    Notes personnelles:
                  </Text>
                </View>
              </ImageBackground>
            </View>
          ) : null}
          <View
            style={{
              flex: 1,
              backgroundColor: "white"
            }}
          >
            <TextInput
              style={styles.formInput}
              placeholder=""
              multiline={true}
              value={this.state.note}
              onChangeText={note => this.setState({ note: note })}
            />
          </View>
          {!this.state.keyBoardDisplayed ? (
            <ConfigBottomButton nav={this.navToConfig} imageName="defis" />
          ) : null}
        </View>
      </ImageBackground>
    );
  }
}

export default defisDetailScreen;

const styles = StyleSheet.create({
  formInput: {
    height: "100%",
    color: "darkred",
    margin: 2
  }
});
