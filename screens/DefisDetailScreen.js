import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import HomeTop from "../components/HomeTop";
import ConfigBottomButton from "../components/ConfigBottomButton";

class defisDetailScreen extends Component {
  static navigationOptions = {
    header: null
  };
  state = { note: "", feeling: "" };

  navToHome = () => {
    this.updateNotes();
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
        <KeyboardAvoidingView
          behavior="padding" //{Platform.OS === "ios" ? 'padding' }
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start"
          }}
        >
          <HomeTop nav={this.navToHome} />

          <View
            style={{
              flex: 1.5,
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
                    margin: 20
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
                    style={{ width: 120, height: 120 }}
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
                    style={{ width: 120, height: 120 }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: "flex-start" }}>
                <Text
                  style={{
                    fontFamily: "BaronNeueBold",
                    fontSize: 15,
                    color: "white",
                    margin: 20
                  }}
                >
                  Notes personnelles:
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View
            style={{
              flex: 0.75,
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
          <ConfigBottomButton nav={this.navToConfig} imageName="defis" />
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

export default defisDetailScreen;

const styles = StyleSheet.create({
  formInput: {
    height: 80,
    color: "darkred",
    margin: 10
  }
});
