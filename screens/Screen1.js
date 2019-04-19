import React, { Component } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "powderblue"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  formInput: {
    paddingLeft: 5,
    height: 50,
    borderWidth: 1,
    borderColor: "#555555",
    margin: 10
  },
  formButton: {
    borderWidth: 1,
    borderColor: "#555555",
    marginTop: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
    marginTop: 5
  }
});

class screen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myKey: null
    };
  }

  getKey = async () => {
    try {
      const value = await AsyncStorage.getItem("@MySuperStore:key");
      this.setState({ myKey: value });
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  };

  saveKey = async value => {
    try {
      console.log("save key:", value);
      //this.setState({ myKey: value });
      //console.log("this.state.myKey=", this.state.myKey);
      await AsyncStorage.setItem("@MySuperStore:key", value);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  };

  resetKey = async () => {
    try {
      await AsyncStorage.removeItem("@MySuperStore:key");
      const value = await AsyncStorage.getItem("@MySuperStore:key");
      this.setState({ myKey: value });
    } catch (error) {
      console.log("Error resetting data" + error);
    }
  };

  navToDetail = () => {
    this.props.navigation.navigate("Details");
    console.log("Navigate to Details page");
  };

  render() {
    return (
      /*       <View
        style={{
          backgroundColor: "powderblue",
          opacity: 0.7,
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text>Screen 1</Text>
        <Button title="Back to Details screen" onPress={this.navToDetail} />
      </View> */
      <View
        style={{
          backgroundColor: "powderblue",
          opacity: 0.7,
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text /* style={styles.welcome} */>Screen 1</Text>
        <Button title="Back to Details screen" onPress={this.navToDetail} />
        <TextInput
          style={styles.formInput}
          placeholder="Enter key you want to save!"
          value={this.state.myKey}
          onChangeText={value => this.saveKey(value)}
        />

        <Button onPress={this.getKey.bind(this)} title="Get Key" />
        {/* <Text>Font chier ces boutons!</Text> */}
        <Button color="red" onPress={this.resetKey.bind(this)} title="Reset" />

        <Text style={styles.instructions}>
          Stored key is = {this.state.myKey}
        </Text>
      </View>
    );
  }
}

export default screen1;
